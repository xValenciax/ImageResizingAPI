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
const express_1 = __importDefault(require("express"));
const resize_1 = __importDefault(require("../../utils/resize"));
const path_1 = __importDefault(require("path"));
const storage_1 = require("../../utils/storage");
const api = express_1.default.Router();
/*
*   @description a get route for the api
*   @param { Request } req - HTTP request sent to the route
*   @param { Response } res - HTTP response sent back from the route
*   @returns { void }
*/
api.get('/api', (req, res) => {
    // resized image width & heigth
    const width = parseInt(req.query.width);
    const height = parseInt(req.query.height);
    if (typeof req.query.image != 'string'
        || width <= 0 || height <= 0) {
        res.status(400).send(`<h2>Invalid Input data!</h2>
            <p>Please make sure that you've entered the values and
             image name correctly</p>
             <p>or chech if the image you've entered actually exists in 
             './public/assets/full'</p>`);
    }
    else {
        console.log('insinde api else');
        // path of the input image normalized to fit in different OS's
        const inp = path_1.default.normalize(path_1.default.resolve(`public/assets/full/${req.query.image}`));
        // path of the output image normalized 
        const out = path_1.default.normalize(path_1.default.resolve(`public/assets/thumbs`));
        /*
        *   @description an async function
            that displays images after being resized
        *   @param { void }
        *   @returns { Promise<void> } promise of type void indicates
            that the function returns none
        */
        const showImg = () => __awaiter(void 0, void 0, void 0, function* () {
            // read data from cache file
            const data = (yield (0, storage_1.readFile)()).split('\n');
            // loop of returned data
            // if current image has been processed
            // and resized down to the same size before
            // return the already resized image
            for (const line of data) {
                if (line === `${width}x${height}-${req.query.image}`) {
                    res.status(200).sendFile(out + '/' + line);
                    return;
                }
            }
            // if the image hasn't been processed before
            // resize it then output it the thumbs folder 
            // and save its path in the cache file
            (0, resize_1.default)(inp, width, height, out, req.query.image)
                .then((data) => {
                if (data instanceof Error) {
                    res.status(400).send(`<h2>Error, Invalid input</h2>
                            <p>please make sure that You've entered 
                            correct values.</p>
                            <p>or make sure that the image you've chosen 
                            exist in this path './public/assets/full'</p>`);
                    return new Error('Error');
                }
                else {
                    res.status(200).sendFile(`${out}/${width}x${height}-${req.query.image}`);
                }
            })
                .then((data) => {
                if (!(data instanceof Error)) {
                    (0, storage_1.writeFile)(path_1.default.normalize(`${width}x${height}-${req.query.image}`));
                }
            });
        });
        showImg();
    }
});
exports.default = api;
