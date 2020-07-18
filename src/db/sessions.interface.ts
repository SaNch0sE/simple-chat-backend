import { Socket } from "socket.io";

interface ISessions {
    [key: string]: Socket;
}

export {
    ISessions,
}
