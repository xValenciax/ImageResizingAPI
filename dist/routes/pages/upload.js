"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// use multer to save uploaded images to a specific folder
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.normalize(path_1.default.resolve(`public/assets/full`)));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const fileUpload = (0, multer_1.default)({ storage });
const upload = express_1.default.Router();
/*
*   @description a get route that opens upload page
*   @param { Request } req - HTTP request sent to the route
*   @param { Response } res - HTTP response sent back from the route
*   @returns { void }
*/
upload.get('/upload', (req, res) => {
    res.status(200).sendFile(path_1.default.normalize(path_1.default.resolve('public/upload.html')));
});
// response returned when image is uploaded successfully to the full folder
const response = `<div style="width:100%; 
     display:flex; align-items: center; flex-direction: column;">
        <h1 style="text-align: center;">Image Added Successfully</h1>
        <a href="http://localhost:3000/public">back to home page</a>
    </div>`;
upload.post('/upload', fileUpload.single('uploadedImg'), (req, res) => {
    res.status(200).send(response);
});
exports.default = upload;
