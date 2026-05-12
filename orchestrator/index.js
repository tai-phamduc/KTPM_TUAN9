const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Service URLs from Environment
const USER_SERVICE = process.env.USER_SERVICE_URL;
const TOUR_SERVICE = process.env.TOUR_SERVICE_URL;
const BOOKING_SERVICE = process.env.BOOKING_SERVICE_URL;
const PAYMENT_SERVICE = process.env.PAYMENT_SERVICE_URL;

// Proxy for Tour List (Convenience for Frontend)
app.get('/tours', async (req, res) => {
    try {
        const response = await axios.get(`${TOUR_SERVICE}/tours`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tours from Tour Service' });
    }
});

// Proxy for Login
app.post('/login', async (req, res) => {
    try {
        const response = await axios.post(`${USER_SERVICE}/login`, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { message: 'Auth Service unavailable' });
    }
});

// MAIN ORCHESTRATION FLOW
app.post('/book-tour', async (req, res) => {
    const { userId, tourId } = req.body;
    console.log(`\n[Orchestrator] Starting booking flow for User: ${userId}, Tour: ${tourId}`);

    let bookingId = null;

    try {
        // Step 1: Validate User
        console.log(`[Orchestrator] Step 1: Validating User...`);
        const userRes = await axios.get(`${USER_SERVICE}/users/${userId}`);
        const user = userRes.data;
        console.log(`[Orchestrator] User validated: ${user.name}`);

        // Step 2: Get Tour Details
        console.log(`[Orchestrator] Step 2: Fetching Tour Details...`);
        const tourRes = await axios.get(`${TOUR_SERVICE}/tours/${tourId}`);
        const tour = tourRes.data;
        console.log(`[Orchestrator] Tour details retrieved: ${tour.title} ($${tour.price})`);

        // Step 3: Create Booking (PENDING)
        console.log(`[Orchestrator] Step 3: Creating Booking...`);
        const bookingRes = await axios.post(`${BOOKING_SERVICE}/bookings`, {
            userId,
            tourId,
            totalPrice: tour.price
        });
        bookingId = bookingRes.data.id;
        console.log(`[Orchestrator] Booking created in PENDING status: ${bookingId}`);

        // Step 4: Process Payment
        console.log(`[Orchestrator] Step 4: Processing Payment...`);
        try {
            const paymentRes = await axios.post(`${PAYMENT_SERVICE}/payments`, {
                bookingId,
                amount: tour.price
            });
            
            console.log(`[Orchestrator] Payment Successful! Transaction ID: ${paymentRes.data.transactionId}`);

            // Step 5a: Finalize Booking (COMPLETED)
            await axios.patch(`${BOOKING_SERVICE}/bookings/${bookingId}`, { status: 'COMPLETED' });
            console.log(`[Orchestrator] Booking ${bookingId} finalized.`);

            res.json({
                success: true,
                bookingId,
                message: 'Tour booked successfully!',
                details: {
                    user: user.name,
                    tour: tour.title,
                    amount: tour.price,
                    transactionId: paymentRes.data.transactionId
                }
            });

        } catch (paymentError) {
            console.log(`[Orchestrator] Payment Failed for Booking: ${bookingId}`);
            
            // Step 5b: Cancel Booking (CANCELLED)
            await axios.patch(`${BOOKING_SERVICE}/bookings/${bookingId}`, { status: 'CANCELLED' });
            console.log(`[Orchestrator] Booking ${bookingId} has been marked as CANCELLED.`);

            res.status(402).json({
                success: false,
                bookingId,
                message: 'Booking failed due to payment error.',
                error: paymentError.response?.data?.message || 'Payment processing failed'
            });
        }

    } catch (error) {
        console.error(`[Orchestrator] Error in orchestration flow:`, error.message);
        res.status(error.response?.status || 500).json({
            success: false,
            message: 'An error occurred during the booking process.',
            error: error.response?.data?.message || error.message
        });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Orchestrator Service running at http://192.168.1.10:${PORT}`);
});
