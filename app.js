const express = require("express");
const cors = require("cors");
const MongoClient = require('mongodb').MongoClient
const app = express();

require('dotenv').config();
const connectionString = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.ftlbl.mongodb.net/leaderboard?retryWrites=true&w=majority`;

var corsOptions = {
    origin: "http://localhost:8080"
};

MongoClient.connect(connectionString, {useUnifiedTopology: true}, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
})

app.use(cors(corsOptions));

// simple route
app.get("/", (req, res) => {
    res.send("<h1>Welcome to the Brainblast Backend</h1>");
});

app.get("/leaderboardtotal", (req, res) => {
    res.send("<h1>Welcome to the Brainblast Backend</h1>");
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});