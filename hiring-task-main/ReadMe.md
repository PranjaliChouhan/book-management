# Book Management Application

A full-stack application for managing a personal book collection.

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT

## Installation

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
npm run frontend:install
```

## Development

```bash
# Start backend in development mode
npm run dev

# Start frontend in development mode (in a separate terminal)
npm run frontend:dev
```

## Deployment

### Prerequisites

- PostgreSQL database (e.g., Supabase, Heroku Postgres)
- Node.js hosting (e.g., Render, Railway, Heroku)

### Environment Variables

Make sure to set these environment variables in your deployment environment:

```
PORT=5000
JWT_SECRET=your-secret-key
DATABASE_URL=postgresql://user:password@host:port/database
```

### Deployment Steps

1. **For Render.com:**
   - Connect your GitHub repository
   - For backend: Create a Web Service, use `npm install` as the build command and `npm start` as the start command
   - For frontend: Create a Static Site, use `npm run deploy:build` as the build command and `frontend/dist` as the publish directory
   - Set environment variables in the Render dashboard

2. **For Railway:**
   - Connect your GitHub repository
   - Railway will automatically detect and deploy your application
   - Set environment variables in the Railway dashboard

3. **For Heroku:**
   - `heroku create`
   - `git push heroku main`
   - Set environment variables with `heroku config:set KEY=VALUE`

## Features

- User authentication (signup, login)
- Add, edit, delete, and view books
- Responsive design for mobile and desktop
- Book cover image display
