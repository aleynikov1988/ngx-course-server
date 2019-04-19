import { Module } from '@nestjs/common';
import { presetNotificationProviders } from './preset-notification.providers';
import { services } from './services';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [DatabaseModule, AuthModule],
    providers: [...presetNotificationProviders, ...services],
    exports: [...services],
})
export class NotificationModule {}
