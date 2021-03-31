const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.scores = require("./Score.js")(mongoose);

module.exports = db;