"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const router = express_1.default.Router();
const lib_controller_1 = __importDefault(require("../controllers/lib.controller"));
// Gets all libs for a user ✅
router.get('/', (0, express_async_handler_1.default)(async (req, res) => {
    lib_controller_1.default.getLibsByUserID(req, res);
}));
// Gets a lib by ID ✅
router.get('/:id', (0, express_async_handler_1.default)(async (req, res) => {
    lib_controller_1.default.getLibByID(req, res);
}));
// Creates a new lib ✅
router.post('/create', (0, express_async_handler_1.default)(async (req, res) => {
    lib_controller_1.default.createLib(req, res);
}));
// Updates a lib's title ✅
router.patch('/:id/title', (0, express_async_handler_1.default)(async (req, res) => {
    lib_controller_1.default.updateLibTitle(req, res);
}));
// Updates a lib's description ✅
router.patch('/:id/description', (0, express_async_handler_1.default)(async (req, res) => {
    lib_controller_1.default.updateLibDescription(req, res);
}));
// Updates a lib's theme ✅
router.patch('/:id/theme', (0, express_async_handler_1.default)(async (req, res) => {
    lib_controller_1.default.updateLibTheme(req, res);
}));
// Deletes a lib ✅
router.delete('/:id/delete', (0, express_async_handler_1.default)(async (req, res) => {
    lib_controller_1.default.deleteLib(req, res);
}));
exports.default = router;
