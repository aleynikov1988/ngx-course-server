import { AuthModule } from './auth/auth.module';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import * as passport from 'passport';
import { CardModule } from './card/card.module';
import { NotificationModule } from './notification/notification.module';
@Module({
    imports: [AuthModule, CardModule, NotificationModule],
})
export class AppModule {
    public configure(consumer: MiddlewareConsumer): void {
        consumer
            .apply(passport.authenticate('jwt', { session: false }))
            .forRoutes('cards', 'notification', 'user/updateuser', 'user/checkuser');
    }
}
