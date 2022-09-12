"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const page_controller_1 = __importDefault(require("../controllers/page.controller"));
router.get('/', (0, express_async_handler_1.default)(async (req, res) => page_controller_1.default.getPagesByJrnlID(req, res)));
router.post('/create', (0, express_async_handler_1.default)(async (req, res) => page_controller_1.default.createPageInJrnl(req, res)));
router.patch('/title', (0, express_async_handler_1.default)(async (req, res) => page_controller_1.default.updatePageTitle(req, res)));
router.patch('/content', (0, express_async_handler_1.default)(async (req, res) => page_controller_1.default.updatePageContent(req, res)));
router.delete('/', (0, express_async_handler_1.default)(async (req, res) => page_controller_1.default.clearPage(req, res)));
exports.default = router;
