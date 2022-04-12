import io from "socket.io-client";
import { useEffect } from "react";

export default function Main() {
  useEffect(() => {
    const socket = io("http://localhost:5000");
    socket.emit("join_room", {
      user_name: "alinu",
      chatroom: "discode",
    });
    socket.on("user_joined", (data) => {
      console.log(`${data.user_name} andar aa gyi`);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  return <div></div>;
}
