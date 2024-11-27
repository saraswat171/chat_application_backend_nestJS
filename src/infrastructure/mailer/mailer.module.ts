// import { MailerModule as Mailer } from '@nestjs-modules/mailer';
// import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
// import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { join } from 'path';

// @Module({
//   imports: [
//     Mailer.forRootAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: async (configService: ConfigService) => {
//         const authType = configService.get<string>('MAIL_AUTH') || 'no_auth';
//         const transportConfig = {
//           host: configService.get<string>('MAIL_HOST'),
//           port: configService.get<number>('MAIL_PORT'),
//           secure: configService.get<number>('MAIL_PORT') == 465,
//         };
//         if (authType === 'login') {
//           transportConfig['auth'] = {
//             user: configService.get<string>('MAIL_USERNAME'),
//             pass: configService.get<string>('MAIL_PASSWORD'),
//           };
//         } else if (authType === 'oauth2_two_legged') {
//           transportConfig['auth'] = {
//             type: 'OAuth2',
//             user: configService.get<string>('MAIL_USERNAME'),
//             serviceClient: configService.get<string>('MAIL_CLIENT_ID'),
//             privateKey: configService.get<string>('MAIL_PRIVATE_KEY'),
//           };
//         }
//         return {
//           transport: transportConfig,
//           defaults: {
//             from: `<${configService.get<string>('MAIL_SENDER_EMAIL')}>`,
//           },
//           template: {
//             dir: join(__dirname, '../../src/infrastructure/mailer/templates'),
//             adapter: new EjsAdapter(),
//             options: {
//               strict: true,
//             },
//           },
//         };
//       },
//     }),
//   ],
// })
// export class MailerModule {}
