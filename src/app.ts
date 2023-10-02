import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

app.get('/', (_, res: Response) => {
    res.json({'hello': 'world'})
})

const server = app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

// for Jest testing
export {app, server}
