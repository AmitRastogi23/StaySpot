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

```
WanderLust/
├── controllers/
│   ├── listings.js          # Listing CRUD operations
│   ├── reviews.js           # Review operations (create, delete)
│   └── users.js             # User authentication logic
├── init/
│   └── index.js             # Database seeding with sample listings
├── models/
│   ├── listing.js           # Listing schema (title, price, images, etc.)
│   ├── review.js            # Review schema (rating, comment, author)
│   └── user.js              # User schema (username, email, password)
├── public/
│   ├── css/                 # Stylesheets (Bootstrap + custom CSS)
│   └── js/                  # Client-side JavaScript files
├── routes/
│   ├── listing.js           # Listing routes (CRUD endpoints)
│   ├── review.js            # Review routes (POST, DELETE)
│   └── user.js              # Authentication routes (login, signup, logout)
├── utils/
│   ├── ExpressError.js      # Custom error class for Express
│   └── wrapAsync.js         # Async error handling wrapper
├── views/
│   ├── listings/
│   │   ├── index.ejs        # All listings (homepage)
│   │   ├── new.ejs          # Create new listing form
│   │   ├── show.ejs         # Single listing details
│   │   └── edit.ejs         # Edit listing form
│   ├── reviews/
│   │   └── review.ejs       # Review form and list
│   └── users/
│       ├── login.ejs        # Login page
│       └── signup.ejs       # Signup page
├── .gitignore               # Git ignored files (node_modules, .env, etc.)
├── app.js                   # Main application entry point
├── cloudConfig.js           # Cloudinary configuration
├── middleware.js            # Custom middleware (isLoggedIn, isAuthor, etc.)
├── package.json             # Dependencies and scripts
├── package-lock.json        # Dependency lockfile
└── schema.js                # Joi validation schemas
```

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

```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment Variables

Create a .env file in the root directory and add the following:

```bash
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
MONGO_URL=your_mongodb_connection_string
SECRET=your_session_secret
```

### Step 4: Seed the Database (Optional)

```bash
node init/index.js
```

### Step 5: Start the Application

```bash
node app.js
```

The application will be running at http://localhost:8080

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
