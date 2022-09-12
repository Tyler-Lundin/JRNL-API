"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAuthToken = (req, res, next) => {
    const authToken = (req.headers.authorization || req.headers.Authorization);
    if (!authToken)
        return res.status(400).json({ msg: 'Missing auth token' });
    jsonwebtoken_1.default.verify(authToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err)
            return res.status(403).json({ err: 'INVALID AUTH TOKEN' });
        req.user = user;
        next();
    });
};
exports.default = verifyAuthToken;
