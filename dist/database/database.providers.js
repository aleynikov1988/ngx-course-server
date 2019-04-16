"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const config_service_1 = require("../config.service");
exports.databaseProviders = [
    {
        provide: 'DbConnectionToken',
        useFactory: (config) => __awaiter(this, void 0, void 0, function* () {
            mongoose.Promise = global.Promise;
            const dbConnection = mongoose.connection;
            const host = config.get('dbhost');
            const connectionConfig = {
                autoIndex: true,
                useCreateIndex: true
            };
            yield mongoose.connect(host, { config: connectionConfig });
            return dbConnection;
        }),
        inject: [config_service_1.ConfigService],
    },
];
//# sourceMappingURL=database.providers.js.map