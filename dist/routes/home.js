"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const home = express_1.default.Router();
home.get('/public', (req, res) => {
    res.sendFile(path_1.default.join('D:/Courses/FWD Advanced Track/firstProject/public/index.html'));
});
exports.default = home;
