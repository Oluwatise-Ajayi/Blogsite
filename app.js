const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { checkUser } = require("./middlewares/authMiddleware");

// Load environment variables
require('dotenv').config(); 

//express app
const app = express();

//connect to mongoDB

const dbUrl =
  "mongodb+srv://BlogAdmin:test1234@cluster0.eigel.mongodb.net/blogSite?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(process.env.PORT || 3000))
  .catch((err) => console.log(err));

//register view engine
app.set("view engine", "ejs");

//middleware & static files
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

//routes
app.get("*", checkUser);
app.get("/", (req, res) => {
  res.redirect("/blogs");
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//blog routes
app.use("/blogs", blogRoutes);

//auth routes
app.use("/", authRoutes);

//404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
