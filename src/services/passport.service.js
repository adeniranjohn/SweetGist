const passport = require('passport');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const UserService = require('../services/user.service');
const User = require('../models/user.model');

passport.use('signin', new LocalStrategy({
    usernameField: 'email', 
    passwordField: 'password'
}, async(email, password, done) => {
    try{
        const user = await UserService.findUserByEmail(email);
        if(!user) return done(null, false);
        const match = user.comparePassword(password);
        if(!match) return done(null, false);
        return done(null, user)
        

    }catch(error){
        done(error)
    }
}))



passport.use(
  new JWTstrategy({
      secretOrKey:'SweetGistSecretKey',
      jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('jwt')
    },
     function (payload, done){
        return User.findOneById(payload._id)
        .then(user => done(null, user))
        .catch(err => done(err));
    }
  )
);


module.exports = passport;