"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import timestamp from 'time-stamp'
const Logger_1 = require("./Logger");
const verifyAuthToken = (req, res, next) => {
    // const authToken: string = (req.headers.authorization || req.headers.Authorization) as string
    const authToken = req.cookies.authToken;
    if (!authToken)
        return res.status(400).json({ message: 'Authorization failed, Please login' });
    jsonwebtoken_1.default.verify(authToken, process.env.ACCESS_TOKEN_SECRET, (err, { user }) => {
        if (err)
            return res.status(403).json({ err: 'INVALID AUTH TOKEN' });
        req.user = user;
        // console.log(timestamp('[ HH:mm:ss ]'.red), 'user authorized: ', user.email)
        (0, Logger_1.WriteToFile)(`auth token verified - ${user.email}`);
        next();
    });
};
exports.default = verifyAuthToken;
