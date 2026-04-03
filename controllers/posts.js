const { readFile, writeFile } = require("../utilts/file-opration");
const AppError = require("../utilts/App-error");

const POSTS_FILE_NAME = "modules/posts.json";
const USER_FILE_NAME ="modules/users.json"

const User = require("../modules/users");
const Post = require("../modules/posts");

// get all posts
const getPosts = async (req, res, next) => {
  const posts = await readFile(POSTS_FILE_NAME);
  res.status(200).json(posts);
};

// get one post
const getOnePost = async (req, res, next) => {
  const postId = req.params.id;
  const post = await Post.findById(postId).populate("authorId")
  if (!post) {
    throw new AppError(404, "post not found");
  }

  res.status(200).json(post);
};
/**
 * {
    "id": "1",
    "title": "First Post",
    "content": "Hello World",
    "authorId": "1",
    "createdAt": "2026-01-01",
    "updatedAt": "2026-01-01"
  }
 */
// create post
const createPost = async (req, res) => {
  const body = req.body;
  if(!body.authorId){
    throw new AppError(400,"autherId must be found")
  }
  const user = await User.findById(body.authorId)
  if(!user){
    throw new AppError(400,"user not found")
  }
  const post = await Post.create({
    title:body.title,
    content:body.content,
    authorId:user._id
  })
 

  res.status(201).json({ message: "post created",post });
};

// update post
const updatePost = async (req, res) => {
  const postId = req.params.id;
  const body = req.body;

  const posts = await readFile(POSTS_FILE_NAME);

  const postIndex = posts.findIndex(
    (item) => item.id === Number(postId)
  );

  if (postIndex === -1) {
    throw new AppError(404, "post not found");
  }

  posts[postIndex] = {
    ...posts[postIndex],
    ...body,
  };

  await writeFile(POSTS_FILE_NAME, posts);

  res.status(200).json({ message: "post updated" });
};

// delete post
const deletePost = async (req, res) => {
  const postId = req.params.id;

  let posts = await readFile(POSTS_FILE_NAME);

  const postIndex = posts.findIndex(
    (item) => item.id === Number(postId)
  );

  if (postIndex === -1) {
    throw new AppError(404, "post not found");
  }

  posts = posts.filter((item) => item.id !== Number(postId));

  await writeFile(POSTS_FILE_NAME, posts);

  res.status(200).json({ message: "post deleted" });
};

module.exports = {
  getPosts,
  getOnePost,
  createPost,
  updatePost,
  deletePost,
};