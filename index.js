require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const authRoute = require("./routes/auth");
const path = require("path");
const errorMiddleware = require("./middlewares/error-middlware");
const notFoundMiddleware = require("./middlewares/not-found-middlware");
const mongoConnect = require("./config/db-connect");

app.use(express.static(path.join(__dirname, "uploads"))); // for photo

mongoConnect()

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/users", usersRoute);
app.use("/posts", postsRoute);
app.use(authRoute);
app.use("/", (req, res) => {
  res.status(200).json({ message: "hello world" });
});
app.use(notFoundMiddleware);
app.use(errorMiddleware);



// app.listen(process.env.PORT, () => {
//   console.log(`Server running on port ${process.env.PORT}`);
// });

module.exports = app;
