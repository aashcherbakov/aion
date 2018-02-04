const passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email", "https://www.googleapis.com/auth/calendar"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout(); // why calling logout on request? Sebastian: monkey patch
    res.redirect("/");
  });

  // Passport adds User object to req object. You can perform database operations on it.
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
