var express = require("express");
var User = require("../schemas/user");
const user = require("../schemas/user");

// 라우터
const router = express.Router();

router
  .get("/", async (req, res, next) => {
    try {
      // db.users.find({})
      const users = await User.find({});
      res.json(users);
    } catch (error) {
      next(error);
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
      next(error);
    }
  });

module.exports = router;
