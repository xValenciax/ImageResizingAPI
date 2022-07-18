import express from 'express';
import multer from 'multer';
import path from 'path';

// use multer to save uploaded images to a specific folder
const storage = multer.diskStorage({
    destination: (req: express.Request, file: Express.Multer.File,
        cb: ((error: Error | null, destination: string) => void)): void => {
        
        cb(null, path.normalize(
            path.resolve(`public/assets/full`)
        ));
    },
    filename: (req: express.Request, file: Express.Multer.File, 
        cb: ((error: Error|null, destination: string) => void)): void => {
        cb(null, file.originalname);
    }
});

const fileUpload = multer({storage});

const upload = express.Router();


/*
*   @description a get route that opens upload page
*   @param { Request } req - HTTP request sent to the route 
*   @param { Response } res - HTTP response sent back from the route 
*   @returns { void }
*/
upload.get('/upload', (req: express.Request, res: express.Response): void => {
    res.status(200).sendFile(
        path.normalize(
            path.resolve('public/upload.html')
        )
    );
});

// response returned when image is uploaded successfully to the full folder
const response =
    `<div style="width:100%; 
     display:flex; align-items: center; flex-direction: column;">
        <h1 style="text-align: center;">Image Added Successfully</h1>
        <a href="http://localhost:3000/public">back to home page</a>
    </div>`;


upload.post('/upload', fileUpload.single('uploadedImg'), (req, res): void => {
    res.status(200).send(response);
});

export default upload;