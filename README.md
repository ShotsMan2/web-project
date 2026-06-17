# Full-Stack E-Commerce Mini Project

A comprehensive 10-step developmental project built to demonstrate core software engineering principles, ranging from algorithmic data manipulation to a fully functional Full-Stack CRUD application.

## 🚀 About The Project
This repository contains a step-by-step implementation of an e-commerce system. It starts with basic algorithmic challenges and progressively scales into a client-server architecture using **Vanilla JavaScript, TypeScript, Node.js, and Express.js**. 

The goal of this project is to showcase clean code practices, state management without frameworks, RESTful API design, and solid error handling.

## 📂 Project Structure & Milestones

The project is divided into 10 key milestones, organized by folders:

* **Step 1: Algorithm & Array Methods (`denem.ts`)** - Filtering, sorting, and mapping product data using TypeScript.
* **Step 2: Business Logic (`cart.js`)** - Pure functions for cart calculations (subtotal, tax, discounts, free shipping).
* **Step 3: Clean Code Utilities (`utils.js`)** - Reusable utility functions (currency formatting, slugification, regex validation).
* **Step 4: Component-Based UI (`component/`)** - A responsive product card component with conditional rendering.
* **Step 5: State Management (`list/`)** - A product listing page featuring real-time search, category filtering, and sorting based on local state.
* **Step 6: Form Validation (`validation/`)** - Client-side user registration form with strict regex validations and UX feedback.
* **Step 7 & 8: RESTful API & Middleware (`API/`)** - A Node.js/Express backend providing CRUD endpoints, protected by input validation middlewares.
* **Step 9: Full-Stack Integration (`full-stack/`)** - Connecting the frontend to the backend via Fetch API, handling Loading, Error, and Empty UI states.
* **Step 10: Admin Dashboard (`admin/`)** - A complete admin panel to manage the database (Create, Read, Update, Delete) with real-time UI updates and toast notifications.

## 🛠️ Technologies Used
* **Frontend:** HTML5, CSS3, Vanilla JavaScript, TypeScript
* **Backend:** Node.js, Express.js
* **Architecture:** Client-Server Separation, MVC-inspired route handling, REST API

## ⚙️ How to Run the Project

To run the full-stack environment locally, you need to start the backend server and open the frontend interface.

**1. Start the Backend Server**
```bash
# Navigate to the API directory
cd API

# Install dependencies (Express, CORS)
npm install

# Start the server
node server.js
