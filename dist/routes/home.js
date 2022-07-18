"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
// calling express router to use routes in external modules
const home = express_1.default.Router();
/*
*   @description get route with the uri of '/public' that opens the home page
*   @param { Request } req - HTTP request sent to the route
*   @param { Response } res - HTTP response sent back from the route
*   @returns { void }
*/
home.get('/public', (req, res) => {
    res.status(200).sendFile(path_1.default.normalize(path_1.default.resolve('public/index.html')));
});
exports.default = home;
