import { Connection, Document, Model } from 'mongoose';
import { notificationLogSchema } from './shcemas/notification-log.schema';

// tslint:disable-next-line: no-any
export const presetNotificationProviders: any[] = [
    {
        provide: 'notificationLogModel',
        useFactory: (connection: Connection): Model<Document> =>
            connection.model('NotificationLogModel', notificationLogSchema),
        inject: ['DbConnectionToken'],
    },
];
