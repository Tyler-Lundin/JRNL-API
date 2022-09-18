"use strict";
/* eslint-disable no-unused-expressions */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const jrnl_model_1 = __importDefault(require("../models/jrnl.model"));
const getAll = async (req, res) => {
    const { _id } = req.user;
    try {
        const jrnls = await jrnl_model_1.default.find({ userID: _id });
        console.log(jrnls);
        res.status(200).json({ jrnls });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const create = async (req, res) => {
    const { email, _id } = req.user;
    const { title, theme } = req.body;
    console.log(email, _id, title, theme);
    const jrnl = new jrnl_model_1.default({
        title,
        theme,
        userID: _id,
    });
    const user = await user_model_1.default.findOne({ email });
    if (!user)
        return res.status(404).json({ message: 'User not found' });
    try {
        user.jrnlIDs.push(jrnl.id);
        await user.save();
        const newJrnl = await jrnl.save();
        res.status(201).json(newJrnl);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
const deleteOne = async (req, res) => {
    const jrnlID = req.params.id;
    const userID = req.userID;
    try {
        await user_model_1.default.findByIdAndUpdate(userID, { $pull: { jrnlIDs: jrnlID } });
        await jrnl_model_1.default.findByIdAndDelete(jrnlID);
        res.status(200).json({ message: 'Journal deleted' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const deleteAll = async (req, res) => {
    const userID = req.userID;
    try {
        await user_model_1.default.findByIdAndUpdate(userID, { jrnlIDs: [] });
        await jrnl_model_1.default.deleteMany({ userID });
        res.status(200).json({ message: 'All journals deleted' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const updateTitle = async (req, res) => {
    const jrnlID = req.params.id;
    const { title } = req.body;
    try {
        const jrnl = await jrnl_model_1.default.findByIdAndUpdate(jrnlID, { title });
        res.status(200).json(jrnl);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const updateTheme = async (req, res) => {
    const jrnlID = req.params.id;
    const { theme } = req.body;
    try {
        const jrnl = await jrnl_model_1.default.findByIdAndUpdate(jrnlID, { theme });
        res.status(200).json(jrnl);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const updatePage = async (req, res) => {
    const jrnlID = req.params.id;
    const { index, page } = req.body;
    const jrnl = await jrnl_model_1.default.findById(jrnlID);
    if (!jrnl)
        return res.status(404).json({ message: 'Journal not found' });
    try {
        jrnl.pages[index] = page;
        await jrnl.save();
        res.status(200).json(jrnl);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.default = {
    getAll,
    create,
    deleteOne,
    deleteAll,
    updateTitle,
    updateTheme,
    updatePage,
};
