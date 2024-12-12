var mongoose = require("mongoose");

const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

// mongoose : type 대체해줌

const commentSchema = new Schema({
  commenter: {
    type: ObjectId,
    required: true,
    ref: "User", // User 스키마 사용자의 ObjectID 가 삽입됨
  },
  comment: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
