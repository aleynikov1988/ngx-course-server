import { Connection } from 'mongoose';
import { userSchema } from './schemas/user.schema';
import { productSchema } from './schemas/product.schema';

// tslint:disable-next-line: no-any
export const authProviders: any = [
  {
    provide: 'UserModelToken',
    useFactory: (connection: Connection) => connection.model('UserModel', userSchema),
    inject: ['DbConnectionToken'],
  },
  {
    provide: 'ProductModelToken',
    useFactory: (connection: Connection) => connection.model('ProductModel', productSchema),
    inject: ['DbConnectionToken'],
  },
];