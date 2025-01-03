const User = require("../models/User");
const jwt = require("jsonwebtoken");

//handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  //incorrect email
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }
  //incorrect email
  if (err.message === "incorrect password") {
    errors.password = "That password is not registered";
  }

  //duplicate error code
  if (err.code === 11000) {
    errors.email = "That email has already been registered";
    return errors;
  }

  //validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

const signup_get = (req, res) => {
  res.render("auths/signup", { title: "Sign up" });
};
const signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
const login_get = (req, res) => {
  res.render("auths/login", { title: "Log in" });
};
const login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
const logout_get = (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/");
};

module.exports = {
  signup_get,
  signup_post,
  login_get,
  logout_get,
  login_post,
};
