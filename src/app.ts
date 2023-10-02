import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

app.get('/', (_, res: Response) => {
    res.json({'hello': 'world'})
})

// Sample static JSON object for issue
export const mockIssue = {
    id: 1,
    title: 'Title of the issue',
    description: 'Example Data',
}

/**
 * Operations
 */
// Read: requests a JSON object & prints it out
app.get('/issue', (req: Request, res: Response) => {
    console.log('Read:', mockIssue);
    res.json(mockIssue);
});

// Create: sends a JSON object to the server
app.post('/issue', (req: Request, res: Response) => {
    const newObj = req.body;
    console.log('Created:', newObj);
    res.json(newObj);
});

// Update: sends a JSON object to the server
app.put('/issue', (req: Request, res: Response) => {
    const updatedObj = req.body;
    console.log('Updated:', updatedObj);
    res.json(updatedObj);
});

// Delete: requests the server delete an issue
app.delete('/issue', (req: Request, res: Response) => {
    console.log('Deleted:', mockIssue);
    res.json(mockIssue);
    // Alternatively, you can delete the data if needed
    // data = null;
});

const server = app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

// for Jest testing
export {app, server}
