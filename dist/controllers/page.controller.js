"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const page_model_1 = __importDefault(require("../models/page.model"));
const jrnl_model_1 = __importDefault(require("../models/jrnl.model"));
const getPagesByJrnlID = async (req, res) => {
    const { id } = req.params;
    try {
        const pages = await page_model_1.default.find({ jrnlID: id });
        res.status(200).json({
            message: 'Pages retrieved successfully',
            pages,
        });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};
const createPageInJrnl = async (req, res) => {
    const { jrnlID } = req.body;
    const jrnl = await jrnl_model_1.default.findById({ _id: jrnlID });
    if (jrnl) {
        try {
            const newPageNum = jrnl?.pageIDs.length;
            const page = new page_model_1.default({
                jrnlID,
                pageNumber: newPageNum,
            });
            jrnl?.pageIDs.push(page._id.toString());
            await page.save();
            res.status(201).json({
                message: 'Page created successfully',
                jrnl,
                page,
            });
        }
        catch (error) {
            res.status(409).json({ message: error.message });
        }
    }
    res.status(404).json({ message: 'JRNL not found' });
};
const updatePageTitle = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    try {
        const page = await page_model_1.default.findByIdAndUpdate(id, { title }, { new: true });
        res.status(200).json(page);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};
const updatePageContent = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    try {
        const page = await page_model_1.default.findByIdAndUpdate(id, { content }, { new: true });
        res.status(200).json(page);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};
const clearPage = async (req, res) => {
    const { id } = req.params;
    try {
        const page = await page_model_1.default.findByIdAndUpdate(id, { content: '' }, { new: true });
        res.status(200).json(page);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};
const PAGE_CONTROLLER = {
    getPagesByJrnlID,
    createPageInJrnl,
    updatePageTitle,
    updatePageContent,
    clearPage,
};
exports.default = PAGE_CONTROLLER;
