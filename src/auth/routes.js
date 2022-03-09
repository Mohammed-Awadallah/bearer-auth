'use strict';

const express = require('express');
const authRouter = express.Router();

const { users } = require('./models/index.js');
const basicAuth = require('./middleware/basic.js')
const bearerAuth = require('./middleware/bearer.js');

authRouter.post('/signup', async (req, res, next) => {
  try {
    let userRecord = await users.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message);
  }
});

authRouter.post('/signin', basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token
  };

  // add cookieOptions
  const cookieOptions = {
    expire: new Date(Date.now + process.env.JWT_EXPIRE_COOKIE * 60 * 1000),
    httpOnly: true
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', user.token, cookieOptions);

  res.status(200).json(user);
});

authRouter.get('/users', bearerAuth, async (req, res, next) => {
  const allUsers = await users.findAll({});
  const list = allUsers.map(user => user.username);
  res.status(200).json(list);
});

authRouter.get('/secretStuff', bearerAuth, async (req, res, next) => {
  res.status(200).send(req.user)
});


module.exports = authRouter;