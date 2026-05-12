const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8084;

app.use(cors());
app.use(express.json());

// Routes
app.post('/payments', (req, res) => {
    const { bookingId, amount } = req.body;
    
    console.log(`[Payment Service] Processing payment for Booking: ${bookingId}, Amount: $${amount}`);

    // Random success/fail logic (80% success)
    const isSuccess = Math.random() < 0.8;
    const transactionId = `TXN${Math.floor(Math.random() * 999999)}`;

    setTimeout(() => {
        if (isSuccess) {
            console.log(`[Payment Service] Payment SUCCESS for Booking: ${bookingId}`);
            res.json({ success: true, transactionId, message: 'Payment processed successfully' });
        } else {
            console.log(`[Payment Service] Payment FAILED for Booking: ${bookingId}`);
            res.status(402).json({ success: false, transactionId, message: 'Insufficient funds or payment gateway error' });
        }
    }, 1000); // Simulate processing time
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Payment Service running at http://192.168.1.14:${PORT}`);
});
