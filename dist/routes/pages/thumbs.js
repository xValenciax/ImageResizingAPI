"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable max-len */
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const thumbs = express_1.default.Router();
/*
*   @description a get route that opens the page where all processed images are displayed
*   @param { Request } req - HTTP request sent to the route
*   @param { Response } res - HTTP response sent back from the route
*   @returns { void }
*/
thumbs.get('/thumbs', (req, res) => {
    // html response returned by the route
    let HTMLresponse = `<!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <title>Image Processing API</title>
                <meta name="description" content="">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link rel="stylesheet" href="main.css">
            </head>
            <body>     
                <div class="container">
                    <header class="header">
                        <div class="page-logo">
                            <img class="logo" src="assets/icons/icons8-api-64 (1).png" alt="app-logo">
                            <h1>PlaceholderImgsAPI</h1>
                        </div>
                        <ul class="nav-menu">
                            <li class="nav-ele">
                                <a class="nav-link" href="./index.html">
                                    <img class="nav-img off" src="assets/icons/icons8-home-64.png" alt="Home Icon">
                                </a>
                            </li>
                            <li class="nav-ele">
                                <a class="nav-link" href="./upload.html">
                                    <img class="nav-img off" src="assets/icons/icons8-image-64.png" alt="about Icon">
                                    </a>
                            </li>
                            </li>
                            <li class="nav-ele">
                                <a class="nav-link" href="./thumbs.html">
                                    <img class="nav-img off" src="assets/icons/icons8-history-48.png" alt="about Icon">
                                    </a>
                            </li>
                            <li class="nav-ele">
                                <a class="nav-link" href="#">
                                    <img class="nav-img" id="menu" src="assets/icons/icons8-menu-50.png" alt="menu Icon">
                                </a>
                            </li>
                        </ul>
                    </header>
                    <main class="content gallery">`;
    /*
    *   @description an async function that displays images found in thumbs folder
    *   @param { void }
    *   @returns { Promise<void> } promise of type void indicates that the file's been opened successfully
    */
    const getImages = () => __awaiter(void 0, void 0, void 0, function* () {
        // open the cache file and read its content
        const data = yield fs_1.promises.readFile(path_1.default.normalize(path_1.default.resolve('cache.txt')), 'utf-8');
        if (data === '' || data === undefined || data === null) {
            HTMLresponse += `<h3>There is no images currently that has been processed</h3>`;
        }
        else {
            // split returned data into an array of strings
            const Data = data.split('\n');
            // loop over cache data
            // convert each image into an html card
            // append the card to the HTML response
            // returned later by the route
            for (const dir of Data) {
                if (dir != '') {
                    const imgName = dir.split('x')[1].split('-')[1];
                    const width = dir.split('x')[0];
                    const height = dir.split('x')[1].split('-')[0];
                    const card = `<div class="card">
                        <img class="cardImg" src="./assets/thumbs/${dir}" alt="test image" width="200" height="200">
                        <div class="imgDesc">
                            <h4><b>${imgName.replace('.jpg', '')} (${width}x${height})</b></h4>
                            <p>
                                <a class="imglink" target="_blank" onclick="copyToClipboard()"
                                href="http://localhost:3000/api?image=${imgName}&width=${width}&height=${height}">
                                    get link
                                </a>
                            </p>
                        </div>
                    </div>`;
                    HTMLresponse += card;
                }
            }
        }
        const responseTail = `</main>
                <footer class="footer">
                    <p>&copy; SELIM</p>
                    <p></p>
                </footer>
                </div>
                <script src="main.js" async defer></script>
            </body>
            </html>`;
        HTMLresponse += responseTail;
        res.status(200).send(HTMLresponse);
    });
    getImages();
});
exports.default = thumbs;
