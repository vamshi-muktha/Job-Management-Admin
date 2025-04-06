require('dotenv').config();

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1); // if deployed behind proxy
}


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const connectDB = require("./init/database");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');



// // Models & Routes
const User = require("./models/user");
const homeroute = require("./routes/home-routes");
const userroute = require("./routes/user-routes");
const jobsroute = require("./routes/jobs-routes");

// Connect to DB first
connectDB()
  .then(() => {
    console.log("MongoDB connected");

    // Set up session store after DB is connected
    app.use(session({
      secret: process.env.SESSION_SECRET, // ⚠️ Move this to .env in production
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI, // ← replace this
        collectionName: 'sessions',
      }),
      cookie: {
        secure: process.env.NODE_ENV === 'production', // HTTPS only in prod
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      },
    }));

    // Passport setup
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(User.createStrategy());
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    // Middleware
    app.use((req, res, next) => {
      res.locals.user = req.user;
      next();
    });
    // app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));
    app.set('view engine', 'ejs');
    app.set("views", path.join(__dirname, "/views"));
    app.engine("ejs", ejsMate);

    // Routes
    app.use("/", homeroute);
    app.use("/", userroute);
    app.use("/", jobsroute);

    // Start server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
