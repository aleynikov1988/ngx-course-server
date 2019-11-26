import { Connection } from 'mongoose';
import { productSchema } from './schemas/product.schema';
import { Provider } from '@nestjs/common';

export const productProviders: Provider[] = [
  {
    provide: 'ProductModelToken',
    useFactory: (connection: Connection) => connection.model('ProductModel', productSchema),
    inject: ['DbConnectionToken'],
  },
];
