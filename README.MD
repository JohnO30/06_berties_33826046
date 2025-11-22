# Berties Books

A dynamic web application for managing and browsing books, built with Node.js, Express, and EJS templating.

## Features

### Book Management
- **List All Books** - View a complete catalog of all books in the database with their ID, name, and price
- **Add New Books** - Easy-to-use form for adding new books to the inventory with name and price validation
- **Search Functionality** - Advanced search feature with partial matching to find books by title
- **Bargain Books** - Special page displaying all books priced under £20

### User Features
- **User Registration** - Registration form for new users to sign up with the bookshop with secure password hashing
- **User Login** - Secure login system with bcrypt password verification
- **User List** - View all registered users (passwords are never displayed)
- **Login Audit** - Complete audit trail of all login attempts
- **Responsive Interface** - Clean, styled interface with consistent navigation across all pages
- **Dynamic Content** - All pages dynamically render data from the MySQL database

### Technical Features
- Server-side rendering with EJS templates
- MySQL database integration for persistent data storage
- Form validation and secure data handling
- RESTful routing structure
- Error handling middleware

## Available Routes

- `/` - Home page with navigation links
- `/about` - About the bookshop
- `/books/search` - Search for books
- `/books/list` - View all books
- `/books/addbook` - Add a new book
- `/books/bargainbooks` - View books under £20
- `/users/register` - User registration
- `/users/list` - View all registered users
- `/users/login` - User login
- `/users/audit` - View login audit history

## Setup Instructions

### Prerequisites
- Node.js (v12 or higher)
- MySQL Server
- npm (Node Package Manager)

### Installation

1. **Clone or download the repository**
   ```
   git clone <repository-url>
   cd berties-books
   ```

2. **Install dependencies**
   ```
   npm install
   ```

3. **Set up the database**
   - Create a MySQL database
   - Run the SQL scripts in the following order:
     ```
     mysql -u root -p < create_db.sql
     mysql -u root -p < myBookShop.sql
     mysql -u root -p < insert_test_data.sql
     ```

4. **Configure database connection**
   - Update the database credentials in `index.js` with your MySQL username and password

5. **Run the application**
   ```
   node index.js
   ```

6. **Access the application**
   - Open your browser and navigate to `http://localhost:8000`

## Project Structure

```
berties-books/
├── views/              # EJS template files
│   ├── index.ejs       # Home page
│   ├── about.ejs       # About page
│   ├── list.ejs        # Book list display
│   ├── addbook.ejs     # Add book form
│   ├── search.ejs      # Search form
│   └── register.ejs    # User registration
├── routes/             # Route handlers
│   ├── main.js         # Main routes
│   ├── books.js        # Book-related routes
│   └── users.js        # User-related routes
├── public/             # Static files
│   └── main.css        # Stylesheet
├── index.js            # Main application file
├── package.json        # Dependencies
└── *.sql              # Database setup scripts
```

## Dotenv Implementation

The application uses the `dotenv` package to manage environment variables, which is a best practice for handling sensitive configuration data like database credentials.

### How It Works

1. **Environment File**: A `.env` file in the root directory stores configuration variables:
   - Database credentials (host, user, password, database name)
   - Server port number
   - Application settings (shop name)

2. **Loading Variables**: At application startup, `require('dotenv').config()` loads all variables from the `.env` file into `process.env`

3. **Accessing Variables**: Throughout the application, values are accessed using `process.env.VARIABLE_NAME` with fallback defaults:
   ```javascript
   const port = process.env.PORT || 8000
   host: process.env.DB_HOST || 'localhost'
   ```

### Benefits

- **Security**: Sensitive data (passwords, API keys) are kept out of source code
- **Flexibility**: Different configurations for development, testing, and production environments
- **Version Control**: The `.env` file should be added to `.gitignore` to prevent committing secrets
- **Easy Deployment**: Environment variables can be easily changed without modifying code

**Important**: Never commit the `.env` file to version control. Add it to your `.gitignore` file.

## Audit Implementation

The login audit feature provides a comprehensive tracking system for all login attempts, both successful and failed. This implementation enhances security by providing visibility into authentication activity.

### How It Works

1. **Database Table**: A `login_audit` table stores all login attempts with the following information:
   - Unique ID for each attempt
   - Username that was used
   - Timestamp of the attempt (automatically set to current time)
   - Status (success or failed)
   - Descriptive message explaining the outcome

2. **Automatic Logging**: The `/users/loggedin` route automatically records every login attempt:
   - **Successful logins**: When username exists and password matches
   - **Failed logins - Username not found**: When the username doesn't exist in the database
   - **Failed logins - Incorrect password**: When username exists but password is wrong

3. **Audit History Page**: The `/users/audit` route displays all login attempts in a user-friendly table:
   - Sorted by most recent first
   - Color-coded status (green for success, red for failed)
   - Shows date, time, username, status, and reason
   - Includes summary statistics of total attempts, successful logins, and failed attempts

This audit trail helps administrators monitor security, detect potential unauthorized access attempts, and troubleshoot login issues.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Templating**: EJS (Embedded JavaScript)
- **Database**: MySQL
- **Security**: bcrypt for password hashing
- **Frontend**: HTML5, CSS3

## Development

This project was created for the Dynamic Web Applications module at Goldsmiths College.

### Key Dependencies
- `express` - Web application framework
- `ejs` - Templating engine
- `mysql` - MySQL database driver
- `express-sanitizer` - Input sanitization
- `express-validator` - Form validation
- `express-session` - Session management
- `dotenv`- Environment variable management