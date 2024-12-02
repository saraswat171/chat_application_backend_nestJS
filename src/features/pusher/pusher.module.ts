import { Module } from '@nestjs/common';
import { PusherService } from './pusher.servcie';


@Module({
  providers: [PusherService],
  exports: [PusherService],  // Export so it can be used in other modules
})
export class PusherModule {}
