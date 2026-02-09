# FitRock Admin API

A RESTful API backend built with Express.js, TypeScript, PostgreSQL, and Sequelize ORM.

## Features

- ✓ Express.js server
- ✓ TypeScript support
- ✓ PostgreSQL database with Sequelize ORM
- ✓ Body-parser and cookie-parser middleware
- ✓ CORS enabled
- ✓ Error handling middleware
- ✓ Environment configuration

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd fitrock-admin-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your database credentials:

   ```
   PORT=3000
   NODE_ENV=development
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=fitrock_api
   DB_USER=postgres
   DB_PASSWORD=your_password
   ```

4. **Create database** (if not exists)
   ```bash
   createdb fitrock_api
   ```

## Development

Start the development server with hot-reload:

```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## Build

Compile TypeScript to JavaScript:

```bash
npm run build
```

## Production

Start the production server:

```bash
npm start
```

## Project Structure

```
fitrock-admin-api/
├── src/
│   ├── config/          # Configuration files (database)
│   ├── models/          # Sequelize data models
│   ├── routes/          # API routes
│   ├── controllers/      # Route handlers
│   ├── middleware/       # Express middleware
│   └── index.ts         # Application entry point
├── dist/                # Compiled JavaScript output
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── .env.example         # Environment variables template
└── .gitignore          # Git ignore rules
```

## API Endpoints

### Health Check

- **GET** `/api/health` - Check if API is running

## Available Scripts

| Command         | Description                           |
| --------------- | ------------------------------------- |
| `npm run dev`   | Start development server with ts-node |
| `npm run build` | Compile TypeScript to JavaScript      |
| `npm start`     | Start production server               |
| `npm run watch` | Watch mode for TypeScript compilation |

## Creating Models

Create a new model in `src/models/`:

```typescript
import { DataTypes, Model, Sequelize } from "sequelize";

export default class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;

  static initModel(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        tableName: "users",
      },
    );
  }

  static associate() {
    // Add associations here
  }
}
```

## Creating Routes

Add new routes in `src/routes/`:

```typescript
import { Router } from "express";
import userController from "../controllers/userController";

const router = Router();

router.get("/", userController.getAll);
router.post("/", userController.create);
router.get("/:id", userController.getById);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);

export default router;
```

Then import in `src/routes/index.ts`:

```typescript
import userRoutes from "./userRoutes";
router.use("/users", userRoutes);
```

## Database Migrations

(Note: Sequelize CLI setup required for migrations)

```bash
# Run migrations
npm run db:migrate

# Run seeds
npm run db:seed

# Undo migrations
npm run db:undo
```

## Troubleshooting

### Database Connection Error

- Ensure PostgreSQL is running
- Verify credentials in `.env`
- Check if database exists

### Port Already in Use

- Change PORT in `.env`
- Or kill existing process: `lsof -i :3000`

## License

ISC
