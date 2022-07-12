import express from 'express';
import path from 'path';

const home = express.Router();
const mainRoute = '/public';

home.get(`${mainRoute}`, (req, res): void => {
    res.sendFile(
        path.join(
            'D:/Courses/FWD Advanced Track/firstProject/public/index.html'
        ));
});

export default home;