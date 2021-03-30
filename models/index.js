const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.scores = require("./model.js")(mongoose);

module.exports = db;