const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserService = require('../services/user.service');


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


module.exports = passport;