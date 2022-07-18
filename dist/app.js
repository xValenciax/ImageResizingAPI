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
const thumbs_1 = __importDefault(require("./routes/pages/thumbs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 3000;
// use morgan for live server logging
app.use((0, morgan_1.default)('dev'));
// make express app use other routes
app.use(home_1.default, api_1.default, upload_1.default, thumbs_1.default);
app.listen(port, () => {
    console.log(`server running at http://localhost:${port}/public`);
});
// use static directory 'public' that contains all frontend files
app.use(express_1.default.static(path_1.default.normalize(path_1.default.resolve('./public'))));
exports.default = app;
