"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const router = express_1.default.Router();
router.post('/login', (0, express_async_handler_1.default)(async (req, res) => {
    auth_controller_1.default.login(req, res);
}));
router.post('/register', (0, express_async_handler_1.default)(async (req, res) => {
    auth_controller_1.default.register(req, res);
}));
exports.default = router;
