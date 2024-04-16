# React Blog

Welcome to React Blog, a full-stack blogging website built with React, Node.js, Express.js, and MongoDB. This application enables users to create an account, post, edit, and delete their blogs. Additionally, users can view other users' blog posts and filter posts by category. The project includes features such as user authentication, profile updates, and image uploading.

## Features

- **User Authentication:** Users can create an account and log in securely.
- **Create, Read, Update, Delete (CRUD) Operations:** Users can perform CRUD operations on their blog posts.
- **View Other User's Posts:** Users can view posts created by other users.
- **Filter Posts by Category:** Users can filter posts by category to find relevant content.
- **Profile Management:** Users can update their profiles, including uploading a profile picture.

## Technologies Used

- **Frontend:** React.js, Create React App
- **Backend:** Node.js, Express.js
- **Database:** MongoDB

## Getting Started

To get started with the React Blog project, follow these steps:

1. **Clone the Repository:**
   ```
   git clone https://github.com/your-username/react-blog.git
   ```

2. **Install Dependencies for Frontend:**
   ```
   cd React blog/frontend
   npm install
   ```

3. **Install Dependencies for Backend:**
   ```
   cd ../backend
   npm install
   ```

4. **Set Up Environment Variables:**
   Create a `.env` file in the `backend` directory and add the following variables:
   ```
   MONGO_URL=your_mongodb_url
   
   ```

5. **Run the Application:**
   - For the frontend:
     ```
     npm run start
     ```
   - For the backend:
     ```
     nodemon index.js
     ```

6. **Access the Application:**
   Once the application is running, you can access the frontend at `http://localhost:3000` and the backend at `http://localhost:5000` in your web browser.

## Folder Structure

```
react-blog/
│
├── frontend/               # Frontend React App
│   ├── public/             # Public assets
│   └── src/                # React components and styles
│
└── backend/                # Backend Node.js and Express App
    ├── images/             # User images
    ├── models/             # MongoDB models
    ├── routes/             # API routes
    

```

