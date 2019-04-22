import { Module } from '@nestjs/common';
import { presetNotificationProviders } from './preset-notification.providers';
import { services } from './services';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';
import { controllers } from './controllers';

@Module({
    imports: [DatabaseModule, AuthModule],
    providers: [...presetNotificationProviders, ...services],
    controllers,
    exports: [...services],
})
export class NotificationModule {}
