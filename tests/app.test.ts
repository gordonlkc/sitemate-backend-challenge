import request from 'supertest'
import {app, mockIssue, server} from '../src/app'

describe('Server test', () => {
    afterAll(() => {
        server.close()
    })

    it('should be up and running at port 3000', async () => {
        const response = await request(app).get('/'); // Replace '/' with the route you want to test
        expect(response.status).toBe(200);
    });


    it('Read operation', async () => {
        // arrange
        const consoleSpy = jest.spyOn(global.console, 'log');

        // act
        const response = await request(app)
            .get('/issue');

        // assert
        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(mockIssue)
        expect(console.log).toHaveBeenCalledWith('Read:', mockIssue);

        consoleSpy.mockRestore();
    });

    it('Create Operation', async () => {
        // arrange
        const consoleSpy = jest.spyOn(global.console, 'log');

        // act
        const response = await request(app)
            .post('/issue').send(mockIssue);

        // assert
        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(mockIssue)
        expect(console.log).toHaveBeenCalledWith('Created:', mockIssue);

        consoleSpy.mockRestore();
    });

    it('Update Operation', async () => {
        // arrange
        const consoleSpy = jest.spyOn(global.console, 'log');

        // act
        const response = await request(app)
            .put('/issue').send(mockIssue);

        // assert
        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(mockIssue)
        expect(console.log).toHaveBeenCalledWith('Updated:', mockIssue);

        consoleSpy.mockRestore();
    });
});
