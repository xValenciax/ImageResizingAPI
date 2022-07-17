import express from 'express';
import resize from '../../utils/resize';
import path from 'path';
import { readFile as read, writeFile as write }
    from '../../utils/storage';

const api = express.Router();

/*
*   @description a get route for the api
*   @param { Request } req - HTTP request sent to the route 
*   @param { Response } res - HTTP response sent back from the route 
*   @returns { void }
*/
api.get('/api', (req, res): void => {
    // path of the input image normalized to fit in different OS's
    const inp = path.normalize(
        path.resolve(`public/assets/full/${req.query.image}`)
    );

    // path of the output image normalized 
    const out = path.normalize(
        path.resolve(`public/assets/thumbs`)
    );
    
    // resized image width & heigth
    const width = parseInt(req.query.width as string);
    const height = parseInt(req.query.height as string);

    
    /*
    *   @description an async function that displays images after being resized
    *   @param { void }
    *   @returns { Promise<void> } promise of type void indicates 
        that the function returns none
    */
    const showImg = async (): Promise<void> => {
        // read data from cache file
        const data = (await read()).split('\n');
        try {
            // loop of returned data
            // if current image has been processed
            // and resized down to the same size before
            // return the already resized image
            for (const line of data) {
                if (line === `${width}x${height}-${req.query.image}`) {
                    res.sendFile(out + '/' + line);
                    return;
                }
            }
        }
        catch(err) {
            res.send('input error' + err);
        }

        try {
            // if the image hasn't been processed before
            // resize it then output it the thumbs folder 
            // and save its path in the cache file
            resize(inp, width, height, out, req.query.image as string)
                .then(() => res.sendFile(
                    `${out}/${width}x${height}-${req.query.image}`
                ));
            
            write(path.normalize(
                `${width}x${height}-${req.query.image}`
            ));
        }
        
        catch(err){
            res.send(err);
        }
    };

    showImg();
});

export default api;