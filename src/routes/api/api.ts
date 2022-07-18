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
api.get('/api', (req: express.Request, res: express.Response): void => {
    
    // resized image width & heigth
    const width = parseInt(req.query.width as string);
    const height = parseInt(req.query.height as string);

    if (typeof req.query.image != 'string'
        || width <= 0 || height <= 0) {
        res.status(400).send(
            `<h2>Invalid Input data!</h2>
            <p>Please make sure that you've entered the values and
             image name correctly</p>
             <p>or chech if the image you've entered actually exists in 
             './public/assets/full'</p>`
        );
    }
    
    else {
        console.log('insinde api else');
        // path of the input image normalized to fit in different OS's
        const inp = path.normalize(
            path.resolve(`public/assets/full/${req.query.image}`)
        );

        // path of the output image normalized 
        const out = path.normalize(
            path.resolve(`public/assets/thumbs`)
        );
        
        
        /*
        *   @description an async function 
            that displays images after being resized
        *   @param { void }
        *   @returns { Promise<void> } promise of type void indicates 
            that the function returns none
        */
        const showImg = async (): Promise<void> => {
            // read data from cache file
            const data = (await read()).split('\n');
            // loop of returned data
            // if current image has been processed
            // and resized down to the same size before
            // return the already resized image
            for (const line of data) {
                if (line === `${width}x${height}-${req.query.image}`) {
                    res.status(200).sendFile(out + '/' + line);
                    return;
                }
            }

            // if the image hasn't been processed before
            // resize it then output it the thumbs folder 
            // and save its path in the cache file
            resize(inp, width, height, out,
                req.query.image as string)
                .then((data) => {
                    if (data instanceof Error) {
                        res.status(400).send(
                            `<h2>Error, Invalid input</h2>
                            <p>please make sure that You've entered 
                            correct values.</p>
                            <p>or make sure that the image you've chosen 
                            exist in this path './public/assets/full'</p>`
                        );
                        return new Error('Error');
                    }
                    else {
                        res.status(200).sendFile(
                            `${out}/${width}x${height}-${req.query.image}`
                        );
                    }
                })
                .then((data) => {
                    if(!(data instanceof Error)){
                        write(path.normalize(
                            `${width}x${height}-${req.query.image}`
                        ));
                    }
                });
        };

        showImg();
    }
});

export default api;