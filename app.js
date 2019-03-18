const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/database");

//connect to database
mongoose.connect(config.database, { useNewUrlParser: true });
mongoose.connection.on("connected", () => {
  console.log("connected to database");
});

mongoose.connection.on("error", err => {
  console.log("Databse Error" + err);
});

const app = express();

//routers
const users = require("./routes/users");
const events = require("./routes/events");
const participants = require("./routes/participants");
const colleges = require("./routes/colleges");

const port = process.env.PORT || 3000;

// CORS middleware
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, "public")));

// body parser middleware
app.use(bodyParser.json());

// Pasport middleware
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

app.use("/users", users);
app.use("/events", events);
app.use("/participants", participants);
app.use("/colleges", colleges);
app.use("/images", express.static(path.join("images/")));

// Index route
app.get("/", (req, res) => {
  res.send("Invalid Endpoint");
});

//redirect all other routes to index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

//start server
app.listen(port, () => {
  console.log("server started on port", port);
});
