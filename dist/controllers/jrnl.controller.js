"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const jrnl_model_1 = __importDefault(require("../models/jrnl.model"));
const getAll = async (req, res) => {
    const user = req.user;
    try {
        const jrnls = jrnl_model_1.default.find({ userID: user.id });
        res.json(jrnls);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const create = async (req, res) => {
    const user = req.user;
    console.log('user', user.id);
    const { title, theme } = req.body;
    const newJrnl = new jrnl_model_1.default({
        title,
        theme,
        userID: user.id.toString(),
    });
    await user_model_1.default.findByIdAndUpdate(user.id, { $push: { jrnls: newJrnl.id } }, { new: true });
    try {
        const savedJrnl = await newJrnl.save();
        res.status(201).json(savedJrnl);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
const JRNL_CONTROLLER = {
    getAll,
    create,
};
exports.default = JRNL_CONTROLLER;
