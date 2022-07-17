import express from 'express';
import morgan from 'morgan';
import home from './routes/home';
import api from './routes/api/api';
import upload from './routes/pages/upload';
import thumbs from './routes/pages/thumbs';
import path from 'path';

const app = express();
const port = 3000;

// use morgan for live server logging
app.use(morgan('dev'));

// make express app use other routes
app.use(home, api, upload, thumbs);

app.listen(port, (): void => {
    console.log(`server running at http://localhost:${port}/public`);
});

// use static directory 'public' that contains all frontend files
app.use(
    express.static(
        path.normalize(
            path.resolve('./public')
        )
    )
);
export default app;