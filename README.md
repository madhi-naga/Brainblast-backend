# Brainblast Backend API

This is the REST API used for the leaderboard system of the [Brainblast](https://github.com/madhi-naga/Brainblast) minigame app. It utilizes Node.js & Express.js, and is integrated with MongoDB using the Mongoose library. The backend is currently hosted on Heroku servers. 

## Installation
This app can be used as a boilerplate for a starter MongoDB/Express app since it supports CRUD operations with MongoDB and can be scaled with more models using Mongoose. Once cloned, you can setup the app with the following:

Installing Dependencies: 

`npm install`

Creating the dotenv file: 

` echo "CONNECTION=<yourmongodbconnectionstring>" > .env `

Running the app:

`node app.js` 
or `npm run dev` to run in Development mode


