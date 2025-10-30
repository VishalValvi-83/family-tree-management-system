# FAMILY-TREE-MANAGEMENT-SYSTEM

_Connect Generations, Preserve Legacy, Empower Families_

![GitHub top language](https://img.shields.io/github/languages/top/VishalValvi-83/family-tree-management-system)
![Languages count](https://img.shields.io/github/languages/count/VishalValvi-83/family-tree-management-system)

**Built with the tools and technologies:**

![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express)
![JSON](https://img.shields.io/badge/JSON-000000?style=for-the-badge&logo=json)
![Markdown](https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose)
![Dotenv](https://img.shields.io/badge/.ENV-ecd53f?style=for-the-badge&logo=dotenv)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript)
![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?style=for-the-badge&logo=nodemon)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios)

---

## Overview

**Family-Tree-Management-System** is an open-source platform that enables developers to create, manage, and visualize complex family histories with ease.  
It combines a robust backend architecture with an interactive frontend, providing a full-stack solution for family tree applications.

### Why family-tree-management-system?

This project simplifies the complexities of family data modeling and visualization, ensuring data consistency and security.  
The core features include:

- 🌿 **Data Modeling:** Defines core data structures for managing family members and relationships, supporting dynamic family hierarchies.  
- 🔒 **Secure Authentication:** Implements user registration and login with JWT-based security, safeguarding sensitive family data.  
- 🌐 **Interactive Visualization:** Provides a dynamic family tree interface for visualizing relationships and editing family structures in real-time.  
- ⚙️ **API & Routing:** Offers RESTful API endpoints for CRUD operations, facilitating seamless backend communication.  
- 🧙‍ **Modular Architecture:** Designed for scalability and easy integration, enabling developers to extend functionalities effortlessly.  

---

## API Endpoints

The backend provides the following RESTful API endpoints:

### User Routes

- `POST /user/signup`: Register a new user.
- `POST /user/login`: Log in an existing user.

### Family Routes

- `GET /family`: Get all family members.
- `POST /family`: Add a new family member.
- `GET /family/:_id`: Get a specific family member by ID.
- `PATCH /family/:_id`: Update a family member.
- `DELETE /family/:_id`: Delete a family member.
