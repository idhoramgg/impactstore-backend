const passport = require('passport');
require('dotenv').config()
const Users = require('../models/users');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const FacebookStrategy = require('passport-facebook').Strategy;



module.exports = {
    strategies : () => {
        passport.use("jwt", new JwtStrategy(
            {
                jwtFromRequest: ExtractJwt.fromExtractors([
                    ExtractJwt.fromUrlQueryParameter('secret_token'),
                    ExtractJwt.fromHeader('secret_token'),
                    ExtractJwt.fromAuthHeaderAsBearerToken(),
                ]),
                secretOrKey:process.env.SECRET_KEY_TOKEN
            },
            async (jwt_payload, done) => {
                try {
                    const user = await Users.findOne({email: jwt_payload.email});

                    if(!user){
                        return done(err, false, {message : "User not found"})
                    } else {
                        return done(null, user)
                    }
                }
                catch(error){
                    console.log(error)
                    res.status(500).json({
                        message: "internal server error",
                    })
                }
            }
        )
    )
        passport.use("facebook", new FacebookStrategy(
            {
                clientID:process.env.CLIENT_ID,
                clientSecret:process.env.CLIENT_SECRET,
                callbackURL:process.env.CALLBACK_URL,
                profileFields: ['id', 'displayName', 'photos', 'email']
            },
            (accessToken, refreshToken, profile, callback) => {
                Users.findOrCreate({
                    providerId: profile.id,
                    provider: profile.provider,
                    fullname: profile.displayName,
                    email: profile._json.email
                }, (err, user) => {
                    return callback(err, user)
                })
            }
        )),
        passport.serializeUser(function(user, done) {
            done(null, user.id);
          });
          
          passport.deserializeUser(function(id, done) {
            User.findById(id, function(err, user) {
              done(err, user);
            });
          });
}
}
     