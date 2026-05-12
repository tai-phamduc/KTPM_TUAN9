# Phase 1: Foundation & Project Setup

## Goal
Establish the project structure and shared configuration to ensure all services can communicate effectively.

## 1. Directory Structure
Create a root folder with subdirectories for each service:
```text
/tuan9
  /plan          <- Implementation plans
  /frontend      <- ReactJS App
  /orchestrator  <- Node.js/Express
  /user-service  <- Node.js/Express
  /tour-service  <- Node.js/Express
  /booking-service <- Node.js/Express
  /payment-service <- Node.js/Express
```

## 2. Environment Configuration
Create a `.env` file template in each service to handle IP addresses and Ports.
**Global Config Mapping:**
- `ORCHESTRATOR_URL=http://192.168.1.10:8080`
- `USER_SERVICE_URL=http://192.168.1.11:8081`
- `TOUR_SERVICE_URL=http://192.168.1.12:8082`
- `BOOKING_SERVICE_URL=http://192.168.1.13:8083`
- `PAYMENT_SERVICE_URL=http://192.168.1.14:8084`

## 3. Shared Data Models (Types)
Define the following JSON structures for consistency:
- **User:** `{ id, username, email }`
- **Tour:** `{ id, title, price, description }`
- **Booking:** `{ id, userId, tourId, status, totalPrice }`
- **Payment:** `{ bookingId, amount, status (success/fail) }`

## 4. Boilerplate Setup
- Initialize each backend service with `npm init -y` and install `express`, `cors`, `dotenv`, and `axios`.
- Initialize the frontend with `npx create-react-app frontend`.
