const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "MyKey123";

//user Sign Up
const signup = async (req, res, next) => {
  const { name, email, password, isAdmin } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    console.log(error);
  }
  if (existingUser) {
    return res
      .status(400)
      .send({ message: "Email already exists!!! Login Instead" });
  }

  //hashing password to store passward on database--->
  const hashedPassword = bcrypt.hashSync(password);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    isAdmin,
  });

  try {
    await user.save();
  } catch (error) {
    console.log(error);
  }

  return res.status(201).json({ message: user });
};

//User LogIn
const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return new Error(error);
  }

  if (!existingUser) {
    return res.status(400).json({ message: "User not found. SignUp Please" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid Email or password" });
  }

  // when everything is correct like user email & password we will generate token for that user--->
  const token = jwt.sign({ id: existingUser._id }, JWT_SECRET_KEY, {
    expiresIn: "1hr",
  });

  // adding http cookie to secure our web app
  res.cookie(String(existingUser._id), token, {
    path: "/",
    expires: new Date(Date.now() + 1000 * 30), // 30 sec
    httpOnly: true,
    sameSite: "lax",
  });

  return res
    .status(200)
    .json({ message: "successfully Logged In", user: existingUser, token });
};

const verifyToken = (req, res, next) => {
  // const cookies = req.headers.cookie;
  // const token = cookies.split("=")[1];
  // console.log(token);
  
  const headers = req.headers[`authorization`];
  const token = headers.split(" ")[1];
  if (!token) {
    res.status(404).json({ message: "No token found" });
  }
  jwt.verify(String(token), JWT_SECRET_KEY, (error, user) => {
    if (error) {
      res.status(400).json({ message: "Invalid Token" });
    }
    console.log(user.id);
    req.id = user.id;
  });
  next();
};

const getUser = async (req, res, next) => {
  const userId = req.id;
  let user;

  try {
    user = await User.findById(userId, "-password");
  } catch (error) {
    return new Error(error);
  }

  if (!user) {
    return res.status(404).json({ message: "User Not Found" });
  }
  return res.status(200).json({ user });
};

exports.signup = signup;
exports.login = login;
exports.verifyToken = verifyToken;
exports.getUser = getUser;
