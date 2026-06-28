# Quantiphi Vibe Coding

Full Stack UPI Transaction Summary & Categorization

## Tech Stack

- React
- Express
- TypeScript# Quantiphi – AI Powered UPI Transaction Dashboard

## Overview

A modern fintech dashboard that automatically categorizes UPI transactions, provides spending analytics and highlights cashback opportunities.

The project demonstrates backend business logic combined with a modern frontend dashboard for transaction visualization.

---

## Features

### Backend

- Transaction parsing
- Automatic category detection
- Spending analytics
- Income vs Expense calculation
- Cashback detection
- REST APIs

### Frontend

- Modern fintech dashboard
- Responsive UI
- Analytics cards
- Transaction timeline
- Category badges
- Category selector
- Expected savings display

---

## Tech Stack

### Frontend

- React / Next.js (v0 generated UI)
- Tailwind CSS
- TypeScript

### Backend

- Node.js
- Express
- TypeScript

---

## API Endpoints

### Get Transactions

GET

```
/transactions
```

Returns all processed transactions.

---

### Analytics

GET

```
/transactions/analytics
```

Returns spending summary by category together with income and expense totals.

---

## Categories

Transactions are automatically categorized into:

- Food
- Travel
- Salary
- Miscellaneous

---

## Cashback Detection

Transactions containing cashback information are identified and displayed with an Expected Savings indicator on the dashboard.

---

## Project Structure

```
backend/
    controllers/
    routes/
    services/
    data/
    types/

frontend/
    app/
    components/
    lib/
```

---

## Running the Project

### Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:3000
```

---

## Future Improvements

- Database persistence
- Authentication
- AI-powered merchant classification
- Budget recommendations
- Real-time bank integration
- Better analytics and charts

---

Developed as part of the Quantiphi Full Stack / AI Engineering Assessment.