
---

# VRV Assignment: Role-Based Access Control (RBAC)

## Overview
This project implements a complete  Role-Based Access Control (RBAC)  system with a  frontend  and  backend . The application allows users to register, log in, and access resources based on their roles (e.g., Admin, Moderator, or User). The solution follows best practices for  authentication ,  authorization , and secure role-based access.

---

## Features
- Backend:
  - Secure user authentication using JWT.
  - Role-based authorization for accessing protected resources.
  - API routes for user management and resource access.

-  Frontend :
  - User-friendly interface for registration, login, and logout.
  - Role-specific views and functionality.
  - Integration with the backend API.

---

##  Technologies Used 
-  Frontend : React.js, Tailwind CSS
-  Backend : Node.js, Express.js
-  Database : MongoDB
-  Authentication : JSON Web Tokens (JWT), bcrypt for password hashing

---

##  Installation and Setup 
###  Prerequisites 
- Node.js installed on your system.
- MongoDB instance (local or cloud, e.g., MongoDB Atlas).
- Postman (optional, for API testing).

---

###  Steps to Run the Project 
####  1. Clone the repository 
```bash
git clone https://github.com/ASHAD-JAMAL/VRV_ASSIGNMENT.git
```
Navigate to the project directory:
```bash
cd VRV_ASSIGNMENT
```

---

####  2. Backend Setup 
1. Navigate to the backend directory:
   ```bash
   cd ../api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the backend directory.
   - Add the following variables:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     ```
4. Start the backend server:
   ```bash
   npm run start
   ```

---

####  3. Frontend Setup 
1. Navigate to the frontend directory:
   ```bash
   cd ../client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```

---

###  Project Structure 
```
VRV_ASSIGNMENT/
│
├── api/
│   ├── models/
│   │   ├── UserModel.js        # User schema with role and password
│   │
│   ├── routes/
│   │   ├── MainRoutes.js        # Authentication routes
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js # Middleware for verifying JWT
│   │
│   └── index.js          # Server initialization
│
├── client/
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Pages for login, registration, etc.
│   │   ├── DashBoard/      # Dashboard for all Roles.
│   │   └── App.jsx         # Main application entry
│   │
│   └── public/            # Static assets
│
└── README.md              # Documentation
```

---
##  API Endpoints 
Here’s the information reformatted according to your request:
---

###  Authentication 
| Method | Endpoint          | Description                       | Access       |
|--------|-------------------|-----------------------------------|--------------|
| POST   | `/register`       | Register a new user               | Public       |
| POST   | `/login`          | Log in and get a JWT token        | Public       |
| GET    | `/user-details`   | Get details of the logged-in user | User         |
| PUT    | `/update-profile` | Update user profile information   | User         |

---

###  Role-Based Access 
| Method | Endpoint        | Description                        | Access       |
|--------|-----------------|------------------------------------|--------------|
| GET    | `/user-list`    | Get a list of all users            | Admin        |

---

###  Frontend Routes 
| Route                      | Description                              | Access         |
|-------------------------   |------------------------------------------|----------------|
| `/`                       | Register page                           | Public         |
| `/login`                  | Login page                              | Public         |
| `/dashboard/*`            | Protected dashboard layout              | Authenticated  |
| `/dashboard/`             | User dashboard                          | Authenticated  |
| `/dashboard/user-profile` | View user profile                         | Authenticated  |
| `/dashboard/edit-profile` | Edit user profile                     | Authenticated  |
| `/dashboard/all-users`    | View list of all users (Admin only)    | Admin          |

---

##  How RBAC is Implemented 
1.  Backend :
   - User roles (e.g., Admin, Moderator, User) are stored in the database.
   - Middleware functions validate the user's role and allow/deny access to routes.

2.  Frontend :
   - After login, the user's role is stored in local storage or context.
   - Role-based views and options are displayed on the frontend.

---

##  Testing 
1.  Backend :
   - Use Postman to test the API endpoints.
   - Include the JWT token in the `Authorization` header for protected routes:
     ```
     Authorization: Bearer <your_jwt_token>
     ```

2.  Frontend :
   - Test role-based views by logging in with different user roles.

---

##  Future Enhancements 
- Implement email verification during user registration.
- Add multi-factor authentication (MFA).
- Improve frontend UI/UX for better user experience.
- Add dynamic role and permission management from the admin panel.

---

##  Author 
-  Name : Ashad Jamal  
-  GitHub : [ASHAD-JAMAL](https://github.com/ASHAD-JAMAL)

---
