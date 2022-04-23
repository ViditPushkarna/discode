import { fetchDataio, saveio } from "../controllers/editor_controller.js";
import {
  createMessageio,
  deleteMessageio,
} from "../controllers/message_controller.js";

export const iofunc = (io) => {
  io.on("connection", (socket) => {
    console.log(`User Connected : ${socket.id}`);

    socket.on("joinChat", (data) => {
      // console.log("entered channel", data.channel_id);
      socket.join(data.channel_id);
      io.sockets.in(data.channel_id).emit("entered_chat", data);
      // socket.emit("entered_chat", data.channel_id);
    });

    socket.on("create_message", (msg) => {
      // console.log(msg);
      createMessageio(msg)
        .then((data) => {
          io.sockets.in(msg.channel_id).emit("new_message_created", data);
        })
        .catch((err) => {
          console.log(err);
        });
    });

    socket.on("delete_message", (msg) => {
      deleteMessageio(msg)
        .then((data) => {
          // console.log(data);
          io.sockets.in(data.channel_id).emit("message_deleted", data.msg);
        })
        .catch((err) => {
          console.log(err);
        });
    });

    // editor code starts

    socket.on("joinEditor", (ed) => {
      io.sockets
        .in(ed)
        .fetchSockets()
        .then((data) => {
          console.log(data.length);
          if (data.length === 0) {
            fetchDataio(ed).then((d) => {
              socket.emit("joinData", d);
            });
          } else {
            // this is for computer networks proglm
            // ask from data[0] , data[1]
            // console.log(data);
            io.to(data[0].id).emit("requestingData", ed);
          }
        })
        .catch((err) => {
          socket.emit("joinData", {
            text: "",
            lang: "javascript",
          });
        });
      socket.join(ed);
    });

    socket.on("sendingDataForNewUser", (data) => {
      socket.broadcast.to(data.id).emit("forNewUser", data);
    });

    socket.on("editorTextChange", (data) => {
      socket.broadcast.to(data.id).emit("editorTextChanged", data.text);
    });

    socket.on("changeLangSend", (data) => {
      socket.broadcast.to(data.id).emit("changeLang", data.lang);
    });

    socket.on("saveData", (data) => {
      saveio(data).then((bul) => {
        console.log(bul);
      });
    });

    // disconnect
    socket.on("disconnecting", () => {
      io.in(socket.data.channel_id).emit(
        "user_disconnected",
        socket.data.user_id
      );
      console.log(`User disconnected : ${socket.id}`);
    });
  });
};
