import express from 'express';
import path from 'path';

const home = express.Router();

home.get('/public', (req, res): void => {
    res.sendFile(
        path.join(
            'D:/Courses/FWD Advanced Track/firstProject/public/index.html'
        ));
});

export default home;