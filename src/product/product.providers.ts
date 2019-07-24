import { Connection } from 'mongoose';
import { productSchema } from './schemas/product.schema';

// tslint:disable-next-line: no-any
export const productProviders: any = [
  {
    provide: 'ProductModelToken',
    useFactory: (connection: Connection) => connection.model('ProductModel', productSchema),
    inject: ['DbConnectionToken'],
  },
];
