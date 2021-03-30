const express = require("express");
const cors = require("cors");
const MongoClient = require('mongodb').MongoClient
const app = express();
const mongoose = require("mongoose");
const db = require("./models");
const Score = require("./models/model");

require('dotenv').config();

var corsOptions = {
    origin: "http://localhost:8080"
};

app.use(cors(corsOptions));
app.use(express.json());


db.mongoose.connect(process.env.CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then((res) => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });


// const mongoClient = () => MongoClient.connect(connectionString, { useUnifiedTopology: true })
//     .then(client => {
//         console.log('Connected to Database');
//         const db = client.db('brainblast');
//         const leaderboard = db.collection('leaderboard');
//     })
//     .catch(console.log(console.error()));


app.get("/", (req, res) => {
    res.send("<h1>Welcome to the Brainblast Backend</h1>");
});

app.get("/scores", (req, res) => {
    Score.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(400).send({
                message: err.message
            })
        });
});

app.post('/addscore', (req, res) => {

    const score = new Score({
        username: req.body.username,
        total_score: req.body.total_score ? req.body.total_score : 0,
        minigame_scores: req.body.minigame_scores ? {
            minigame_1: req.body.minigame_scores.minigame_1 ? req.body.minigame_scores.minigame_1 : 0,
            minigame_2: req.body.minigame_scores.minigame_2 ? req.body.minigame_scores.minigame_2 : 0,
            minigame_3: req.body.minigame_scores.minigame_3 ? req.body.minigame_scores.minigame_3 : 0,
            minigame_4: req.body.minigame_scores.minigame_4 ? req.body.minigame_scores.minigame_4 : 0,
            minigame_5: req.body.minigame_scores.minigame_5 ? req.body.minigame_scores.minigame_5 : 0
        } : null
    });


    score.save()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(400).send({
                message: err.message
            })
        });
});

app.post('/updatescore', (req, res) => {
    leaderboard.findOneAndUpdate(req.params.user)
        .then(res => {
            console.log(res)
        })
        .catch(err => console.error(err))
});


// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
