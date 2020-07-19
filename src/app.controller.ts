import { Controller, Post, Body, Res } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AppService } from './app.service';
import { message } from './data/chat';
import { Response } from 'express';
import { IUser } from './data/user';
import { ICChat } from './interfaces/ICChat';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('signUp')
  async signUp(@Body() user: IUser, @Res() res: Response): Promise<void> {
    const pass = bcrypt.hashSync(user.pass, 10);
    res.json({
      uid: this.appService.createUser(user.name, pass)
    });
  }

  @Post('signIn')
  async signIn(@Body() user: IUser, @Res() res: Response): Promise<void> {
    const thisUser: IUser = this.appService.loginUser(user.name, user.pass);
    res.json(thisUser);
  }

  @Post('getNewMsgs')
  async getNewMsgs(@Body() body: ICChat, @Res() res: Response): Promise<void> {
    const today: Date = new Date();
    const yesterday: Date = new Date(today.setDate(today.getDate() - 1));
    res.json(this.appService.getChat(body.chatName).getMessages(yesterday));
  }

  @Post('createChat')
  async createChat(@Body() body: ICChat, @Res() res: Response): Promise<void> {
    res.json(this.appService.createChat(body.chatName));
  }

  @Post('send')
  async sendMessage(@Body() body: { message: message, chatName: string }, @Res() res: Response): Promise<void> {
    const msg: message = {
      time: new Date,
      text: body.message.text,
      user: body.message.user
    }
    res.json(this.appService.getChat(body.chatName).send(msg));
  }
}
