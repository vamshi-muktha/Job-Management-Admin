const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

// Show signup form
router.get("/signup", (req, res) => {
  res.render("pages/signup");
});

router.post('/signup', async (req, res, next) => {
  const { username, name, email, password } = req.body;
  try {
    const newUser = new User({ username, name, email });
    const registeredUser = await User.register(newUser, password);

    // Log the user in after registering
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      res.redirect('/');
    });

  } catch (err) {
    console.error('Signup error:', err);
    res.redirect('/signup');
  }
});

  


// Show login form
router.get("/login", (req, res) => {
    res.render("pages/login");
  });
  
  // Handle login logic
  router.post("/login",
    passport.authenticate("local", {
      successRedirect: "/",      // redirect on success
      failureRedirect: "/login", // redirect back on failure
      failureFlash: false        // set to true if using connect-flash
    })
  );

  router.post("/logout", (req, res, next) => {
    req.logout(err => {
      if (err) return next(err);
      res.redirect("/");
    });
  });
  
  

module.exports = router;
