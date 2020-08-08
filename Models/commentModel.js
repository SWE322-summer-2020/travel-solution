const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: [true, "Comment body is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  story: {
    type: mongoose.Schema.ObjectId,
    ref: "Story",
    required: [true, "A comment must belong to a story"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "A comment must have a author"],
  },
});

commentSchema.pre(/^find/, function(next) {
  this.populate({
    path: "user",
    select: "name photo",
  });
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
