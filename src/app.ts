import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import sqlite3 from 'sqlite3';

// Create an in-memory SQLite database connection
const db = new sqlite3.Database(':memory:');

// Create a table in SQLite
db.serialize(() => {
    db.run('CREATE TABLE issues (id INT, title TEXT, description TEXT)');
});

// Set up the epxress app
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

    // Always insert the mock issue before read for demo purpose
    // Insert data
    const stmt = db.prepare('INSERT INTO issues VALUES (?, ?, ?)');
    stmt.run(mockIssue.id, mockIssue.title, mockIssue.description);
    stmt.finalize();

    db.all('SELECT * FROM issues', (err, rows) => {
        if (err) {
            // TODO error handling
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows[0]);
    });
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
