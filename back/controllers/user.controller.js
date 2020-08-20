const asyncHandler = require("express-async-handler");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const { User } = require("../models");

const generateHashedPassword = asyncHandler(async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
});

exports.signUp = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (user) {
    return res.status(401).json("이미 유저가 존재합니다. ");
  }
  const hashedPassword = await generateHashedPassword(req.body.password);
  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
  });
  res.status(201).json("회원가입이 완료되었습니다. ");
});

// 1. 컨트롤러로 요청이 들어온다.
exports.logIn = asyncHandler(async (req, res, next) => {
  // 2. serializer가 실행된다 .
  passport.authenticate("local", {}, (err, user, info) => {
    // 4. serializer로부터 받아온 콜백의 인자들을 이용하여 각각의 로직을 작성한다.
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
          exclude: ["password"],
        },
      });
      return res.status(200).json(existingUser);
    });
  })(req, res, next);
});

exports.logOut = asyncHandler(async (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.status(200).json("로그아웃이 완료되었습니다. ");
});

exports.loadMe = asyncHandler(async (req, res, next) => {
  res.status(200).json(req.user);
});

// TODO
exports.loadUser = (req, res, next) => {
  console.log("loadUser 완료");
  res.status(200).json({
    id: 1,
    msg: true,
  });
};
