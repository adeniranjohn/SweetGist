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
        const match = await user.comparePassword(password);
        token = await user.generateToken();
        if(!match) return done(null, false);
        return done(null, {user, token})
        

    }catch(error){
        return done(error)
    }
}))



passport.use(
  new JWTstrategy({
      secretOrKey: 'TheSweetGistSECRETKEY',
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
     function (payload, done){
      console.log(payload)
        return UserService.findUserById(payload._id)
        .then(user => done(null, user))
        .catch(err => { 
          console.log(err)
          done(err)
        });
    }
  )
);


module.exports = passport;