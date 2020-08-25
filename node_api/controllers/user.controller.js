const asyncHandler = require('express-async-handler');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

const generateHashedPassword = asyncHandler(async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
});

module.exports.signUp = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (user) {
    return res.status(401).json('이미 유저가 존재합니다. ');
  }
  const hashedPassword = await generateHashedPassword(req.body.password);
  await User.create({
    ...req.body,
    password: hashedPassword,
  });
  res.status(201).json('회원가입이 완료되었습니다. ');
});

module.exports.logIn = asyncHandler(async (req, res, next) => {
  passport.authenticate('local', {}, (err, user, info) => {
    if (err) {
      console.error(err);
      next(err);
    }
    if (info) {
      return res.status(401).json(info.reason);
    }
    // 5. 문제가 없다면 req.loign을 실행한다.
    // 이때, response 의 header에 Set-cookie를 한다. (에러가없다면)
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const existingUser = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password'],
        },
      });
      return res.status(200).json(existingUser);
    });
  })(req, res);
});

module.exports.logOut = asyncHandler(async (req, res) => {
  req.logout();
  req.session.destroy();
  res.status(200).json('로그아웃이 완료되었습니다. ');
});

module.exports.loadMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// TODO
module.exports.loadUser = (req, res) => {
  console.log('loadUser 완료');
  res.status(200).json({
    id: 1,
    msg: true,
  });
};
