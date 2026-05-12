# Phase 5: LAN Deployment & Testing

## Goal
Deploy the services across the local network (LAN) and verify the full orchestration flow.

## 1. Local Network Configuration
- Assign static IPs or ensure you know the current IP of each machine.
- Update all `.env` files with the correct `192.168.1.x` addresses.
- **Firewall Check:** Ensure the ports (8080-8084 and 3000) are open on each respective machine.

## 2. Testing Scenarios
1. **Happy Path**: User exists, Tour exists, Booking created, Payment succeeds. Result: Success.
2. **Payment Failure**: User exists, Tour exists, Booking created, Payment fails (randomly). Result: Error message "Payment Failed" and booking status should be "CANCELLED".
3. **Invalid User**: Orchestrator fails at step 1. Result: Error message "User not found".
4. **Service Down**: Turn off the Booking service. Result: Orchestrator should return "Internal Server Error" or "Booking service unavailable".

## 3. Deployment Steps
1. Start User, Tour, Booking, and Payment services first.
2. Start the Orchestrator service.
3. Start the Frontend.
4. Perform the "Book Tour" flow and watch the logs in the Orchestrator console to see the sequential calls.

## 4. Documentation for "Other Model"
When implementing, focus on:
- **Logging:** Every service should log incoming requests to help debug the flow.
- **Async/Await:** Use async/await for the Orchestrator's chain to ensure sequential execution.
- **CORS:** Extremely important for cross-machine communication in a LAN.
