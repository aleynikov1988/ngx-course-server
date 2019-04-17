import { AuthModule } from './auth/auth.module';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { NotificationModule } from './notification/notification.module';
import * as passport from 'passport';
@Module({
  imports: [AuthModule, NotificationModule]
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(passport.authenticate('jwt', { session: false })).forRoutes('users');
  }

}
