const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());

// Mock Data
const users = [
    { id: '1', username: 'admin', name: 'System Admin', email: 'admin@example.com' },
    { id: '2', username: 'tai_pham', name: 'Tai Pham Duc', email: 'tai.pham@example.com' },
    { id: '3', username: 'tester', name: 'QA Tester', email: 'tester@test.com' }
];

// Routes
app.post('/login', (req, res) => {
    const { username } = req.body;
    const user = users.find(u => u.username === username);
    if (user) {
        console.log(`[User Service] Login successful for: ${username}`);
        res.json({ success: true, user });
    } else {
        console.log(`[User Service] Login failed for: ${username}`);
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(u => u.id === id);
    if (user) {
        console.log(`[User Service] User found: ${id}`);
        res.json(user);
    } else {
        console.log(`[User Service] User NOT found: ${id}`);
        res.status(404).json({ message: 'User not found' });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`User Service running at http://192.168.1.11:${PORT}`);
});
