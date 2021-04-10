const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const db = require("./models");
const Score = require("./models/Score");

require('dotenv').config();

var corsOptions = {
    origin: process.env.PORT || "http://localhost:8080"
};

app.use(cors(corsOptions));
app.use(express.json());

db.mongoose.connect(process.env.CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });


const calcTotalScore = (gamescores) => {
    let sorted = gamescores.slice().sort(function (a, b) { return b - a })
    let totalScore = 0;

    for (var i = 0; i < 5; i++) {
        let miniScore = sorted[i] * (1 - 0.2 * i)
        totalScore += miniScore;
    }
    let round = Math.round(totalScore * 10) / 10;
    return round.toFixed(1);
}

app.get("/", (req, res) => {
    res.send("<h1>Welcome to the Brainblast Backend</h1>");
});

// GET: no params to pass in
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

// GET: no params to pass in
app.get("/scores/top", (req, res) => {
    Score.find().sort({ total_score: 'desc' }).limit(10)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(400).send({
                message: err.message
            })
        });
});

// GET: minigame num to pass in  route eg. ..scores/top/minigame_1
app.get("/scores/top/:num", (req, res) => {
    var query = {};
    query['minigame_scores.minigame_' + req.params.num] = 'desc';

    Score.find().sort(query).limit(10)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(400).send({
                message: err.message
            })
        });
});

// GET: no params to pass in
app.get("/scores/recent", (req, res) => {
    Score.find().sort({ updatedAt: 'desc' }).limit(10)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(400).send({
                message: err.message
            })
        });
});

// GET, Params: username
// eg. /score?username=johndoe123
app.get("/score", (req, res) => {
    const username = req.query.username;

    Score.findOne({ username })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(400).send({
                message: err.message
            })
        });
});

/* POST, No params, but need to pass in body
 username is required, rest are not when making the request.
 the other variables (scores) will be autofilled in with 0s.
*/
app.post('/score/new', (req, res) => {

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

/* POST, No params, but need to pass in body
 username is only required, rest are not when making the request.
 the other variables (minigame scores) will be updated depending on if
 that variable is passed in the request body.
 total_score will be weight calculated automatically, no need to add it in the body.
*/
app.post('/score/update', (req, res) => {
    const username = req.body.username;

    Score.findOne({ username })
        .then(data => {
            console.log(typeof data.minigame_scores);
            return data.minigame_scores;
        }).then(scoredata => {
            updatedata = {
                minigame_1: req.body.minigame_scores.minigame_1 ? req.body.minigame_scores.minigame_1 : scoredata.minigame_1,
                minigame_2: req.body.minigame_scores.minigame_2 ? req.body.minigame_scores.minigame_2 : scoredata.minigame_2,
                minigame_3: req.body.minigame_scores.minigame_3 ? req.body.minigame_scores.minigame_3 : scoredata.minigame_3,
                minigame_4: req.body.minigame_scores.minigame_4 ? req.body.minigame_scores.minigame_4 : scoredata.minigame_4,
                minigame_5: req.body.minigame_scores.minigame_5 ? req.body.minigame_scores.minigame_5 : scoredata.minigame_5
            }
            scores = Object.values(updatedata);
            return calcTotalScore(scores);
        }).then(total => {
            req.body.total_score = total;
            return Score.findOneAndUpdate({ username }, req.body, { new: true })
        }).then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(400).send({
                message: err.message
            })
        });
});

// POST, Params: username
app.post('/score/delete', (req, res) => {
    const username = req.query.username;

    Score.findOneAndDelete({ username })
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(400).send({
                message: err.message
            })
        });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
