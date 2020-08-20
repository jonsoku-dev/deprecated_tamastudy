const passport = require("passport");
const local = require("./local");
const {User} = require("../models");

module.exports = () => {
    // 3. controller의 passport.authenticate로부터 실행이된다 .
    // local stategy에서 받아온 user를 콜백으로 받고,
    // 다시 passport.authenticate의 콜백으로 보낸다. 이때 session에도 저장한다(?_?)
    passport.serializeUser((user, done) => {
        done(null, user.id); // session에 저장하는 단계 (app.js에서 passport.session() 이 없으면 deserializeUser할 수 없다.)
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findOne({
                where: {id},
                attributes: {exclude: ['password', 'createdAt', 'updatedAt']}
            });
            done(null, user); // req.user에 넣는다.
        } catch (error) {
            console.error(error);
            done(error);
        }
    });

    local();
};
