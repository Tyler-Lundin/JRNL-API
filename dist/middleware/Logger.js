"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WriteToFile = void 0;
const fs_1 = __importDefault(require("fs"));
const WriteToFile = (message) => {
    const date = new Date();
    const fileName = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}.log`;
    const logsDirectory = `${__dirname}/../logs`;
    const pre = `[ ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ]`;
    fs_1.default.appendFile(`${logsDirectory}/${fileName}`, `\n${pre} ${message}\n`, (err) => {
        if (err)
            throw err;
    });
};
exports.WriteToFile = WriteToFile;
