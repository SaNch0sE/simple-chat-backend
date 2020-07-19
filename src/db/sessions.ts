import { Socket } from "socket.io";
import { ISessions } from "./sessions.interface";

class Sessions {
    private sessions: ISessions;

    public getSessions(): ISessions {
        return this.sessions;
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
