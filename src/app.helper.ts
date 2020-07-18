import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { sessions } from './db/sessions';

@Injectable()
export class AppHelper {
  regClient(client: Socket, payload: string): boolean {
    return sessions.saveSession(payload, client);
  }
}
