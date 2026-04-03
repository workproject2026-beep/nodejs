# Final Project: Blog Application (Express, MongoDB, Auth & Media Upload)

## Overview

In this final project, you will build a full-featured Blog Application using:

- Express.js
- MongoDB
- Mongoose

This project simulates a real-world backend system with authentication, authorization, media uploads, and role-based access control.

---

## Project Requirements

You are required to build a Blog System that includes:

---

## Core Features

### 1. Authentication & Authorization

- Register & Login system
- Password hashing
- Token-based authentication (JWT)
- Protected routes

---

### 2. Users & Posts CRUD

#### Users:

- Create user
- Update user
- Delete user
- Get all users

#### Posts:

- Create post
- Update post
- Delete post
- Get all posts
  - Return ALL posts from:
    - Global posts
    - Group posts (if user has access to group)
    - Sorted by createdAt
- Get user posts

---

### 3. Image Upload (ImageKit)

Each post must:

- Have **one or more images**
- Upload images using ImageKit
- Store image URLs in database

---

### 4. Groups System (Like Facebook Groups)

#### Group Features:

- Create group
- Each group must have:

  - One or more admins
  - Members

#### Admin Permissions:

- Add users to group
- Remove users from group
- Manage permissions

#### User Permissions:

- If user has permission:

  - Can create post in group

- If not:

  - Can only view posts

---

### 5. Post Ownership Rules

- User can:

  - Create post
  - Update his own post
  - Delete his own post

- Users CANNOT:

  - Update others' posts
  - Delete others' posts

---

### 6. Super Admin Role

- Super admin can:

  - Perform ANY action in the system
  - Manage users, posts, groups

---

## Middleware Requirements

You must implement and use:

### 1. Authentication Middleware

- Protect routes
- Verify JWT

### 2. Authorization Middleware (`restrictTo`)

- Restrict routes based on roles:

  - user
  - admin
  - super-admin

---

### 3. File Upload Middleware

Use:

- Multer
- Custom middleware: `uploadOnImageKit`

## Error Handling

### 1. Global Error Middleware

- Catch all errors
- Send proper response

---

### 2. Custom Error Class

Create class:

```js
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
```

- Use it across the app
- Throw controlled errors

---

## Validation

- Validate all inputs (POST / PUT / PATCH)
- Use any library like:

  - Joi
  - or any alternative

---

## Database Design

### User Model

- username
- email
- password
- role (user, admin, super-admin)
- timestamps

---

### Post Model

- title
- content
- images (array)
- author
- group
- timestamps

---

### Group Model

- name
- admins (array of users)
- members (array of users)
- permissions
- timestamps

---

## API Requirements

### Auth Routes

- POST /auth/register
- POST /auth/login

---

### Users Routes

- CRUD operations

---

### Posts Routes

- CRUD operations
- Upload images

---

### Groups Routes

- Create group
- Add/remove users
- Manage permissions

---

## Business Logic Rules

- Only admins can manage group users
- Only allowed users can post in group
- Only post owner can edit/delete post
- Super admin overrides all rules

---

## Deployment Requirement (NEW - MANDATORY)

### You MUST deploy the project:

#### 1. GitHub Repository
#### 2. Vercel Deployment
---

## Bonus Features 🚀

- Add comments system
- Add likes system
- Pagination
- Search posts
- Rate limiting

---

## Expected Project Structure

```bash
/project
  /controllers
  /models
  /routes
  /middleware
  /utils
    AppError.js
  /config
  server.js
  app.js
```

---

## Expected Outcome

By the end of this project, you will have:

- Production-like backend system
- Authentication & Authorization system
- Media upload integration
- Role-based access control
- Clean architecture

---

## Notes

- Follow clean code principles
- Use MVC structure
- Handle all edge cases
- Test your APIs using Postman

---
