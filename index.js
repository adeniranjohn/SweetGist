const express = require('express');
const app = express();
const PORT = process.env.PORT || 4567
const mongoose = require('mongoose');
const blogRouter = require('./src/routes/blog.route');
const userRouter = require('./src/routes/user.route');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.get('/', (req, res, next) => {
    try{
        res.send('This is the landing API');
    }catch(error){
        next(error)
    }
   
})


app.use('/users', userRouter);
app.use('/blogs', blogRouter)

/**
 * 
 * This is to capture error from any of the route
 */
app.use((err, req, res) => {
    res.json({
        error: err
    })
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