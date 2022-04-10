import Server from "../model/Server.js";
import User from "../model/User.js";
import Channels from "../model/Channel.js";

export const home = function (req, res) {
  res.send("Server Controller is Working");
};
// working
export const createServer = async function (req, res) {
  try {
    let creator = await User.findOne({ email: req.body.user_email });
    // console.log("reached 1");
    let server = await Server.create({
      name: req.body.server_name,
      members: [creator._id], // user id of the creator
      admin: [creator._id], // user id of the creator
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
    return res.status(201).send({
      success: true,
      message: "Server successfully created",
      server: server,
    });
  } catch (err) {
    return res.status(404).send({
      success: false,
      message: `Bhai error aara : ${err}`,
    });
  }
  // res.send("Server is Working");
};

export const deleteServer = async function (req, res) {
  try {
    // check whther admin or not
    let server = await Server.findById(req.body.server_id);
    let present = await Server.find({
      _id: req.body.server_id,
      admin: { $in: [req.body.user_id] },
    }).count();
    if (present == 0) {
      return res.status(401).send({
        success: false,
        message: "Only admins can delete a server",
      });
    }
    // delete
    await Server.deleteOne({ _id: req.body.server_id });
    return res.status(201).send({
      success: true,
      message: "Server successfully deleted",
    });
  } catch (err) {
    return res.status(404).send({
      success: false,
      message: `Bhai error aara : ${err}`,
    });
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
    let server = await Server.findById(req.body.server_id);
    // add member
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
    return res.status(201).send({
      success: true,
      message: `You are added into the server ${server.name} Successfully`,
      server: server,
    });
  } catch (err) {
    return res.status(404).send({
      success: false,
      message: `Bhai error aara : ${err}`,
    });
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

export const serverInfo = async function (req, res) {
  try {
    let server = await Server.findById(req.body.server_id);
    var channels = [];
    for (let chid of server.channels) {
      let channel = await Channels.findById(chid);
      channels.push({
        channel_id: channel._id,
        channel_name: channel.name,
      });
    }
    // server.channels.forEach((chid) => {
    // });
    return res.status(201).send({
      success: true,
      message: `Le bhai tera Server details of ${server.name}`,
      channels: channels,
    });
  } catch (err) {
    return res.status(404).send({
      success: false,
      message: `Bhai error aara : ${err}`,
    });
  }
};
