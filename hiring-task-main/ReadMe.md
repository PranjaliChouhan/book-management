# Book Management Backend

A full-stack application for managing a personal book collection.

## What's This Project?

This application allows you to:
- Create an account and log in
- Add books to your personal collection
- View details about your books
- Edit book information
- Delete books you no longer want to track

## Prerequisites

Before you begin, make sure you have the following installed:

1. **Node.js** (version 14 or higher)
   - Download from [nodejs.org](https://nodejs.org/)
   - To check if you have it installed, open a terminal or command prompt and type: `node -v`

2. **npm** (comes with Node.js)
   - To check if you have it installed: `npm -v`

3. **PostgreSQL** (version 12 or higher)
   - Option 1: Install locally from [postgresql.org](https://www.postgresql.org/download/)
   - Option 2: Use a free PostgreSQL service like [Supabase](https://supabase.com/)

## Step-by-Step Setup Instructions

### 1. Clone the Repository

```bash
# Using HTTPS
git clone https://github.com/your-username/book-management.git

# OR using SSH
git clone git@github.com:your-username/book-management.git

# Navigate to the project directory
cd book-management
```

### 2. Install Backend Dependencies

```bash
# Inside the hiring-task-main directory (backend)
npm install
```

### 3. Set Up the Database

#### Option 1: Local PostgreSQL Database

1. Create a new PostgreSQL database:
   ```bash
   # Log into PostgreSQL command line
   psql -U postgres

   # Create a new database
   CREATE DATABASE book_management;
   
   # Exit PostgreSQL command line
   \q
   ```

2. Update the `.env` file (create one if it doesn't exist) in the project root with your database credentials:
   ```
   PORT=5000
   JWT_SECRET=book-management-secret-key

   # PostgreSQL Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=book_management
   DB_USER=postgres
   DB_PASSWORD=your_password

   # Prisma Database URL
   DATABASE_URL=postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=public
   ```

#### Option 2: Using Supabase (Cloud Database)

1. Create a free account on [Supabase](https://supabase.com/)
2. Create a new project
3. In the Supabase dashboard, go to Settings > Database to find your connection string
4. Update the `.env` file:
   ```
   PORT=5000
   JWT_SECRET=book-management-secret-key
   DATABASE_URL=your_supabase_connection_string
   ```

### 4. Run Database Migrations

```bash
# Set up the database tables
npx prisma migrate dev --name init

# Generate Prisma client
npx prisma generate
```

### 5. Start the Backend Server

```bash
# Start the development server
npm run dev
```

You should see a message that the server is running on port 5000 (or whatever port you specified in the .env file).

## Setting Up the Frontend

Please see the README.md file in the frontend directory for instructions on setting up and running the frontend application.

## Common Issues and Solutions

### "Database connection failed"
- Check that PostgreSQL is running
- Verify your database credentials in the .env file
- Make sure your PostgreSQL server allows connections (check pg_hba.conf)

### "JWT_SECRET must be defined"
- Make sure you have JWT_SECRET defined in your .env file

### "Prisma error: Migration cannot be run"
- Try running `npx prisma migrate reset` (this will delete all data!)
- Then run `npx prisma migrate dev --name init` again

## How to Use the API

The backend provides the following API endpoints:

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Log in an existing user
- `GET /api/auth/profile` - Get the current user's profile

### Books
- `GET /api/books` - Get all books for the logged-in user
- `GET /api/books/:id` - Get a specific book by ID
- `POST /api/books` - Create a new book
- `PUT /api/books/:id` - Update a book by ID
- `DELETE /api/books/:id` - Delete a book by ID

## Development

```bash
# Run tests
npm test

# Check for linting errors
npm run lint

# Fix linting errors automatically
npm run lint:fix
```
