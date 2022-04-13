import Channels from "../model/Channel.js";
import Messages from "../model/Message.js";
import Users from "../model/User.js";

export const createMessage = async function (req, res) {
  try {
    let message = await Messages.create({
      sender: req.body.user_id,
      text: req.body.msg_data,
      channel: req.body.channel_id,
    });
    // console.log("reached 2");
    return res.status(201).send({
      success: true,
      message: "Message successfully created",
      message: message,
    });
  } catch (err) {
    return res.status(404).send({
      success: false,
      message: `Bhai error aara : ${err}`,
    });
  }
};

export const createMessageio = async function (msg) {
  try {
    let message = await Messages.create({
      sender: msg.sender_id,
      text: msg.msg_data,
      channel: msg.channel_id,
    });
    // console.log("reached 2");
    return;
  } catch (err) {
    return;
  }
};

export const fetchAllMess = async function (req, res) {
  try {
    let allMessages = await Messages.find({ channel: req.body.channel_id });
    let allmess = [];
    for (let message of allMessages) {
      let sender = await Users.findById(message.sender);
      allmess.push({
        sender_name: sender.name,
        message_id: message._id,
        text: message.text,
      });
    }
    return res.status(201).send({
      success: true,
      message: `Le bhai tere saare messages`,
      messages: allmess,
    });
  } catch (err) {
    return res.status(404).send({
      success: false,
      message: `Bhai error aara : ${err}`,
    });
  }
};
