"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const home_1 = __importDefault(require("./routes/home"));
const api_1 = __importDefault(require("./routes/api/api"));
const upload_1 = __importDefault(require("./routes/pages/upload"));
const app = (0, express_1.default)();
const port = 3000;
app.use((0, morgan_1.default)('dev'));
app.use(home_1.default, api_1.default, upload_1.default);
app.listen(port, () => {
    console.log(`server running at http://localhost:${port}/public`);
});
app.use(express_1.default.static('D:/Courses/FWD Advanced Track/firstProject/public'));
exports.default = app;
