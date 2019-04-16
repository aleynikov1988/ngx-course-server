import { ConfigModule } from './../config.module';
import { DatabaseModule } from './../database/database.module';
import { Module } from '@nestjs/common';
import { JwtStrategy } from './passport/jwt.strategy';
import { controllers } from './controllers';
import { authProviders } from './auth.providers';
import { AuthService } from './services/auth.service';

@Module({
    imports: [DatabaseModule, ConfigModule],
    providers: [JwtStrategy, AuthService, ...authProviders],
    controllers,
})
export class AuthModule {

}