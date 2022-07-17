import express from 'express';
import path from 'path';

// calling express router to use routes in external modules
const home = express.Router();


/*
*   @description get route with the uri of '/public' that opens the home page
*   @param { Request } req - HTTP request sent to the route 
*   @param { Response } res - HTTP response sent back from the route 
*   @returns { void }
*/
home.get('/public', (req, res): void => {
    res.sendFile(
        path.normalize(
            path.resolve('public/index.html')
        )
    );
});

export default home;