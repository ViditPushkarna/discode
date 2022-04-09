import Server from "../model/Server.js";
import User from "../model/User.js";
import jwt from "jsonwebtoken";

export const home = function (req, res) {
  res.send("User Controller is Working");
};
// working
export const createUser = async function (req, res) {
  try {
    let user = await User.create({
      name: req.body.user_name,
      email: req.body.user_email,
      password: req.body.user_password,
    });
    // console.log(user._id);
    res.status(200);
    res.send({
      success: true,
      message: "User Created Successfully",
      user: user,
    });
  } catch (err) {
    res.status(404);
    res.send(`Bhai error aara : ${err}`);
    // res.send("Error", err);
  }
};

// working
export const userInfo = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.user_email });
    res.status(200).send({
      success: true,
      message: "Le bhai apna user",
      user: user,
    });
    // console.log(user);
    // res.send(user);
  } catch (err) {
    res.status(404);
    console.log(err);
    res.send(`Bhai error aara : ${err}`);
  }
};

export const login = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.user_email });
    // no user found
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Could not find the user",
      });
    }
    // Incorrect Password
    if (req.body.user_password != user.password) {
      return res.status(401).send({
        success: false,
        message: "Password Invalid",
      });
    }

    const payload = {
      user_email: user.email,
      id: user._id,
    };

    const token = jwt.sign(payload, "Random Alina", { expiresIn: "1d" });

    return res.status(201).send({
      success: true,
      message: "Logged In Successfully",
      token: "Bearer " + token,
    });
  } catch (err) {
    res.status(404);
    res.send(`Bhai error aara : ${err}`);
  }
};
