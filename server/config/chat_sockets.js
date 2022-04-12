export const iofunc = (io) => {
  io.on("connection", (socket) => {
    console.log(`User Connected : ${socket.id}`);
    socket.on("join_room", (data) => {
      console.log("This one wants to join the room", data.user_name);
      socket.join(data.chatroom);

      io.in(data.chatroom).emit("user_joined", data);
    });
    socket.on("disconnect", () => {
      console.log(`User disconnected : ${socket.id}`);
    });
  });

