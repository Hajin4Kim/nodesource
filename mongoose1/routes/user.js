var express = require("express");
var User = require("../schemas/user");
const Comment = require("../schemas/comment");

// 라우터
const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      // db.users.find({})
      const users = await User.find({});
      res.json(users);
    } catch (error) {
      next("route.get 에러: ", error);
    }
  })
  .post(async (req, res, next) => {
    try {
      // db.users.insertOne({name:'아무개',age:15, married: true})
      // TODO: req.body : form 안에 내용 가져올 수 있음
      const user = await User.create({
        name: req.body.name,
        age: req.body.age,
        married: req.body.married,
      });
      console.log("user 삽입 결과 : ", user);
      res.status(201).json(user);
      // res.json(users);
    } catch (error) {
      next("route.post 에러: ", error);
    }
  });

// 특정 user 가 작성한 전체 comment 가져오기
// /675a3431008c698a752a84ca/comments
router.get("/:id/comments", async (req, res, next) => {
  try {
    const comments = await Comment.find({ commenter: req.params.id }).populate(
      "commenter"
    ); // 정말 users 의 commenter 와 맞는지 비교
    res.json(comments);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
