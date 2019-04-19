import { ConfigModule } from './../config.module';
import { Module } from '@nestjs/common';
import { JwtStrategy } from './passport/jwt.strategy';
import { controllers } from './controllers';
import { authProviders } from './auth.providers';
import { AuthService } from './services/auth.service';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [ConfigModule, DatabaseModule],
    providers: [JwtStrategy, AuthService, ...authProviders],
    exports: [AuthService],
    controllers,
})
export class AuthModule {}
