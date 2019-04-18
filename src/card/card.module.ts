import { ConfigModule } from './../config.module';
import { DatabaseModule } from './../database/database.module';
import { Module } from '@nestjs/common';
import { cardProviders } from './card.provider';
import { controllers } from './controller';
import { services } from './services';

@Module({
    imports: [DatabaseModule, ConfigModule],
    providers: [...services, ...cardProviders],
    controllers,
})
export class CardModule {

}