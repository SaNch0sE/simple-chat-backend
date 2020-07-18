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

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private appHelper: AppHelper) {}
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
    this.server.emit('msgToClient', payload);
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
