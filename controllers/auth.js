const AppError = require("../utilts/App-error");
const User = require("../modules/users");
const bcrypt = require("bcrypt");
const util = require("util");
const jwt = require("jsonwebtoken");
const jwtSignPromise = util.promisify(jwt.sign);

const singup = async (req, res) => {
  const body = req.body;
  const imageUrl = req.imagesUrl ? req.imagesUrl[0] : null;
  const user = await User.create({
    userName: body.userName,
    email: body.email,
    password: body.password,
    photo: imageUrl,
  });
  delete user.password;
  res.status(201).json({ massage: "user sing-up", user });
};
const login = async (req, res) => {
  const body = req.body;
  const user = await User.findOne({ email: body.email },null,{ includePassword: true });
  if (!user) {
    throw new AppError(400, "Invalid email or password");
  }
  const isPasswordCorrect = await bcrypt.compare(body.password, user.password);
  if (!isPasswordCorrect) {
    throw new AppError(400, "Invalid email or password");
  }
  const token = await jwtSignPromise({ sub: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.TOKEN_EXP,
  });
  
  res.status(200).json({
    message: "logined",
    token,
    user,
  });
};

module.exports = {
  login,
  singup,
};
