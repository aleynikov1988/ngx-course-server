import { AuthModule } from './auth/auth.module';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import * as passport from 'passport';
import { ProductModule } from './product/product.module';
@Module({
    imports: [AuthModule, ProductModule],
})
export class AppModule {
    public configure(consumer: MiddlewareConsumer): void {
        consumer.apply(passport.authenticate('jwt', { session: false })).forRoutes('products', 'user');
    }
}
