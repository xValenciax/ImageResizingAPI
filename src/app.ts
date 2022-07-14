import express from 'express';
import morgan from 'morgan';
import home from './routes/home';
import api from './routes/api/api';

const app = express();
const port = 3000;

app.use(morgan('dev'));

app.use(home, api);

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}/public`);
});

app.use(express.static(
    'D:/Courses/FWD Advanced Track/firstProject/public'
));

export default app;