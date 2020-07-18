import { Controller, Post, Body } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { AppService } from './app.service';
import { IUser } from './interfaces/IUser';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('signup')
  signUp(@Body user: IUser): string {
    const pass = bcrypt.hashSync(user.pass, 10);
    return this.appService.createUser(user.name, pass);
  }
  
  @Post('signin')
  signIn(@Body user: IUser): string {
    const pass = bcrypt.hashSync(user.pass, 10);
    return this.appService.createUser(user.name, pass);
  }
}
