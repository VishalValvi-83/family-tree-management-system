# FamilyRoots - Family Tree Management System

FamilyRoots is a full-stack web application that allows users to create, visualize, and manage their family trees. It provides a user-friendly interface to build and explore your family history.

## Features

*   **User Authentication:** Secure user registration and login system.
*   **Interactive Family Tree:** View your family tree in an interactive and easy-to-navigate format.
*   **Add Family Members:** Easily add new members to your family tree with relevant details.
*   **Update and Delete:** Modify or remove family members from your tree as needed.
*   **Responsive Design:** The application is designed to work on various screen sizes.

## Technologies Used

*   **Frontend:**
    *   React.js
    *   React Router
    *   CSS
*   **Backend:**
    *   Node.js
    *   Express.js
    *   MongoDB (assumed, based on typical MERN stack)
    *   JWT for authentication (assumed)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js and npm installed on your machine.
*   MongoDB installed and running (or a cloud-based MongoDB instance).

### Installation

1.  **Clone the repo:**
    ```sh
    git clone https://github.com/your_username/FamilyRoot.git
    ```
2.  **Backend Setup:**
    *   Navigate to the `server` directory:
        ```sh
        cd server
        ```
    *   Install NPM packages:
        ```sh
        npm install
        ```
    *   Create a `.env` file and add the following environment variables:
        ```
        PORT=5000
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret
        ```
    *   Start the backend server:
        ```sh
        npm start
        ```
3.  **Frontend Setup:**
    *   Navigate to the `frontend` directory:
        ```sh
        cd ../frontend
        ```
    *   Install NPM packages:
        ```sh
        npm install
        ```
    *   Start the frontend development server:
        ```sh
        npm start
        ```
    *   Open your browser and navigate to `http://localhost:3000`.

## API Endpoints

The backend provides the following RESTful API endpoints:

### User Routes

*   `POST /api/users/signup`: Register a new user.
*   `POST /api/users/login`: Log in an existing user.

### Family Routes

*   `GET /api/family`: Get all family members.
*   `POST /api/family`: Add a new family member.
*   `GET /api/family/:_id`: Get a specific family member by ID.
*   `PATCH /api/family/:_id`: Update a family member.
*   `DELETE /api/family/:_id`: Delete a family member.