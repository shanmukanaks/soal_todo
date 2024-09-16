# soal_todo

This is a full-stack To-Do List application with user authentication, built using React for the frontend and Node.js with Express for the backend. It allows users to register, log in, and manage their personal to-do items.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Application Structure](#application-structure)
6. [Functionality](#functionality)
7. [Assumptions and Limitations](#assumptions-and-limitations)

## Features

- User registration and login
- Create, read, update, and delete to-do items
- Mark to-do items as completed
- Responsive design using Tailwind CSS
- Prevention of empty to-do items

## Technologies Used

- Frontend:
  - React.js
  - Axios for API calls
  - Tailwind CSS for styling
- Backend:
  - Node.js
  - Express.js
- Database:
  - In-memory storage (JavaScript arrays)

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/shanmukanaks/soal_todo.git
   cd todo-list-app
   ```

2. Install backend dependencies:

   ```
   cd server
   npm install
   ```

3. Install frontend dependencies:

   ```
   cd ../client
   npm install
   ```

4. Set up Tailwind CSS (if not already configured):

   ```
   npx tailwindcss init -p
   ```

5. Update the `tailwind.config.js` file in the frontend directory:

   ```javascript
   module.exports = {
     content: ["./src/**/*.{js,jsx,ts,tsx}"],
     theme: {
       extend: {},
     },
     plugins: [],
   };
   ```

6. Add Tailwind directives to your `src/index.css`:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

## Usage

1. Start the backend server:

   ```
   cd server
   node server.js
   ```

   The server will start running on `http://localhost:5000`.

2. In a new terminal, start the frontend development server:

   ```
   cd client
   npm start
   ```

   The React app will start running on `http://localhost:3000`.

3. Open your browser and navigate to `http://localhost:3000` to use the application.

## Application Structure

- `server/`
  - `server.js`: Express server setup and API routes
- `client/`
  - `src/`
    - `App.js`: Main React component with all the application logic
    - `index.js`: Entry point of the React application
    - `index.css`: Global styles and Tailwind imports

## Functionality

1. **User Authentication**:

   - Users can register with a username and password
   - Registered users can log in
   - Authentication is required for all to-do operations

2. **To-Do Management**:

   - Create new to-do items
   - View a list of all to-do items
   - Mark to-do items as completed or uncompleted
   - Delete to-do items

3. **User Interface**:
   - Responsive design that works on various screen sizes
   - Clean and intuitive interface using Tailwind CSS
   - Disabled "Add Todo" button when the input is empty

## Assumptions and Limitations

1. **In-Memory Storage**: The application uses in-memory storage (JavaScript arrays) for both user data and to-do items. This means all data is lost when the server restarts.

2. **Basic Authentication**: The current implementation uses a simple username/password authentication. It's not secure for a production environment and doesn't include features like password hashing.

3. **Single-User Mode**: While the app supports multiple user registrations, it's designed for single-user use at a time in the frontend.

4. **No Data Persistence**: There's no database integration, so data doesn't persist between server restarts.

5. **Limited Error Handling**: The current implementation has basic error handling. A production app would need more robust error handling and user feedback.

6. **No Input Sanitization**: The app doesn't sanitize inputs, which could be a security risk in a real-world scenario.

7. **Frontend-Heavy Logic**: Most of the application logic is handled in the frontend. In a production app, more logic would typically be moved to the backend.

8. **No Environment Configuration**: The app uses hardcoded URLs and lacks environment-specific configurations (an .env file for security, everything is hard coded to make running the app easier).

9. **Basic CORS Setup**: The CORS setup is very permissive and would need to be tightened for a production environment.

10. **No Automated Tests**: The current implementation doesn't include any automated tests.

## 2.0

To make this to do app production-ready, some things that would need to be done, are integrating a persistent database (e.g., MongoDB) instead of in-memory storage, enhancing security with password hashing, JWT authentication, and proper environment variable management. Robust error handling, and automated testing (unit, integration, and end-to-end) should be implemented. The app needs containerization (Docker), optimized for deployment on cloud platforms (AWS) with proper scaling.
