"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.userSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        required: true,
        default: new Date(),
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        unique: false,
    },
    email: {
        type: String,
        unique: false,
        required: false,
    },
    password: {
        type: String,
        required: false,
    },
}, { collection: 'users' });
//# sourceMappingURL=user.schema.js.map