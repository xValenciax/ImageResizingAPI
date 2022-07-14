import supertest from 'supertest';
import app from '../../app';

const request = supertest(app);

describe('GET /public', () => {
    it('expect /public route to respond with status 200', async () => {
        const response = await request.get('/public');
        expect(response.statusCode).toEqual(200);
    });
});