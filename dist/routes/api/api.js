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
api.get('/api', (req, res) => {
    const inp = path_1.default.join(
    // eslint-disable-next-line max-len
    `D:/Courses/FWD Advanced Track/firstProject/public/assets/full/${req.query.image}`);
    const out = `D:/Courses/FWD Advanced Track/firstProject/public/assets/thumbs`;
    const width = parseInt(req.query.width);
    const height = parseInt(req.query.height);
    const showImg = () => __awaiter(void 0, void 0, void 0, function* () {
        const data = (yield (0, storage_1.readFile)()).split('\n');
        for (const line of data) {
            if (line === `${out}/${width}x${height}${req.query.image}`) {
                res.sendFile(line);
                return;
            }
        }
        (0, resize_1.default)(inp, width, height, out, req.query.image)
            .then(() => res.sendFile(`${out}/${width}x${height}${req.query.image}`));
        (0, storage_1.writeFile)(`${out}/${width}x${height}${req.query.image}`);
    });
    showImg();
    return res;
});
exports.default = api;
