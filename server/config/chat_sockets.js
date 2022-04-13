import { createMessageio } from "../controllers/message_controller.js";

export const iofunc = (io) => {
  io.on("connection", (socket) => {
    console.log(`User Connected : ${socket.id}`);
    socket.on("join_room", (data) => {
      console.log("This one wants to join the room", data.user_name);
      socket.join(data.chatroom);

      io.in(data.chatroom).emit("user_joined", data);
      io.in(data.chatroom).on("create_message", (msg) => {
        createMessageio(msg);
        io.in(data.chatroom).emit("new_message_created", msg);
      });
      // io.on(send) -> create a message -> emit new message -> client (new mes add in state)
    });

    // disconnect
    socket.on("disconnect", () => {
      console.log(`User disconnected : ${socket.id}`);
    });
  });
};
