import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import home from './routes/home';
import api from './routes/api/api';

const app = express();
const port = 3000;

app.use(morgan('dev'));

app.use(
    bodyParser.urlencoded(
        { extended: false }
    ));

app.use(bodyParser.json());

app.use(home, api);

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}${mainRoute}`);
});


app.use(express.static(
    'D:/Courses/FWD Advanced Track/firstProject/public'
));


