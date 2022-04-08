import Server from "../model/Server.js";
import User from "../model/User.js";

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
    console.log(user._id);
    res.status(200);
    res.send("Hello");
  } catch (err) {
    res.status(404);
    res.send(`Bhai error aara : ${err}`);
    // res.send("Error", err);
  }
};

// working
export const userInfo = async function (req, res) {
  try {
    let user = await User.findById(req.body.user_id);
    res.status(200);
    res.send(user);
  } catch (err) {
    res.status(404);
    res.send(`Bhai error aara : ${err}`);
  }
};
