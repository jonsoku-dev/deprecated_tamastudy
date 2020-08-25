const asyncHandler = require('express-async-handler');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const {
  findUserByEmail,
  createUser,
  findUserById,
} = require('../services/user.service');

const generateHashedPassword = asyncHandler(async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
});

module.exports.signUp = asyncHandler(async (req, res) => {
  const { user } = await findUserByEmail(req.body.email);
  if (user) {
    return res.status(401).json('이미 유저가 존재합니다. ');
  }
  const hashedPassword = await generateHashedPassword(req.body.password);
  await createUser({
    ...req.body,
    password: hashedPassword,
  });
  res.status(201).json('회원가입이 완료되었습니다.');
});

module.exports.logIn = asyncHandler(async (req, res, next) => {
  passport.authenticate('local', {}, (err, user, info) => {
    console.log(user);
    if (err) {
      console.error(err);
      next(err);
    }
    if (info) {
      return res.status(401).json(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const { user: existingUser } = await findUserById(user.id);
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
