const mongoose = require("mongoose");

const postSchems = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    authorId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
     },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchems);

module.exports = Post;
