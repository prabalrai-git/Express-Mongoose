const User = require("../Models/User");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const addNewUser = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  const salt = await bycrypt.genSalt(10);

  const hashedPassword = await bycrypt.hash(password, salt);

  try {
    const user = new User({
      username,
      password: hashedPassword,
    });
    await user.save();
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      "secret",
      {
        expiresIn: "30d",
      }
    );
    return res
      .status(201)
      .json({ username: { name: user.username }, token: token });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "something went wrong" });
  }
};

const getUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await User.findOne({ username });
    console.log(result);
    if (!result) {
      res.status(404).json({ msg: "No user found" });
    } else if (await bycrypt.compare(password, result.password)) {
      res.status(200).json({ msg: "successful", successMsg: true });
    } else {
      res.status(404).json({ msg: "wrong username or password" });
    }
  } catch (error) {}
};

module.exports = {
  addNewUser,
  getUser,
};
