import Channels from "../model/Channel.js";
import Messages from "../model/Message.js";

export const createMessage = async function (req, res) {
  try {
    let message = await Messages.create({
      sender: req.body.user_id,
      text: req.body.msg_data,
      channel: req.body.channel_id,
    });
    // console.log("reached 2");
    await Channels.updateOne(
      {
        _id: req.body.channel_id,
      },
      {
        $push: { Messages: message._id },
      }
    );
    return res.status(201).send({
      success: true,
      message: "Channel successfully created",
      message: message,
    });
  } catch (err) {
    return res.status(404).send({
      success: false,
      message: `Bhai error aara : ${err}`,
    });
  }
};
