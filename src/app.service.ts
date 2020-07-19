import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { user } from './data/user';
import { chat } from './data/chat';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  private users: user[] = [];
  private chats: chat[] = [];
  public createUser(name: string, pass: string): string {
    const newUser: user = new user(name, pass);
    this.users[newUser.id] = newUser;
    return newUser.id;
  }
  public getUser(id: string): user {
    return this.users[id];
  }
  public loginUser(name: string, pass: string): user {
    let uid = null;
    for( const x in this.users) {
      if (this.users[x].name === name && bcrypt.compareSync(pass, this.users[x].pass)) {
        uid = x;
      }
    }
    return uid;
  }

  public createChat(name: string): chat {
    this.chats[name] = new chat(name);
    return this.chats[name];
  }
  public getChat(name: string): chat {
    return this.chats[name];
  }

}
