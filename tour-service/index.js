const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8082;

app.use(cors());
app.use(express.json());

// Mock Data
const tours = [
    { id: '101', title: 'Ha Long Bay 2 Days', price: 150, description: 'Explore the stunning islands and caves.' },
    { id: '102', title: 'Da Lat Discovery', price: 120, description: 'Visit the flower gardens and waterfalls.' },
    { id: '103', title: 'Saigon Street Food', price: 50, description: 'Taste the best local food in HCM City.' },
    { id: '104', title: 'Hoi An Ancient Town', price: 80, description: 'A walk through history and culture.' }
];

// Routes
app.get('/tours', (req, res) => {
    console.log(`[Tour Service] Fetching all tours`);
    res.json(tours);
});

app.get('/tours/:id', (req, res) => {
    const { id } = req.params;
    const tour = tours.find(t => t.id === id);
    if (tour) {
        console.log(`[Tour Service] Tour found: ${id}`);
        res.json(tour);
    } else {
        console.log(`[Tour Service] Tour NOT found: ${id}`);
        res.status(404).json({ message: 'Tour not found' });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Tour Service running at http://192.168.1.12:${PORT}`);
});
