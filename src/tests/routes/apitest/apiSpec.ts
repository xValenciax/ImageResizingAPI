import app from '../../../app';
import supertest from 'supertest';

const request = supertest(app);

describe('Api Endpoint test', () => {
    const query = '?image=encenadaport.jpg&width=200&height=200';
    const fakeQuery = '?image=hello&width=-200&height=200';

    it('expects /api route to respond with status 200', async () => {
        const response = await request.get(`/api${query}`);
        expect(response.statusCode).toEqual(200);
    });

    it('expects /api route to respond with status 400', async () => {
        const response = await request.get(`/api${fakeQuery}`);
        expect(response.statusCode).toEqual(400);
    });
});
