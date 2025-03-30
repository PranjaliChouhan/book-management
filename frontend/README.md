# Book Management Frontend

This is the frontend application for the Book Management System, built with React, TypeScript, and Tailwind CSS.

## Prerequisites

Before you begin, make sure you have the following installed on your computer:

1. **Node.js** (version 14 or higher)
   - Download from [nodejs.org](https://nodejs.org/)
   - To verify installation, open a terminal or command prompt and type: `node -v`

2. **npm** (comes with Node.js)
   - To verify installation: `npm -v`

## Step-by-Step Setup Instructions

### 1. Clone the Repository

If you haven't already cloned the main project repository:

```bash
git clone [repository-url]
cd [repository-name]/frontend
```

### 2. Install Dependencies

Open a terminal or command prompt in the frontend directory and run:

```bash
npm install
```

This will install all the necessary packages defined in the package.json file.

### 3. Configure Environment Variables

Create a `.env` file in the frontend directory with the following content:

```
VITE_API_URL=http://localhost:5000
```

This tells the frontend where to find the backend API.

### 4. Start the Development Server

Run the following command to start the development server:

```bash
npm run dev
```

The frontend will be available at http://localhost:5173 in your web browser.

## How to Use the Application

1. **Registration and Login**
   - When you first visit the application, you'll see a login/registration page
   - Create a new account by clicking "Need an account? Register"
   - Fill in your name, email, and password, then click "Register"
   - Alternatively, if you already have an account, enter your email and password to log in

2. **Managing Books**
   - After logging in, you'll see your book collection (or an empty state if you haven't added any books)
   - To add a new book, click the "Add Book" button and fill in the details
   - To view book details, click on any book in your collection
   - To edit a book, click the "Edit" button on the book detail page
   - To delete a book, click the "Delete" button on the book detail page

3. **Logging Out**
   - Click the "Logout" button in the navigation bar to log out

## Troubleshooting

1. **Cannot connect to backend**
   - Make sure the backend server is running (see backend README)
   - Check that the VITE_API_URL in your .env file matches the port your backend is running on

2. **Login or registration not working**
   - Check browser console for error messages
   - Verify that your backend is properly connected to the database
   - Make sure you're using a valid email format

3. **Changes not appearing**
   - Try refreshing the page
   - Clear your browser cache
   - Restart the development server

## Building for Production

To create a production build:

```bash
npm run build
```

This will generate optimized files in the `dist` directory that can be deployed to a web server. 