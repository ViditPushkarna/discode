import Voices from "../model/Voice.js";
import Server from "../model/Server.js";

export const createVoice = async function (req, res) {
  try {
    let voice = await Voices.create({
      name: req.body.voice_name,
      server: req.body.server_id,
    });
    // console.log("reached 2");
    await Server.updateOne(
      {
        _id: req.body.server_id,
      },
      {
        $push: { voices: voice._id },
      }
    );
    return res.status(201).send({
      success: true,
      message: "Voice successfully created",
      voice: voice,
    });
  } catch (err) {
    return res.status(404).send({
      success: false,
      message: `Bhai error aara : ${err}`,
    });
  }
};
