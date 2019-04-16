import { Connection } from 'mongoose';
import { userSchema } from './schemas/user.schema';

// tslint:disable-next-line: no-any
export const authProviders: any = [
  {
    provide: 'UserModelToken',
    useFactory: (connection: Connection) => connection.model('UserModel', userSchema),
    inject: ['DbConnectionToken'],
  },
];