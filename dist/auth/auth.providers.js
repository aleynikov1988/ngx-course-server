"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_schema_1 = require("./schemas/user.schema");
exports.authProviders = [
    {
        provide: 'UserModelToken',
        useFactory: (connection) => connection.model('UserModel', user_schema_1.userSchema),
        inject: ['DbConnectionToken'],
    },
];
//# sourceMappingURL=auth.providers.js.map