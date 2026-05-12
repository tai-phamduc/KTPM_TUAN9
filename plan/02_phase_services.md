# Phase 2: Core Microservices Development (Leaf Services)

## Goal
Implement the individual services that handle specific domain logic. Each service should be standalone and expose a REST API.

## 1. User Service (Port 8081)
- **POST /login**: Validate credentials and return user info + token (mocked).
- **GET /users/:id**: Return user profile details.
- *Data:* Hardcode a few users for testing.

## 2. Tour Service (Port 8082)
- **GET /tours**: Return a list of all available tours.
- **GET /tours/:id**: Return details of a specific tour (price, duration, etc.).
- *Data:* Hardcode 5-10 tour items.

## 3. Booking Service (Port 8083)
- **POST /bookings**: Receive `userId` and `tourId`. Generate a unique `bookingId`, set status to "PENDING", and save to a local array/database.
- **PATCH /bookings/:id**: Update booking status (e.g., to "COMPLETED" or "FAILED").

## 4. Payment Service (Port 8084)
- **POST /payments**: Receive `bookingId` and `amount`.
- **Logic:** Implement a random success/fail generator (e.g., 80% success rate).
- **Response:** Return `{ transactionId, status: 'success' | 'fail' }`.

## Implementation Checklist for Each Service:
- [ ] Setup Express server.
- [ ] Enable CORS for the Orchestrator IP.
- [ ] Implement defined endpoints with sample data.
- [ ] Add basic logging (e.g., "Received request for /tours").
