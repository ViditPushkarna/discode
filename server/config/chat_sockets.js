import { createMessageio } from "../controllers/message_controller.js";

export const iofunc = (io) => {
  io.on("connection", (socket) => {
    console.log(`User Connected : ${socket.id}`);

    socket.on("joinChat", (data) => {
        // console.log("This one wants to join the room", data.user_id);
        socket.join(data.channel_id);
        // socket.data.channel_id =
        // io.in(data.channel_id).emit("user_joined", data);
        io.in(data.channel_id).on("create_message", (msg) => {
          createMessageio(msg)
            .then((data) => {
              io.in(data.channel_id).emit("new_message_created", data);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      // io.on(send) -> create a message -> emit new message -> client (new mes add in state)
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