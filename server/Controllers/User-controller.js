const User = require("../Models/User");

const addNewUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = new User({
      username,
      password,
    });
    await user.save();
    return res.status(201).json({ msg: "User registered successfully" });
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
    } else if (result.password === password) {
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
