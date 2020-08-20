const express = require("express");
const userRouters = require("./user.route");
const postRouters = require("./post.route");

const router = express.Router();

router.use("/api/user", userRouters);
router.use("/api/post", postRouters);

module.exports = router;
