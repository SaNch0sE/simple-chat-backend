import { Controller, Post, Body, Get } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { AppService } from './app.service';
import { IUser } from './interfaces/IUser.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('signUp')
  async signUp(@Body() user: IUser): Promise<string> {
    const pass = bcrypt.hashSync(user.pass, 10);
    return this.appService.createUser(user.name, pass);
  }

  @Post('signIn')
  async signIn(@Body() user: IUser): Promise<IUser> {
    return this.appService.loginUser(user.name, user.pass);
  }

  @Get('getNewMsgs')
  async getNewMsgs(@Body() name: string): Promise<void> {
    const today = (new Date).setDate(new Date().getDate()-1);
    return this.appService.getChat(name).getMessages(today);
  }

  @Post('createChat')
  async createChat(@Body() name: string): Promise<void> {
    this.appService.createChat(name);
  }
}
