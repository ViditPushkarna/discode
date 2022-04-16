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

    socket.on('editorChangesSend', data => {
      socket.broadcast.emit('editorChanges', data)
    })

    socket.on('changeLangSend', data => {
      console.log(data)
      socket.broadcast.emit('changeLang', data)
    })

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
