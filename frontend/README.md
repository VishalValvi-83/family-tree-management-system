# FamilyRoots - Family Tree Management System

FamilyRoots is a full-stack web application that allows users to create, visualize, and manage their family trees. It provides a user-friendly interface to build and explore your family history.

## Features

- **User Authentication:** Secure user registration and login system.
- **Interactive Family Tree:** View your family tree in an interactive and easy-to-navigate format.
- **Add Family Members:** Easily add new members to your family tree with relevant details.
- **Update and Delete:** Modify or remove family members from your tree as needed.
- **Responsive Design:** The application is designed to work on various screen sizes.

## Technologies Used

- **Frontend:**
  - React.js
  - React Router
  - CSS
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (assumed, based on typical MERN stack)
  - JWT for authentication (assumed)

## API Endpoints

The backend provides the following RESTful API endpoints:

### User Routes

- `POST /api/users/signup`: Register a new user.
- `POST /api/users/login`: Log in an existing user.

### Family Routes

- `GET /api/family`: Get all family members.
- `POST /api/family`: Add a new family member.
- `GET /api/family/:_id`: Get a specific family member by ID.
- `PATCH /api/family/:_id`: Update a family member.
- `DELETE /api/family/:_id`: Delete a family member.
