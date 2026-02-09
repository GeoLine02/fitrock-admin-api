# FitRock Admin API - Copilot Instructions

This is an Express.js backend API built with TypeScript, PostgreSQL, and Sequelize ORM.

## Project Structure

- `src/` - Source code
  - `index.ts` - Application entry point
  - `config/` - Configuration files (database)
  - `models/` - Sequelize data models
  - `routes/` - API routes
  - `controllers/` - Route handlers
  - `middleware/` - Express middleware

## Setup Instructions

1. Install dependencies: `npm install`
2. Create `.env` file from `.env.example` and configure database credentials
3. Run database migrations: `npm run db:migrate`
4. Start development server: `npm run dev`

## Development Commands

- `npm run dev` - Start dev server with ts-node
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server
- `npm run watch` - Watch mode for TypeScript compilation
