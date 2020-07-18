import { Injectable } from '@nestjs/common';
import { user } from './data/user';
import { chat, message } from './data/chat';

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
    const result = this.users.filter(x => x.name == name).filter(x => x.pass === pass);
    if(result.length == 0) {
      
    } else {
      return result[0];
    }
  }

  public createChat(name: string): chat {
    this.chats[name] = new chat(name);
    return this.chats[name];
  }
  public getChat(name: string): chat {
    return this.chats[name];
  }

}
