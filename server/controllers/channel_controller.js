import Channels from "../model/Channel.js";
import Server from "../model/Server.js";

export const createChannel = async function (req, res) {
  try {
    let channel = await Channels.create({
      name: req.body.channel_name,
      server: req.body.server_id,
    });
    // console.log("reached 2");
    await Server.updateOne(
      {
        _id: req.body.server_id,
      },
      {
        $push: { channels: channel._id },
      }
    );
    return res.status(201).send({
      success: true,
      message: "Channel successfully created",
      channel: channel,
    });
  } catch (err) {
    return res.status(404).send({
      success: false,
      message: `Bhai error aara : ${err}`,
    });
  }
};
