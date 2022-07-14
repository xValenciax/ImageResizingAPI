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
const openFile = () => __awaiter(void 0, void 0, void 0, function* () {
    const myFile = yield fs_1.promises.open('cache.txt', 'a+');
    console.log(JSON.stringify(myFile));
    return myFile;
});
exports.openFile = openFile;
const writeFile = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const myFile = yield (0, exports.openFile)();
    myFile.write(`${data}\n`);
    myFile.close();
});
exports.writeFile = writeFile;
const readFile = () => __awaiter(void 0, void 0, void 0, function* () {
    const myFile = yield (0, exports.openFile)();
    const data = yield fs_1.promises.readFile('cache.txt', 'utf-8');
    myFile.close();
    return data;
});
exports.readFile = readFile;
