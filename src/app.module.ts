import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { AppHelper } from './app.helper';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, AppGateway, AppHelper],
})
export class AppModule {}
