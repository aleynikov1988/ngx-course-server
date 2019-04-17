import { Module } from '@nestjs/common';
import { presetNotificationProviders } from './preset-notification.providers';
import { DatabaseModule } from '../database/database.module';
import { services } from './services';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [DatabaseModule, AuthModule],
    providers: [...presetNotificationProviders, ...services],
    exports: [...services],
})
export class NotificationModule {}
