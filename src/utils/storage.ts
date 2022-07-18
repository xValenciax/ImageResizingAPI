import { promises as fs } from 'fs';
import { FileHandle } from 'fs/promises';

/*
*   @description an async function that opens file storage
*   @param { void }
*   @returns { Promise<FileHandle> } promise of type File indicates
     that the file's been opened successfully
*/
export const openFile = async (): Promise<FileHandle> => {
    const myFile = await fs.open('cache.txt', 'a+');
    return myFile;
};


/*
*   @description an async function that write data in storage file
*   @param { string } data - input data that should be written into storage file
*   @returns { Promise<void> } promise of type void indicates
     that the function returns none
*/
export const writeFile = async (data: string): Promise<void|Error> => {
    try {
        const myFile = await openFile();
        myFile.write(`${data}\n`);
        myFile.close();
    }
    catch (err) {
        if (err instanceof Error)
            throw new Error(err.message);
    }
};


/*
*   @description an async function that reads data from a file
*   @param { void }
*   @returns { Promise<string> } promise of type string that's
     the result of reading content of storage file
*/
export const readFile = async (): Promise<string> => {
    const myFile = await openFile();
    const data = await fs.readFile('cache.txt', 'utf-8');
    myFile.close();
    return data;
};
