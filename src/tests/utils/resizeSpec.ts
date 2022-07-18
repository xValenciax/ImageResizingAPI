/* eslint-disable max-len */
import resize from '../../utils/resize';
import path from 'path';

const inp = path.normalize(
    path.resolve(`public/assets/full/palmtunnel.jpg`)
);

// path of the output image normalized 
const out = path.normalize(
    path.resolve(`public/assets/thumbs`)
);

const fakeInp = path.normalize(
    path.resolve(`public/assets/full/palmtunne.jpg`)
);
        
describe('test for resize process', () => {
    it('expect size of resized image to be as specified in input',
        async () => {
            const returnedData = await resize(inp, 200, 200, out, 'palmtunnel.jpg');
            expect(returnedData).toContain('"width":200');
        });
    
    it('expect function to return an error',
        async () => {
            expect(await resize(fakeInp, 200, 200, out, 'palmtunnel.jpg'))
                .toThrowError;
        });
});
