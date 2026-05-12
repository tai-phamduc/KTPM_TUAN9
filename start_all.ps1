# Start all services for KTPM Week 9

Write-Host "Starting Travel Booking System (Microservices)..." -ForegroundColor Cyan

# Start User Service
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd user-service; npm start" -WindowStyle Normal
Write-Host "[1/6] User Service starting on port 8081..."

# Start Tour Service
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd tour-service; npm start" -WindowStyle Normal
Write-Host "[2/6] Tour Service starting on port 8082..."

# Start Booking Service
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd booking-service; npm start" -WindowStyle Normal
Write-Host "[3/6] Booking Service starting on port 8083..."

# Start Payment Service
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd payment-service; npm start" -WindowStyle Normal
Write-Host "[4/6] Payment Service starting on port 8084..."

# Start Orchestrator
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd orchestrator; npm start" -WindowStyle Normal
Write-Host "[5/6] Orchestrator starting on port 8080..."

# Start Frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev" -WindowStyle Normal
Write-Host "[6/6] Frontend starting on port 5173 (Vite)..."

Write-Host "`nAll services have been launched in separate windows." -ForegroundColor Green
Write-Host "Please wait a few seconds for them to initialize."
