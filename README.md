# Alarasucan Website

This repository contains the source code for the official Alarasucan website, a dynamic and interactive web application built with Node.js, Express, and PostgreSQL.

---

## 🛠️ Tech Stack

| Category       | Technology / Tool                                     |
| :------------- | :---------------------------------------------------- |
| **Frontend** | HTML5, CSS3, JavaScript (ES6+)                        |
| **Backend** | Node.js, Express.js                                   |
| **Database** | PostgreSQL                                            |
| **Styling** | Custom CSS Animations, Google Fonts, Glassmorphism UI |
| **Deployment** | Render (or any Node.js host)                        |

---

## 🚀 Getting Started

To run this project on your local machine, follow these steps.

### Prerequisites

* Node.js (v14 or newer)
* npm (comes with Node.js)
* PostgreSQL installed and running.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/alarasucan/your-repo-name.git](https://github.com/alarasucan/your-repo-name.git)
    cd your-repo-name
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Database Setup:**
    * Create a PostgreSQL database for the project.
    * Run any necessary SQL scripts or migrations to set up your tables.

4.  **Create an environment file:**
    Create a file named `.env` in the root of the project. You will need to add your database connection string and a port number.
    ```
    # Example PostgreSQL connection string
    DATABASE_URL="postgresql://YOUR_USER:YOUR_PASSWORD@localhost:5432/YOUR_DATABASE_NAME"
    PORT=3000
    ```

5.  **Run the application:**
    ```bash
    npm start
    ```
    The server will start, and you can view the application at `http://localhost:3000`.

---

## 📂 Project Structure

```
/
├── public/
│   ├── assets/              # For images, icons, and other static assets
│   ├── css/
│   │   └── style.css        # Main stylesheet
│   └── js/
│       └── script.js        # Frontend JavaScript logic
├── views/
│   └── index.html           # Main HTML file
├── server.js                # The Express.js server application
├── database.js              # Database connection and query logic (example name)
├── .gitignore               # Files to be ignored by Git
├── package.json             # Project dependencies and scripts
└── README.md                # You are here!
```

---

## ⚙️ Environment Variables

The application uses environment variables for configuration. This keeps sensitive data secure and allows for easy adjustments between development and production environments.

* `PORT`: The port on which the server will run. (Default: 3000)
* `DATABASE_URL`: The full connection string for your PostgreSQL database.
* `NODE_ENV`: The application environment. Set to `production` for deployed versions.

**For Production (e.g., on Render):** These variables must be set in the "Environment" section of your hosting service's dashboard. **Do not** commit your `.env` file to version control.
