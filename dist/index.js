"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const verifyAuthToken_1 = __importDefault(require("./middleware/verifyAuthToken"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const jrnl_routes_1 = __importDefault(require("./routes/jrnl.routes"));
const db_1 = __importDefault(require("./config/db"));
const colors_1 = __importDefault(require("colors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const { bgYellow } = colors_1.default;
dotenv_1.default.config();
const app = (0, express_1.default)();
(0, db_1.default)();
// middleware
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// routes
app.use('/auth', auth_routes_1.default);
app.use('/jrnl', verifyAuthToken_1.default, jrnl_routes_1.default);
// server start
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT} | ${process.env.NODE_ENV?.toUpperCase()} MODE`.america.bgYellow));
