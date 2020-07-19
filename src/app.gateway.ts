import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { AppHelper } from './app.helper';
import { AppService } from './app.service';
import { sessions } from './db/sessions';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private appHelper: AppHelper, private appService: AppService) {}
  @WebSocketServer() server: Server;

  private logger :Logger = new Logger('AppGateway');

  @SubscribeMessage('regClient')
  handleClient(client: Socket, payload: string): void {
    if (this.appHelper.regClient(client, payload)) {
      client.write(JSON.stringify({ status: 200 }));
    }
    client.write(JSON.stringify({ status: 402 }));
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
    const data = JSON.parse(payload);
    const uids = this.appService.getChat(data.chat).send(data.message);
    const clients = sessions.getSessions();
    uids.map(x => clients[x].send(data.message));
  }

  afterInit(): void {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket): void {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket): void {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
