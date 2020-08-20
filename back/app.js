require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const morgan = require("morgan");
const hpp = require('hpp')
const helmet = require('helmet')
const app = express();
const db = require("./models");
const passportConfig = require("./passport");
const routes = require("./routes");

const prod = process.env.NODE_ENV === 'production'

// DB Connect
db.sequelize
    .sync()
    .then(() => {
        console.log(`🌟 DB 연결 성공!`);
    })
    .catch(console.error);
// Passport
passportConfig();

if (prod) {
    app.use(morgan("combined"),
        helmet(),
        hpp(),
        cors({origin: "http://tamastudy.com", credentials: true}))
} else {
    app.use(morgan("dev"),
        cors({origin: "http://localhost:3060", credentials: true}))
}

// Middleware
app.use(
    bodyParser.json(),
    bodyParser.urlencoded({extended: true}),
    cookieParser(process.env.COOKIE_SECRET),
    // 이 미들웨어는 쿠키를 브라우저에 설정하고 브라우저에서 보낸 쿠키를 req.session객체 로 변환 합니다
    // 브라우저에서 세션관련 쿠키가 날라오면 req.session으로 변환하여 서버 세션에 저장한다.
    // 쿠키가 날라오지 않는다면 아래와 같은 조건으로 단순하게 서버에 세션을 저장한다. 즉, 어느쪽도 아래와같이 일단 세션을 만들어 놓는다.
    session({
        saveUninitialized: false,
        resave: false,
        secret: process.env.COOKIE_SECRET,
        cookie: {
            httpOnly: true, // javascript로 접근하지 못하게한다.
            secure: false, // https 적용 옵션
            // api.tamastudy.com <-> tamastudy.com 간에 쿠키 공유가 될것이다.
            domain: prod && ".tamastudy.com",
            maxAge: 1000 * 60 * 60, // 1 hour
            // maxAge: 5000,
        },
    }),
    passport.initialize(), // serializer, desrializer ? 초기화한다.
    passport.session(), // express-session 으로 저장한걸 passport로 deserializing할때 필요?
);

// app.use((req, res, next) => {
//   console.log("🌪signedCookies🌪");
//   console.log(req.signedCookies);
//   console.log("🔥session🔥");
//   console.log(req.session);
//   console.log(req.session.passport ? "passport있음" : "passport없음");
//   next();
// });

// Routes
app.use(routes);

const PORT = prod ? 80 : 3065

// Starter
app.listen(PORT, () => {
    console.log(`🌏 Server listening on ${PORT}`);
});
