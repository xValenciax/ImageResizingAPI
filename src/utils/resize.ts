import path from 'path';
import sharp from 'sharp';

const resize = async (inp: string, width: number,
    height: number, out: string, image: string): Promise<void> => {
    
    const res = await sharp(inp)
        .resize(width, height)
        .toFile(path.join(`${out}/${image}`));
};

export default resize;