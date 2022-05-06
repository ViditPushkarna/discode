import { useEffect } from 'react'
import io from "socket.io-client";
export default function voice() {
    useEffect(() => {
        const socket = io("http://localhost:5000/")

        socket.emit('joinVoice')

        const peer = new Peer();

        console.log(peer)

        console.log(navigator)
        return () => {
            socket.disconnect();
        };
    }, [])

    return (
        <>
        <script src="https://unpkg.com/peerjs@1.3.2/dist/peerjs.min.js"></script>

        <div>voice</div>
        </>
    )
}
