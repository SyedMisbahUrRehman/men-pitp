# Student CRUD API

Simple Node.js + Express + MongoDB + Mongoose boilerplate for Student CRUD operations with a consistent success/error response structure.

## Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Environment**

   - Copy `.env.example` to `.env`
   - Edit `.env` and set `MONGODB_URI` (and optionally `PORT`)

   ```bash
   cp .env.example .env
   ```

3. **Run**

   ```bash
   npm start
   ```

   For development with auto-reload:

   ```bash
   npm run dev
   ```

   Server runs at `http://localhost:3000` (or your `PORT`).

## API Response Structure

All responses use the same shape.

**Success**

```json
{
  "success": true,
  "message": "Human-readable message",
  "data": { ... }
}
```

**Error**

```json
{
  "success": false,
  "message": "Human-readable error message",
  "errors": "optional details or array of validation errors"
}
```

## Endpoints

| Method | Endpoint             | Description        |
|--------|----------------------|--------------------|
| GET    | `/api/students`      | List all students  |
| GET    | `/api/students/:id`  | Get one student    |
| POST   | `/api/students`      | Create a student   |
| PUT    | `/api/students/:id`  | Update a student   |
| DELETE | `/api/students/:id`  | Delete a student   |

**Health:** `GET /health` — returns `{ success: true, message: "API is running" }`.

## Student Body (POST / PUT)

- `name` (string, required)
- `email` (string, required, unique)
- `age` (number, optional)
- `course` (string, optional)

Example:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "age": 22,
  "course": "Computer Science"
}
```

## Project Structure

```
src/
  config/   db.js           # MongoDB connection
  models/   Student.js      # Student schema
  routes/   studentRoutes.js
  controllers/ studentController.js
  utils/    response.js    # success() & error() helpers
  index.js                 # App entry
```

## License

ISC
