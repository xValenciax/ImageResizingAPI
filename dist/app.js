"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 3000;
const mainRoute = '/public';
app.use((0, morgan_1.default)('dev'));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.listen(port, () => {
    console.log(`server running at http://localhost:${port}${mainRoute}`);
});
app.use(express_1.default.static('../public'));
