var express = require("express");
var User = require("../schemas/user");

// 라우터
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    // db.users.find({}) ; 전체 user 가져오기
    const users = await User.find({});
    res.render("user/user", { users: users }); // user 폴더 밑에 user.njk
  } catch (error) {
    next(error);
  }
});

module.exports = router;
