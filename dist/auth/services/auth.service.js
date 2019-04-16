"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const config_service_1 = require("src/config.service");
let AuthService = class AuthService {
    constructor(_userModel, _config) {
        this._userModel = _userModel;
        this._config = _config;
    }
    createToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const secret = this._config.get('secret');
            const { username } = user;
            const payload = {
                username,
            };
            const accessToken = jwt.sign(payload, secret);
            return Object.assign({}, user, { accessToken });
        });
    }
    validateUser(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this._userModel.findOne({ username }).lean().exec();
            if (!user) {
                return false;
            }
            return true;
        });
    }
    createUser(createUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._userModel.create(createUserDto);
        });
    }
    getUser(query) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            try {
                user = yield this._userModel.findOne(query).lean().exec();
            }
            catch (err) {
                console.log(err);
                user = null;
            }
            return user;
        });
    }
    getUserWithToken(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this._userModel.findOne(query).lean().exec();
            return yield this.createToken(user);
        });
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('UserModelToken')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        config_service_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map