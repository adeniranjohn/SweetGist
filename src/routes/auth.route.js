const auth = require('express').Router();
const passport = require('passport');
const UserService = require('../services/user.service');
const jwt = require('jsonwebtoken');


auth.post('/signin', async (req, res, next) => {
    try{
        passport.authenticate('signin', async (err, user, info) => {
              try {
                if (err || !user) next(error)
                req.login( user, { session: false },  async (error) => {
                    if (error) return next(error);
                    const payload = { _id: user._id, email: user.email };
                    const token = jwt.sign({ user: payload }, process.env.SECRET_KEY);
                    return res.json({ user, token });
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