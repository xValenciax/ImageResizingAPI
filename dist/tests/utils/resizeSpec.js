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
const resize_1 = __importDefault(require("../../utils/resize"));
const path_1 = __importDefault(require("path"));
const inp = path_1.default.normalize(path_1.default.resolve(`public/assets/full/palmtunnel.jpg`));
// path of the output image normalized 
const out = path_1.default.normalize(path_1.default.resolve(`public/assets/thumbs`));
const fakeInp = path_1.default.normalize(path_1.default.resolve(`public/assets/full/palmtunne.jpg`));
describe('test for resize process', () => {
    it('expect size of resized image to be as specified in input', () => __awaiter(void 0, void 0, void 0, function* () {
        const returnedData = yield (0, resize_1.default)(inp, 200, 200, out, 'palmtunnel.jpg');
        expect(returnedData).toContain('"width":200');
    }));
    it('expect function to return an error', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield (0, resize_1.default)(fakeInp, 200, 200, out, 'palmtunnel.jpg'))
            .toThrowError;
    }));
});
