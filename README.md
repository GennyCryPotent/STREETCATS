# STREETCATS 
Streetcats is a full-stack university project developed for the Web Technologies course at Federico II University. STREETCATS is an interactive social platform that allows users to geolocate, share, and view stray cat sightings on an interactive map. The application offers a complete user experience, including a secure authentication and registration system, and the ability to upload posts with photos, fostering an active community dedicated to the welfare of felines.

## Technologies Used
The project was developed using the following technologies:

Frontend: Angular 15+, Leaflet, Bootstrap

Backend: Express.js, SQLITE, Sequelize, Multer

Testing: Playwright

## Installation and Startup Guide
To run the application locally, follow the steps below. Make sure you have Node.js and npm installed.

### File .env
In the backend directory, rename the .env.dummy file to .env and edit it with the correct values. You can change the **PORT** and **SESSION_SECRET** values and save the file, but you can also change the remaining values if you prefer.

### Installation
```
## Clone the repository
git clone [https://github.com/GennyCryPotent/STREETCATS.git](https://github.com/GennyCryPotent/STREETCATS.git)

## Navigate to the "backend" directory, install dependencies, and start the server
cd backend
npm install
npm start

## In a new terminal, navigate to the "frontend" directory, install dependencies, and start the app
cd streetcats-frontend
npm install
npm start
```
**ℹ️ Note: If you encounter an "ERESOLVE could not resolve" error during installation, use npm install --legacy-peer-deps.**


## E2E Testing
The project includes complete end-to-end tests, written with Playwright, to ensure that critical functionalities work correctly.

To run the tests, make sure both the backend and frontend are already running, then execute the following command in your terminal:
```
cd streetcats-frontend
npx playwright test --ui
```

The --ui flag will open the Playwright graphical interface to visualize the tests in real-time.

**ℹ️ Note: The tests only work if you uncomment line 46 in "index.js"**

## License
© 2024 Genny Cry Potent. Licensed under the MIT license.
