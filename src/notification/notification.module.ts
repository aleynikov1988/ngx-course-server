import { Module } from '@nestjs/common';
import { presetNotificationProviders } from './preset-notification.providers';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';
import { services } from './services';

@Module({
    imports: [
        DatabaseModule,
        AuthModule,
    ],
    providers: [...presetNotificationProviders, ...services],
    exports: [...services]
})
export class NotificationModule {}
