"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const libSchema = new mongoose_1.default.Schema({
    libTitle: {
        type: String,
        required: true,
        default: 'Untitled',
    },
    libDesc: {
        type: String,
        required: true,
        default: 'description',
    },
    libTheme: {
        type: String,
        required: true,
        default: 'default',
    },
    jrnlIDs: {
        type: Array(String),
        required: true,
    },
    userID: {
        type: String,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });
const Lib = mongoose_1.default.model('Lib', libSchema);
exports.default = Lib;
