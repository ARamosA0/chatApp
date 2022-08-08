const User = require("../model/userModel");
const brcypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const userNameCheck = await User.findOne({ username });
    if (userNameCheck) {
      return res.status(400).json({
        message: "User name already exists",
        status: false,
      });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.status(400).json({
        message: "Email already exists",
        status: false,
      });
    }
    const hashedPassword = await brcypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({
        message: "Incorrect username or password",
        status: false,
      });
    }
    const passwordCheck = await brcypt.compare(password, user.password);
    if (!passwordCheck) {
      return res.json({
        message: "Incorrect username or password",
        status: false,
      });
    }
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage,
    });
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.allUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params._id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json({ status: true, users });
  } catch (error) {
    next(error);
  }
};
