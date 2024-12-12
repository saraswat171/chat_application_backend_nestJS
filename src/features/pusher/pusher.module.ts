import { Module } from '@nestjs/common';
import { PusherService } from './pusher.servcie';


@Module({
  providers: [PusherService],
  exports: [PusherService], 
})
export class PusherModule {}
