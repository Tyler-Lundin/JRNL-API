"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const pageSchema = new mongoose_1.Schema({
    pageTitle: {
        type: String,
        required: true,
        default: 'Untitled',
    },
    pageContent: {
        type: String,
        required: true,
        default: 'A UFO 🛸 flew over my house last night. I saw it with my own eyes.',
    },
    pageNumber: {
        type: Number,
        required: true,
    },
    pageTheme: {
        type: String,
        ref: 'default',
        required: true,
        default: 'default',
    },
    jrnlID: {
        type: String,
        ref: 'Jrnl',
        required: true,
    },
}, {
    timestamps: true,
});
const Page = (0, mongoose_1.model)('Page', pageSchema);
exports.default = Page;
