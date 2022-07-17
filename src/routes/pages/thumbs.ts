/* eslint-disable max-len */
import express from 'express';
import path from 'path';
import { promises as fs} from 'fs';

const thumbs = express.Router();


/*
*   @description a get route that opens the page where all processed images are displayed
*   @param { Request } req - HTTP request sent to the route 
*   @param { Response } res - HTTP response sent back from the route 
*   @returns { void }
*/
thumbs.get('/thumbs', (req, res): void => {
    // html response returned by the route
    let HTMLresponse = 
    `<!DOCTYPE html>
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
    const getImages = async (): Promise<void> => {
        // open the cache file and read its content
        const data = await fs.readFile(
            path.normalize(
                path.resolve('cache.txt')
            ), 'utf-8');
        
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
                const card =
                `<div class="card">
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
        const responseTail = 
            `</main>
                <footer class="footer">
                    <p>&copy; SELIM</p>
                    <p></p>
                </footer>
                </div>
                <script src="main.js" async defer></script>
            </body>
            </html>`;
        HTMLresponse += responseTail;

        res.send(HTMLresponse);
    };
    
    getImages();
});

export default thumbs;