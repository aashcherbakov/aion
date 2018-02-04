const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const variables = require("./config/variables");
const passport = require("passport");

require("./models/user");
require("./services/passport");

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: variables.sessionDuration,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routing
require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT);
