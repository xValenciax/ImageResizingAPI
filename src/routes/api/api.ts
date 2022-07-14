import express from 'express';
import resize from '../../utils/resize';
import path from 'path';
import { readFile as read, writeFile as write }
    from '../../utils/storage';
import { ServerResponse, STATUS_CODES } from 'http';

const api = express.Router();


api.get('/api', (req, res): ServerResponse => {

    const inp =
        path.join(
            // eslint-disable-next-line max-len
            `D:/Courses/FWD Advanced Track/firstProject/public/assets/full/${req.query.image}`
        );
    const out =
        `D:/Courses/FWD Advanced Track/firstProject/public/assets/thumbs`;
    const width = parseInt(req.query.width as string);
    const height = parseInt(req.query.height as string);

    const showImg = async (): Promise<void> => {
        const data = (await read()).split('\n');
        for (const line of data) {
            if (line === `${out}/${width}x${height}${req.query.image}`) {
                res.sendFile(line);
                return;
            }
        }

        resize(inp, width, height, out, req.query.image as string)
            .then(() => res.sendFile(
                `${out}/${width}x${height}${req.query.image}`
            ));
        
        write(`${out}/${width}x${height}${req.query.image}`);
        
    };

    showImg();

    return res;
});

export default api;