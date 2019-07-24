import { ConfigModule } from './../config.module';
import { Module } from '@nestjs/common';
import { controllers } from './controllers';
import { productProviders } from './product.providers';
import { DatabaseModule } from '../database/database.module';
import { ProductService } from './services/product.service';

@Module({
    imports: [ConfigModule, DatabaseModule],
    providers: [ProductService, ...productProviders],
    exports: [ProductService],
    controllers,
})
export class ProductModule {}
