const auth = require('express').Router();
const passport = require('passport');
const UserService = require('../services/user.service');
const jwt = require('jsonwebtoken');


auth.post('/signin', async (req, res, next) => {
    try{
        passport.authenticate('signin', async (err, user, info) => {
              try {
                if (err || !user) {
                  const error = new Error('Invalid Email or Password');
                  next(error)
                }
                req.login( user, { session: false },  async (error) => {
               
                    if (error) return next(error);
                    return res.json({ ...user });
                  }
                );
              } catch (error) {
                return next(error);
              }
            }
          )(req, res, next);
    }catch(error){
        next(error)
    }
    
})

auth.post('/signup', async (req, res, next) => {
    try{
        console.log(req.body)
        const user = await UserService.createUser(req.body);
        res.send(user)

    }catch(error){
        next(error);
    }
   
})




module.exports = auth;