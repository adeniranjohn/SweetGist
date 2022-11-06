const express = require('express');
require('./src/services/passport.service')
const app = express();
const PORT = process.env.PORT || 4567
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const blogRouter = require('./src/routes/blog.route');
const userRouter = require('./src/routes/user.route');
const authRouter = require('./src/routes/auth.route');
require('dotenv').config();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie : {
        maxAge: 60 * 60 //1 hour
    }
}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res, next) => {
    try{
        res.send('This is the landing API');
    }catch(error){
        next(error)
    }
   
})

app.use('/auth', authRouter);
app.use('/users',passport.authenticate('jwt', { session: false }), userRouter);
app.use('/blogs', blogRouter);

/**
 * 
 * This is to capture error from any of the route
 */
app.use((error, req, res, next) => {

    res.status(500).json({
        error: error.message
    })
    next();
})


 mongoose.connect( process.env.MONGO_URI ,{useNewUrlParser : true})
 .then(()=>{console.log("Connected to MongoDB Successfully")})
 .catch((err)=>{
    console.log(err.message)
    console.log("An error occurred while connecting to MongoDB")
})
 



app.listen(PORT, () => {
    console.log(`This SweetGist Server is listening on port ${PORT}`)
})