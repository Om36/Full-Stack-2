# Spring Boot + React Integration Demo

This demo shows how to integrate a React front end with a Spring Boot back end using Axios/Fetch and JWT-based protected API calls.

## Backend

- Folder: `backend`
- Run from the backend folder:
  - `mvn spring-boot:run`
- Public endpoint: `http://localhost:8080/api/public/products`
- Registration endpoint: `http://localhost:8080/api/public/register`
- Login endpoint: `http://localhost:8080/api/login`
- Protected endpoint: `http://localhost:8080/api/protected/orders`

## Frontend

- Folder: `frontend`
- Install dependencies:
  - `npm install`
- Run development server:
  - `npm start`
- React app runs on `http://localhost:3000`

## Features

- Public GET request from React to Spring Boot and response displayed in a table
- Registration form submission uses `fetch()` and displays backend success/error status
- JWT login flow stores the token in `localStorage`
- Protected API call attaches `Authorization: Bearer <token>` header
- Unauthorized responses clear the token and prompt the user to log in again
