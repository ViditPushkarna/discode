import Editors from "../model/Editor.js";
import Server from "../model/Server.js";

export const createEditor = async function (req, res) {
  try {
    let editor = await Editors.create({
      name: req.body.editor_name,
      server: req.body.server_id,
      lang: "javascript",
      data: "",
    });
    // console.log("reached 2");
    await Server.updateOne(
      {
        _id: req.body.server_id,
      },
      {
        $push: { editors: editor._id },
      }
    );
    return res.status(201).send({
      success: true,
      message: "Editor successfully created",
      editor: editor,
    });
  } catch (err) {
    return res.status(404).send({
      success: false,
      message: `Bhai error aara : ${err}`,
    });
  }
};

export const fetchData = async function (req, res) {
  try {
    let editor = await Editors.findById(req.body.editor_id);

    return res.status(201).send({
      success: true,
      message: `Le bhai tera Server details of ${editor.name}`,
      editor: editor,
    });
  } catch (err) {
    return res.status(404).send({
      success: false,
      message: `Bhai error aara : ${err}`,
    });
  }
};

export const deleteEditor = async function (req, res) {
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
    await Editors.deleteOne({ _id: req.body.editor_id });
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

export const fetchDataio = async function (data) {
  try {
    // console.log(data);
    let editor = await Editors.findById(data);
    return {
      text: editor.data,
      lang: editor.lang,
    };
  } catch (err) {
    return {
      text: "",
      lang: "javascript",
    };
  }
};

export const saveio = async function (data) {
  try {
    await Editors.findByIdAndUpdate(data.id, {
      data: data.text,
      lang: data.lang,
    });
    return true;
  } catch (err) {
    return false;
  }
};
