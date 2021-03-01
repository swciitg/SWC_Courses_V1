const User = require("../models/user");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const Token = require("../models/token");
const nodemailer = require("nodemailer");

exports.logout = async (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, maxAge: 1 });
  res.redirect("/");
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Please enter all the fields." });
    }

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ msg: "User doesn't exists." });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const {
      isAdmin,
      isverified,
      enrolled_courses_id,
      _id,
      name,
      enrolled_courses,
    } = user;
    const data = {
      isAdmin,
      isverified,
      enrolled_courses_id,
      _id,
      name,
      enrolled_courses,
    };

    const token = await jwt.sign({ user: data }, process.env.jwtSecret, {
      expiresIn: 3 * 3600,
    });

    res.cookie("jwt", token, { httpOnly: true, maxAge: 3 * 3600 * 1000 });

    res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.send({ err: error.message });
  }
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email.includes("@iitg.ac.in")) {
      return res.status(400).json({ msg: "Please use you outlook email id." });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ msg: "Password must have a minimum length of 8." });
    }

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Please enter all the fields." });
    }

    const foundUser = await User.findOne({ email });

    if (foundUser) return res.status(400).json({ msg: "User already exists." });

    const newUser = new User({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash;

    await newUser.save();

    return res.status(200).json({
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    return res.send({ err: error.message });
  }
};
