import { fetchDataio, saveio } from "../controllers/editor_controller.js";
import {
  createMessageio,
  deleteMessageio,
} from "../controllers/message_controller.js";

export const iofunc = (io) => {
  io.on("connection", (socket) => {
    console.log(`User Connected : ${socket.id}`);

    socket.on("joinChat", (data) => {
      socket.join(data.channel_id);
    });

    socket.on("create_message", (msg) => {
      createMessageio(msg)
        .then((data) => {
          io.in(msg.channel_id).emit("new_message_created", data);
        })
        .catch((err) => {
          console.log(err);
        });
    });

    socket.on("delete_message", (msg) => {
      deleteMessageio(msg)
        .then((data) => {
          // console.log(data);
          io.in(data.channel_id).emit("message_deleted", data.msg);
        })
        .catch((err) => {
          console.log(err);
        });
    });

    socket.on("joinEditor", (ed) => {
      socket.join(ed);
      io.sockets
        .in(ed)
        .fetchSockets()
        .then((data) => {
          console.log(data.length)
          if (data.length === 0) {
            return fetchDataio(ed);
          } else {
            // this is for computer networks proglm
            // ask from data[0] , data[1]
            data[0].emit("requestingData", ed);
          }
        })
        .catch((err) => {
          return {
            text: "",
            lang: "javascript",
          };
        });
    });

    socket.on("editorChangesSend", (data) => {
      socket.broadcast.to(data.id).emit("editorChanges", data);
    });

    socket.on("changeLangSend", (data) => {
      socket.broadcast.to(data.id).emit("changeLang", data);
    });

    socket.on("saveData", (data) => {
      return saveio(data);
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
