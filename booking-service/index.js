const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8083;

app.use(cors());
app.use(express.json());

// In-memory Database
let bookings = [];

// Routes
app.post('/bookings', (req, res) => {
    const { userId, tourId, totalPrice } = req.body;
    const newBooking = {
        id: `B${Math.floor(Math.random() * 10000)}`,
        userId,
        tourId,
        totalPrice,
        status: 'PENDING',
        createdAt: new Date()
    };
    bookings.push(newBooking);
    console.log(`[Booking Service] Created booking: ${newBooking.id}`);
    res.status(201).json(newBooking);
});

app.patch('/bookings/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const bookingIndex = bookings.findIndex(b => b.id === id);

    if (bookingIndex !== -1) {
        bookings[bookingIndex].status = status;
        console.log(`[Booking Service] Updated booking ${id} status to: ${status}`);
        res.json(bookings[bookingIndex]);
    } else {
        console.log(`[Booking Service] Booking NOT found: ${id}`);
        res.status(404).json({ message: 'Booking not found' });
    }
});

app.get('/bookings/:id', (req, res) => {
    const booking = bookings.find(b => b.id === req.params.id);
    res.json(booking || { message: 'Not found' });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Booking Service running at http://192.168.1.13:${PORT}`);
});
