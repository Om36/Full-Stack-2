# Node.js JPA Equivalent with TypeORM

This project demonstrates database modeling and querying using TypeORM in Node.js, equivalent to JPA & Hibernate in Java.

## Setup

1. Install dependencies: `npm install`
2. Set up MySQL or PostgreSQL database.
3. Update database credentials in `src/config.ts`.
4. Run: `npm start`

## Features

- **Database Connectivity**: Configured for MySQL and PostgreSQL in `src/config.ts`.
- **Entities**: User, Role (Many-to-Many), Category, Product (One-to-Many).
- **Queries**: Custom queries for filtering, sorting, pagination, with SQL logging enabled.

## Generated SQL Analysis

TypeORM logs SQL queries to the console. Run the app to see the generated SQL for each operation.