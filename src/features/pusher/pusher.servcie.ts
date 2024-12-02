import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Pusher from 'pusher';

@Injectable()
export class PusherService {
  private pusher: Pusher;

  constructor(

      private readonly configService: ConfigService,
  ) {
    this.pusher = new Pusher({
      appId: this.configService.get<string>('app_id'),
      key:  this.configService.get<string>('key'),
      secret:  this.configService.get<string>('secret'),
      cluster:  this.configService.get<string>('cluster'),
      useTLS: true,
    });
  }

  async trigger(channel: string, event: string, data: any): Promise<void> {
    await this.pusher.trigger(channel, event, data);
  }
}
