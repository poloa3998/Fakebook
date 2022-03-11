const User = require("mongoose").model("users");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");

const cookieExtractor = (req) => {
  let jwt = null;
  if (req && req.cookies) {
    jwt = req.cookies["jwt"];
  }
  return jwt;
};
const options = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET,
};

const strategy = new JWTstrategy(options, (payload, done) => {
  const { expiration } = payload;
  if (Date.now() > expiration) {
    done("Unauthorized", false);
  }
  User.findOne({ _id: payload.id })
    .then((user) => {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => done(err, null));
});
const facebookStrategy = new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `${process.env.URL}/api/users/auth/facebook/fakebook`,
    profileFields: [
      "id",
      "email",
      "first_name",
      "last_name",
      "photos",
      "friends",
    ],
  },
  function (accessToken, refreshToken, profile, cb) {
    const picture = `https://graph.facebook.com/${profile.id}/picture?width=400&height=400&access_token=${accessToken}`;

    User.findOne({ facebookId: profile.id }, (error, userFound) => {
      if (userFound) {
        return cb(error, userFound);
      } else {
        User.create(
          {
            facebookId: profile.id,
            profilePic: picture,
            firstName: profile._json.first_name,
            lastName: profile._json.last_name,
            email: profile._json.email,
          },
          (error, user) => {
            return cb(error, user);
          }
        );
      }
    });
  }
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
module.exports = (passport) => {
  passport.use(strategy);
  passport.use(facebookStrategy);
};
