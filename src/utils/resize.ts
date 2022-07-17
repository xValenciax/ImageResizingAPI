import path from 'path';
import sharp from 'sharp';


/*
*   @description an async function that resizes an image to a specified size
*   @param { string } inp - path of the input image file
*   @param { number } width - width of the input image file
*   @param { number } height - height of the input image file
*   @param { string } out - path of the destination output folder
*   @param { string } image - filename of the image with the file extenstion
*   @returns { Promise<string> } promise of type string returned 
    from sharp function
*/
const resize = async (inp: string, width: number,
    height: number, out: string, image: string): Promise<string> => {
    
    try{
        const res = await sharp(inp)
            .resize(width, height)
            .toFile(path.join(`${out}/${width}x${height}-${image}`))
            .then((data) => {
                return JSON.stringify(data);
            });
        return res;
    }

    catch (err: unknown) {
        if (typeof err === 'string') {
            err.toUpperCase();
            throw new Error(err.toString());
        } else if (err instanceof Error) {
            throw err.message;
        }
    }
    return '';
};

export default resize;