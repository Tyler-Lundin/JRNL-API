"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const authToken_1 = __importDefault(require("middleware/authToken"));
const auth_routes_1 = __importDefault(require("routes/auth.routes"));
const jrnl_routes_1 = __importDefault(require("routes/jrnl.routes"));
const lib_routes_1 = __importDefault(require("routes/lib.routes"));
const page_routes_1 = __importDefault(require("routes/page.routes"));
const db_1 = __importDefault(require("config/db"));
dotenv.config({ path: __dirname + '/.env' });
const app = (0, express_1.default)();
(0, db_1.default)();
// middleware
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// routes
app.use('/auth', auth_routes_1.default);
app.use('/lib', authToken_1.default, lib_routes_1.default);
app.use('/jrnl', authToken_1.default, jrnl_routes_1.default);
app.use('/page', authToken_1.default, page_routes_1.default);
// server start
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT} | ${process.env.NODE_ENV?.toUpperCase()} MODE`.yellow.black.bgYellow));
