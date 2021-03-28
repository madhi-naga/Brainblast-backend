const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:6000"
};

app.use(cors(corsOptions));

// simple route
app.get("/", (req, res) => {
  res.send("<h1>Welcome to the Brainblast Backend.</h1>");
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});