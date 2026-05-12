# Phase 3: Orchestrator Service Development

## Goal
Implement the "Brain" of the system that coordinates the multi-step booking process.

## 1. Orchestrator Configuration (Port 8080)
- The Orchestrator must have the URLs of all leaf services in its `.env`.

## 2. The Main Workflow: POST /book-tour
This endpoint should perform the following sequence using `axios` or similar:

1. **User Validation**: Call `GET /users/{id}` (User Service) to ensure the user exists.
2. **Tour Retrieval**: Call `GET /tours/{id}` (Tour Service) to get the current price and availability.
3. **Booking Creation**: Call `POST /bookings` (Booking Service) to create a record in "PENDING" status.
4. **Payment Processing**: Call `POST /payments` (Payment Service) with the booking ID and tour price.
5. **Status Update**:
    - If Payment is **Success**: Call `PATCH /bookings/{id}` to set status to "COMPLETED".
    - If Payment is **Fail**: Call `PATCH /bookings/{id}` to set status to "CANCELLED".
6. **Final Response**: Return a consolidated object to the Frontend:
   ```json
   {
     "success": true/false,
     "bookingId": "...",
     "message": "Booking successful/failed",
     "details": { ... }
   }
   ```

## 3. Error Handling
- If any service in the chain fails (500 error or network timeout), the Orchestrator should catch the error and return a meaningful error message to the Frontend.
- (Optional) Implement basic rollback: If booking succeeds but payment fails, ensure the booking is marked as failed.
