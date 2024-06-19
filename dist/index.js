"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const port = 3000;
// Middleware to parse JSON bodies
app.use(express_1.default.json());
let submissions = [];
// Load existing submissions from db.json
const loadSubmissions = () => {
    try {
        const data = fs_1.default.readFileSync('db.json', 'utf8');
        submissions = JSON.parse(data);
    }
    catch (err) {
        submissions = [];
    }
};
// Save submissions to db.json
const saveSubmissions = () => {
    fs_1.default.writeFileSync('db.json', JSON.stringify(submissions, null, 2));
};
// Initial load
loadSubmissions();
app.get('/ping', (req, res) => {
    res.json({ success: true });
});
app.post('/submit', (req, res) => {
    if (submissions.length >= 20) {
        return res.status(403).json({ error: 'Submission limit reached.' });
    }
    const { name, email, phone, github_link, stopwatch_time } = req.body;
    if (!name || !email || !phone || !github_link || !stopwatch_time) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    const timestamp = new Date().toISOString();
    const newSubmission = { name, email, phone, github_link, stopwatch_time, timestamp };
    submissions.push(newSubmission);
    saveSubmissions();
    res.status(201).json({ success: true, submission: newSubmission });
});
app.get('/submissions', (req, res) => {
    res.json(submissions);
});
app.get('/read', (req, res) => {
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
app.delete('/delete', (req, res) => {
    const { index } = req.query;
    if (index === undefined || isNaN(Number(index))) {
        return res.status(400).json({ error: 'Invalid index.' });
    }
    const idx = Number(index);
    if (idx < 0 || idx >= submissions.length) {
        return res.status(404).json({ error: 'Submission not found.' });
    }
    const deletedSubmission = submissions.splice(idx, 1)[0];
    saveSubmissions();
    res.json({ success: true, deletedSubmission });
});
app.put('/edit', (req, res) => {
    const { index } = req.query;
    if (index === undefined || isNaN(Number(index))) {
        return res.status(400).json({ error: 'Invalid index.' });
    }
    const idx = Number(index);
    if (idx < 0 || idx >= submissions.length) {
        return res.status(404).json({ error: 'Submission not found.' });
    }
    const updatedFields = req.body;
    if (Object.keys(updatedFields).length === 0) {
        return res.status(400).json({ error: 'No fields to update.' });
    }
    submissions[idx] = Object.assign(Object.assign(Object.assign({}, submissions[idx]), updatedFields), { timestamp: new Date().toISOString() });
    saveSubmissions();
    res.json({ success: true, updatedSubmission: submissions[idx] });
});
app.get('/submissions/group', (req, res) => {
    const { email } = req.query;
    if (!email) {
        return res.status(400).json({ error: 'Email is required.' });
    }
    const submissionsGroup = submissions.filter(submission => submission.email.includes(email));
    res.json(submissionsGroup);
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
