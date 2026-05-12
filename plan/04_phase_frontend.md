# Phase 4: Frontend Development (ReactJS)

## Goal
Build a user-friendly interface that communicates strictly with the Orchestrator.

## 1. UI Components
- **Login Page**: Simple form to enter User ID (mock login). Store user info in State/Context.
- **Tour Gallery**: Display a list of tours fetched from the Orchestrator (or directly from Tour service if allowed for viewing, but per requirements, it's better to route through Orchestrator if strict orchestration is applied).
    - *Requirement:* Only call Orchestrator. So add `GET /tours` to Orchestrator as well.
- **Tour Detail Page**: Show details and a "Book Now" button.
- **Confirmation Screen**: Display the result of the `book-tour` call (Success/Failure message).

## 2. Orchestrator Integration
- Implement an `api.js` utility that uses `axios` to call `http://192.168.1.10:8080`.
- **Method:** `bookTour(userId, tourId)`.

## 3. Flow Implementation
1. User logs in -> Saved to `localStorage` or `Context`.
2. User browses tours -> `useEffect` calls `GET /tours`.
3. User clicks "Book Now" -> `POST /book-tour` with `userId` and `tourId`.
4. Loader is shown while Orchestrator processes the 4-step chain.
5. Result is displayed on screen.
