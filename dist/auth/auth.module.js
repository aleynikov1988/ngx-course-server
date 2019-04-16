"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_module_1 = require("./../config.module");
const database_module_1 = require("./../database/database.module");
const common_1 = require("@nestjs/common");
const jwt_strategy_1 = require("./passport/jwt.strategy");
const controllers_1 = require("./controllers");
const auth_providers_1 = require("./auth.providers");
const auth_service_1 = require("./services/auth.service");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        imports: [database_module_1.DatabaseModule, config_module_1.ConfigModule],
        providers: [jwt_strategy_1.JwtStrategy, auth_service_1.AuthService, ...auth_providers_1.authProviders],
        controllers: controllers_1.controllers,
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map