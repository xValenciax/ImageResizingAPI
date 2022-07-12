import express from 'express';
import resize from '../../utils/resize';
import path from 'path';

const api = express.Router();

api.get('/api/:image?/:width?/:height?', (req, res): void => {
    // eslint-disable-next-line max-len
    const inp =
        path.join(
            // eslint-disable-next-line max-len
            `D:/Courses/FWD Advanced Track/firstProject/public/assets/full/${req.params.image}`
        );
    // eslint-disable-next-line max-len
    const outdir = `D:/Courses/FWD Advanced Track/firstProject/public/assets/thumbs`;
    const width = parseInt(req.params.width as string);
    const height = parseInt(req.params.height as string);
    
    resize(inp, width, height, outdir, req.params.image as string);

    res.sendFile(
        path.join(
            `${outdir}/${req.params.image}`
        )
    );
    console.log(req.params.image);
});

export default api;