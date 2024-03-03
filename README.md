
# Bookstore Management System using MERN Stack

This project is a comprehensive Bookstore Management System built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It features user authentication, book management, shopping cart functionality, and more.

## Features

- **User Authentication**: Secure signup and login functionality with JWT.
- **Book Management**: Admins can add, update, delete, and search for books.
- **Shopping Cart**: Users can add books to their cart, update quantities, and remove them.
- **Book Reviews**: Users can leave reviews and ratings on books.

## Technologies

- **MongoDB**: NoSQL database to store user and book data.
- **Express.js & Node.js**: Backend framework and environment for building the API.
- **React.js**: Frontend library for building the user interface.
- **JWT**: For handling user authentication.

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository
```bash
git clone https://github.com/neeraj-pratap-singh/Bookstore-Management-System-using-MERN-Stack.git
```

2. Install backend dependencies
```bash
cd Bookstore-Management-System-using-MERN-Stack
npm install
```

3. Install frontend dependencies
```bash
cd client
npm install
```

4. Create a `.env` file in the root directory and add your MongoDB URI and JWT secret key
```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

5. Run the backend server
```bash
npm start
```

6. Run the React frontend
```bash
cd client
npm start
```

## API Documentation

Refer to the Postman collection included for detailed API endpoints and usage.

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
