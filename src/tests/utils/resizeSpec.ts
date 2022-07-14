/* eslint-disable max-len */
import resize from '../../utils/resize';

const inp = 
`D:/Courses/FWD Advanced Track/firstProject/public/assets/full/palmtunnel.jpg`;
const out =
        `D:/Courses/FWD Advanced Track/firstProject/public/assets/thumbs`;
        
describe('Endpoint test for Home Route', () => {
    it('expect size of resized image to be as specified in input',
        async () => {
            const returnedData = await resize(inp, 200, 200, out, 'palmtunnel.jpg');
            expect(returnedData).toContain('"width":200');
        });
});
