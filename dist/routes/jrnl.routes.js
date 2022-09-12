"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const router = express_1.default.Router();
const jrnl_controller_1 = __importDefault(require("../controllers/jrnl.controller"));
router.get('/jrnls', (0, express_async_handler_1.default)(async (req, res) => {
    jrnl_controller_1.default.getAll(req, res);
}));
router.post('/create', (0, express_async_handler_1.default)(async (req, res) => {
    jrnl_controller_1.default.create(req, res);
}));
exports.default = router;
