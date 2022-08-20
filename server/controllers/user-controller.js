const User = require("../model/User");
const bcrypt = require("bcryptjs");

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
  return res.status(200).json({ message: "successfully Logged In" });
};

exports.signup = signup;
exports.login = login;
