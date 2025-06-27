Alarasucan 
This repository contains the source code for the official Alarasucan website, a dynamic and interactive web application built with Node.js and Express. 

//Tech Stack
Category	Technology / Tool
Frontend	HTML5, CSS3, JavaScript (ES6+)
Backend	Node.js, Express.js
Styling	Custom CSS Animations, Google Fonts, Glassmorphism UI
Data Storage	Local JSON File (data/entries.json)
Deployment	Render (or any Node.js host)

//Export to Sheets
Getting Started
To run this project on your local machine, follow these steps.

//Prerequisites
Node.js (v14 or newer)
npm (comes with Node.js)

//Installation & Setup
Clone the repository:

Bash

git clone https://github.com/alarasucan/your-repo-name.git
cd your-repo-name
Install dependencies:

Bash

npm install
Create an environment file:
Create a file named .env in the root of the project and add the following variable:

PORT=3000
Run the application:

Bash

npm start
The server will start, and you can view the application at http://localhost:3000.




//Project Structure
/
├── data/
│   └── entries.json         # Stores user-submitted diary entries
├── public/
│   ├── assets/              # For images, icons, and other static assets
│   ├── css/
│   │   └── style.css        # Main stylesheet
│   └── js/
│       └── script.js        # Frontend JavaScript logic
│   └── index.html           # Main HTML file
├── server.js                # The Express.js server application
├── .gitignore               # Files to be ignored by Git
├── package.json             # Project dependencies and scripts
└── README.md                # You are here!



//Environment Variables
The application uses environment variables for configuration. This keeps sensitive data secure and allows for easy adjustments between development and production environments.

PORT: The port on which the server will run. (Default: 3000)
NODE_ENV: The application environment. Set to production for deployed versions.
For Production (e.g., Render): These variables should be set in the "Environment" section of your hosting service's dashboard. Do not commit your .env file to version control.