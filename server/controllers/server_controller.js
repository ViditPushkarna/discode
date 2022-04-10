import Server from "../model/Server.js";
import User from "../model/User.js";

export const home = function (req, res) {
  res.send("Server Controller is Working");
};
// working
export const createServer = async function (req, res) {
  try {
    let creator = await User.findById(req.body.user_id);
    // console.log("reached 1");
    let server = await Server.create({
      name: req.body.server_name,
      members: [req.body.user_id], // user id of the creator
      admin: [req.body.user_id], // user id of the creator
    });
    // console.log("reached 2");
    await User.updateOne(
      {
        _id: creator._id,
      },
      {
        $push: { servers: server._id },
      }
    );
    // add this new server to creator's server list
    res.status(200);
    res.send("server created");
  } catch (err) {
    res.status(404);
    res.send(`error aara vai : ${err}`);
  }
  // res.send("Server is Working");
};

export const deleteServer = async function (req, res) {
  try {
    await Server.deleteOne({ _id: req.body.server_id });
    res.status(200);
    res.send("server deleted");
  } catch (err) {
    res.status(404);
    res.send(`error aara vai : ${err}`);
  }
};
// not tested
export const makeAdmin = async function (req, res) {
  try {
    await Server.updateOne(
      {
        _id: req.params.server_id,
      },
      {
        $push: { admin: req.body.user_id },
      }
    );
    res.status(200);
    res.send("admin made");
  } catch (err) {
    res.status(404);
    res.send(`error aara vai : ${err}`);
  }
};
// not tested
export const removeAdmin = async function (req, res) {
  try {
    let server = await Server.findById(req.body.server_id);
    // add delete from admin array command
  } catch (err) {
    res.send("Error", err);
  }
};
// working
export const addMember = async function (req, res) {
  try {
    await Server.updateOne(
      {
        _id: req.body.server_id,
      },
      {
        $push: { members: req.body.user_id },
      }
    );
    await User.updateOne(
      {
        _id: req.body.user_id,
      },
      {
        $push: { servers: req.body.server_id },
      }
    );
    res.status(200);
    res.send("member added");
  } catch (err) {
    res.status(404);
    res.send(`error aara vai : ${err}`);
  }
};

export const kickMember = async function (req, res) {
  try {
    let server = await Server.findById(req.params.server_id);
    // remove user from server members list
    let user = await User.findById(req.params.user_id);
    // remove server from user server list
  } catch (err) {
    res.send("Error", err);
  }
};
