import { DatabaseModule } from './../database/database.module';
import { Module } from '@nestjs/common';
import { cardProviders } from './card.provider';
import { controllers } from './controller';
import { services } from './services';
import { NotificationModule } from '../notification/notification.module';

@Module({
    imports: [DatabaseModule, NotificationModule],
    providers: [...services, ...cardProviders],
    controllers,
})
export class CardModule {}
