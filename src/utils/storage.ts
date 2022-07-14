import { promises as fs } from 'fs';
import { FileHandle } from 'fs/promises';

export const openFile = async (): Promise<FileHandle> => {
    const myFile = await fs.open('cache.txt', 'a+');
    console.log(JSON.stringify(myFile));
    return myFile;
};

export const writeFile = async (data: string): Promise<void> => {
    const myFile = await openFile();
    myFile.write(`${data}\n`);
    myFile.close();
};

export const readFile = async (): Promise<string> => {
    const myFile = await openFile();
    const data = await fs.readFile('cache.txt', 'utf-8');
    myFile.close();
    return data;
};
