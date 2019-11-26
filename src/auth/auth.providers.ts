import { Connection } from 'mongoose';
import { userSchema } from './schemas/user.schema';
import { Provider } from '@nestjs/common';

export const authProviders: Provider[] = [
  {
    provide: 'UserModelToken',
    useFactory: (connection: Connection) => connection.model('UserModel', userSchema),
    inject: ['DbConnectionToken'],
  },
];
