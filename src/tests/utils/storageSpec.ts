import { writeFile, readFile } from '../../utils/storage';

describe('test for storage util', () => {
    it('Expect input to be written inside the cache file', async () => {
        writeFile('This is A fake input for test purposes');
        const data = (await readFile()).split('\n');
        expect(data).toContain('This is A fake input for test purposes');
    });
    it('Expect writeFile to return an error', async () => {
        expect(writeFile(100 as unknown as string)).toThrowError;
    });
});
