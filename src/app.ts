import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();
const port = 3000;
const mainRoute = '/public?';

app.use(morgan('dev'));

app.use(
    bodyParser.urlencoded(
        { extended: false }
    ));

app.use(bodyParser.json());


app.listen(port, () => {
    console.log(`server running at http://localhost:${port}${mainRoute}`);
});

/* eslint-disable max-len */
app.get(`${mainRoute}/:filename?/:width?/:height?`, (req, res) => {
    console.log(`${req.body.picName, req.body.width, req.body.height}`);
    res.sendFile(
        path.join(
            'D:/Courses/FWD Advanced Track/ImageProcessingAPI_Project/public/index.html'
        ));
});

app.use(express.static(
    'D:/Courses/FWD Advanced Track/ImageProcessingAPI_Project/public'
));