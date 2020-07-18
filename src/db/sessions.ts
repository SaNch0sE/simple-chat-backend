import { Socket } from "socket.io";
import { ISessions } from "./sessions.interface";

class Sessions {
    private sessions: ISessions;

    public getSession(uid: string): Socket {
        return this.sessions[uid];
    }

    public saveSession(uid: string, client: Socket): boolean {
        this.sessions[uid] = client;
        return true;
    }
}

const sessions = new Sessions();

export {
    sessions,
}
