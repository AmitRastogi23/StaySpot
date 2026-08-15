# 🌍 WanderLust - Travel Listing Platform

Welcome to **WanderLust**, a full-stack web application inspired by Airbnb. It allows users to discover, share, and review travel accommodations or exciting places to stay. This project is built with a robust MVC architecture and integrates cloud services for a seamless user experience.

## 🚀 Live Demo

https://wanderlust-a9t1.onrender.com/

## ✨ Key Features

- **Listing Management:** Users can **Create, Read, Update, and Delete (CRUD)** travel listings.
- **Rich Content:** Each listing includes a title, description, location, price, and multiple images.
- **Image Uploads:** Seamless image upload and storage powered by **Cloudinary**.
- **Reviews & Ratings:** Logged-in users can leave reviews and ratings for listings.
- **User Authentication:** Secure signup and login functionality to manage personal listings and reviews.
- **Interactive UI:** A clean and responsive user interface built with **EJS** templating.
- **Data Validation:** Server-side validation using **Joi** to ensure data integrity and security.
- **Secure Middleware:** Custom middleware for authentication and authorization.

## 🏗️ Technology Stack

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB

### Frontend

- **EJS** - Templating engine for dynamic content
- **Bootstrap/CSS** - For styling and responsiveness
- **JavaScript** - For client-side interactivity

### Cloud & Tools

- **Cloudinary** - Image hosting and management
- **Joi** - Data validation
- **dotenv** - Environment variable management

## 📁 Project Structure

WanderLust/
├── controllers/ # Business logic for routes
│ ├── listings.js # Listing CRUD operations
│ ├── reviews.js # Review operations
│ └── users.js # Authentication logic
├── init/ # Database initialization/seeding scripts
│ └── index.js # Seeds database with sample listings
├── models/ # Database schemas (Mongoose)
│ ├── listing.js
│ ├── review.js
│ └── user.js
├── public/ # Static assets (CSS, JS, images)
│ ├── css/
│ └── js/
├── routes/ # Express route definitions
│ ├── listing.js
│ ├── review.js
│ └── user.js
├── utils/ # Helper functions and error handling
│ ├── ExpressError.js
│ └── wrapAsync.js
├── views/ # EJS templates
│ ├── listings/ # Listing-related pages
│ ├── reviews/ # Review-related partials
│ └── users/ # Authentication pages
├── .gitignore # Files/folders ignored by Git
├── app.js # Main application entry point
├── cloudConfig.js # Cloudinary configuration
├── middleware.js # Custom middleware functions
├── package.json # Project dependencies and scripts
├── package-lock.json # Lockfile for dependencies
└── schema.js # Joi validation schemas

## 🛠️ Installation & Setup

Follow these steps to run the project locally:

### Prerequisites

- Node.js (v16 or later)
- MongoDB (Local or Atlas account)
- Cloudinary account (for image uploads)

### Step 1: Clone the Repository

```bash
git clone https://github.com/AmitRastogi23/WanderLust.git
cd WanderLust
npm install
```

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
MONGO_URL=your_mongodb_connection_string
SECRET=your_session_secret

node init/index.js

node app.js
