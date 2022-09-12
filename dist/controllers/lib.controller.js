"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lib_model_1 = __importDefault(require("../models/lib.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
// Gets all libs for a user
// GET /api/lib
// PARAMS: none
// RETURNS: array of lib objects
const getLibsByUserID = async (req, res) => {
    const { id } = req.user;
    try {
        const libs = await lib_model_1.default.find({ userID: id });
        res.status(200).json({
            message: 'Libs retrieved successfully.',
            libs,
        });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};
// Gets a lib by ID
// GET /api/lib/:id
const getLibByID = async (req, res) => {
    const { id } = req.params;
    try {
        const lib = await lib_model_1.default.findById({ _id: id });
        res.status(200).json({
            message: 'Lib retrieved successfully.',
            lib,
        });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};
// Creates a new lib
// POST /api/lib/create
// PARAMS: lib-title, lib-description, lib-theme, lib-userID (from auth token)
// RETURNS: new lib object
const createLib = async (req, res) => {
    const { libTitle, libDesc, libTheme } = req.body;
    const { id } = req.user;
    const lib = new lib_model_1.default({ libTitle, libDesc, userID: id, libTheme });
    const user = await user_model_1.default.findById({ _id: id });
    if (!user)
        return res.status(404).json({ message: 'User Authentication Error.' });
    try {
        await lib.save();
        user?.libIDs.push(lib._id.toString());
        await user.save();
        res.status(201).json({
            message: 'Lib created successfully.',
            user,
            lib,
        });
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
};
// Updates a lib's title
// PATCH /api/lib/:id/title
// PARAMS: lib-title
// RETURNS: updated lib object
const updateLibTitle = async (req, res) => {
    const { id } = req.params;
    const { libTitle } = req.body;
    try {
        const lib = await lib_model_1.default.findById({ _id: id });
        if (!lib)
            return res.status(404).json({ message: 'Lib not found.' });
        lib.libTitle = libTitle;
        await lib.save();
        res.status(200).json({
            message: 'Lib title updated successfully.',
            lib,
        });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};
// Updates a lib's description
// PATCH /api/lib/:id/description
// PARAMS: lib-description
// RETURNS: updated lib object
const updateLibDescription = async (req, res) => {
    const { id } = req.params;
    const { libDesc } = req.body;
    try {
        const lib = await lib_model_1.default.findById({ _id: id });
        if (!lib)
            return res.status(404).json({ message: 'Lib not found.' });
        lib.libDesc = libDesc;
        await lib.save();
        res.status(200).json({
            message: 'Lib description updated successfully.',
            lib,
        });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};
// Updates a lib's theme
// PATCH /api/lib/:id/theme
// PARAMS: lib-theme
// RETURNS: updated lib object
const updateLibTheme = async (req, res) => {
    const { id } = req.params;
    const { libTheme } = req.body;
    try {
        const lib = await lib_model_1.default.findById({ _id: id });
        if (!lib)
            return res.status(404).json({ message: 'Lib not found.' });
        lib.libTheme = libTheme;
        await lib.save();
        res.status(200).json({
            message: 'Lib theme updated successfully.',
            lib,
        });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};
// Deletes a lib
// DELETE /api/lib/:id/delete
// PARAMS: jrnlID
// RETURNS: success message
const deleteLib = async (req, res) => {
    const { id } = req.params;
    try {
        await lib_model_1.default.findByIdAndDelete({ _id: id });
        res.status(200).json({ message: 'Lib deleted successfully.' });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};
const LIB_CONTROLLER = {
    getLibsByUserID,
    getLibByID,
    createLib,
    updateLibTitle,
    updateLibDescription,
    updateLibTheme,
    deleteLib,
};
exports.default = LIB_CONTROLLER;
