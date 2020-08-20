const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt = require("bcryptjs");
const { User } = require("../models");

const comparePassword = async (inputPassword, hashedPassword) =>
  await bcrypt.compare(inputPassword, hashedPassword);

module.exports = () => {
  passport.use(
    "local",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        console.log("im local");

        try {
          const user = await User.findOne({
            where: { email },
          });
          if (!user) {
            return done(null, false, { reason: "유저가 존재하지 않습니다. " });
          }
          const result = await comparePassword(password, user.password);
          if (result) {
            return done(null, user); // 콜백함수로 serializer에 user를 넘겨준다 .
          }
          return done(null, false, {
            reason: "패스워드가 일치하지 않습니다. ",
          });
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );
};
