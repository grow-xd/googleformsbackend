import express, { Request, Response } from 'express';
import fs from 'fs';

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

interface Submission {
    name: string;
    email: string;
    phone: string;
    github_link: string;
    stopwatch_time: string;
}

let submissions: Submission[] = [];

// Load existing submissions from db.json
const loadSubmissions = () => {
    try {
        const data = fs.readFileSync('db.json', 'utf8');
        submissions = JSON.parse(data);
    } catch (err) {
        submissions = [];
    }
};

// Save submissions to db.json
const saveSubmissions = () => {
    fs.writeFileSync('db.json', JSON.stringify(submissions, null, 2));
};

// Initial load
loadSubmissions();

app.get('/ping', (req: Request, res: Response) => {
    res.json({ success: true });
});



app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
