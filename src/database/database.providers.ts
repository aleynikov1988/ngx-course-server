import * as mongoose from 'mongoose';
import { ConfigService } from '../config.service';
import { Provider } from '@nestjs/common';

export const databaseProviders: Provider[] = [
    {
        provide: 'DbConnectionToken',
        useFactory: async (config: ConfigService): Promise<mongoose.Connection> => {
            // tslint:disable-next-line: no-any
            (mongoose as any).Promise = global.Promise;
            const dbConnection: mongoose.Connection = mongoose.connection;
            const host: string = config.get('dbhost');


            const connectionConfig: { autoIndex: boolean, useCreateIndex: boolean } = {
                autoIndex: true,
                useCreateIndex: true
            };
            await mongoose.connect(host, {config: connectionConfig});

            return dbConnection;
        },
        inject: [ConfigService],
    },
];
