"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const upload = express_1.default.Router();
upload.get('/upload', (req, res) => {
    res.sendFile(path_1.default.join('D:/Courses/FWD Advanced Track/firstProject/public/upload.html'));
});
exports.default = upload;