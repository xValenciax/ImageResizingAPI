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
const storage_1 = require("../../utils/storage");
describe('test for storage util', () => {
    it('Expect input to be written inside the cache file', () => __awaiter(void 0, void 0, void 0, function* () {
        (0, storage_1.writeFile)('This is A fake input for test purposes');
        const data = (yield (0, storage_1.readFile)()).split('\n');
        expect(data).toContain('This is A fake input for test purposes');
    }));
});
