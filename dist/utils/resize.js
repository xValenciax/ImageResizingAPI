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
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
/*
*   @description an async function that resizes an image to a specified size
*   @param { string } inp - path of the input image file
*   @param { number } width - width of the input image file
*   @param { number } height - height of the input image file
*   @param { string } out - path of the destination output folder
*   @param { string } image - filename of the image with the file extenstion
*   @returns { Promise<string> } promise of type string returned
    from sharp function
*/
const resize = (inp, width, height, out, image) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield (0, sharp_1.default)(inp)
            .resize(width, height)
            .toFile(path_1.default.join(`${out}/${width}x${height}-${image}`))
            .then((data) => {
            return JSON.stringify(data);
        });
        return res;
    }
    catch (err) {
        console.log('inside resize util catch');
        if (err instanceof Error) {
            return err;
        }
    }
    return '';
});
exports.default = resize;
