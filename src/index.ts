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

app.post('/submit', (req: Request, res: Response) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;

    if (!name || !email || !phone || !github_link || !stopwatch_time) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const newSubmission: Submission = { name, email, phone, github_link, stopwatch_time };
    submissions.push(newSubmission);
    saveSubmissions();
    res.status(201).json({ success: true, submission: newSubmission });
});

app.get('/submissions', (req: Request, res: Response) => {
    res.json(submissions);
});

app.get('/read', (req: Request, res: Response) => {
    const { index } = req.query;

    if (index === undefined || isNaN(Number(index))) {
        return res.status(400).json({ error: 'Invalid index.' });
    }

    const idx = Number(index);
    if (idx < 0 || idx >= submissions.length) {
        return res.status(404).json({ error: 'Submission not found.' });
    }

    res.json(submissions[idx]);
});



app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
