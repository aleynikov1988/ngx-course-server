import { Connection, Document, Model } from 'mongoose';
import { cardSchema } from './schemas/card.schema';

// tslint:disable-next-line: no-any
export const cardProviders: any[] = [
    {
        provide: 'cardModel',
        useFactory: (connection: Connection): Model<Document> =>
            connection.model('CardModel', cardSchema),
        inject: ['DbConnectionToken'],
    },
];
