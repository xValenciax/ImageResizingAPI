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
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFile = exports.writeFile = exports.openFile = void 0;
const fs_1 = require("fs");
/*
*   @description an async function that opens file storage
*   @param { void }
*   @returns { Promise<FileHandle> } promise of type File indicates
     that the file's been opened successfully
*/
const openFile = () => __awaiter(void 0, void 0, void 0, function* () {
    const myFile = yield fs_1.promises.open('cache.txt', 'a+');
    return myFile;
});
exports.openFile = openFile;
/*
*   @description an async function that write data in storage file
*   @param { string } data - input data that should be written into storage file
*   @returns { Promise<void> } promise of type void indicates
     that the function returns none
*/
const writeFile = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const myFile = yield (0, exports.openFile)();
        myFile.write(`${data}\n`);
        myFile.close();
    }
    catch (err) {
        if (err instanceof Error)
            throw new Error(err.message);
    }
});
exports.writeFile = writeFile;
/*
*   @description an async function that reads data from a file
*   @param { void }
*   @returns { Promise<string> } promise of type string that's
     the result of reading content of storage file
*/
const readFile = () => __awaiter(void 0, void 0, void 0, function* () {
    const myFile = yield (0, exports.openFile)();
    const data = yield fs_1.promises.readFile('cache.txt', 'utf-8');
    myFile.close();
    return data;
});
exports.readFile = readFile;
