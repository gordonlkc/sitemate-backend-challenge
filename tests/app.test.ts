import request from 'supertest'
import {app, server} from '../src/app'

describe('Server test', () => {
    afterAll(() => {
        server.close()
    })

    it('should be up and running at port 3000', async () => {
        const response = await request(app).get('/'); // Replace '/' with the route you want to test
        expect(response.status).toBe(200);
    });
});
