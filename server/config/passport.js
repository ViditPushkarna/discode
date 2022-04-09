import Users from "../model/User.js";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
// var JwtStrategy = require("passport-jwt").Strategy,
//   ExtractJwt = require("passport-jwt").ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "Random Alina";
passport.use(
  new Strategy(opts, function (jwt_payload, done) {
    console.log(jwt_payload);
    if (err) {
      return done(err, false);
    }
    return done(null, true);
    // Users.findOne({ email: jwt_payload.user_email }, function (err, user) {
    //   if (err) {
    //     return done(err, false);
    //   }
    //   if (user) {
    //     return done(null, user);
    //   } else {
    //     return done(null, false);
    //     // or you could create a new account
    //   }
    // });
  })
);
