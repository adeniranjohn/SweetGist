const express = require('express');
const app = express();
const PORT = process.env.PORT || 4567
const mongoose = require('mongoose');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.get('/', (req, res) => {
    console.log('This is the landing API')
})


/**
 * 
 * This is to capture error from any of the route
 */



 mongoose.connect( process.env.MONGO_URI ,{useNewUrlParser : true})
 .then(()=>{console.log("Connected to MongoDB Successfully")})
 .catch(()=>{console.log("An error occurred while connecting to MongoDB")})
 
 app.listen(process.env.PORT, () => {
     console.log('Listening on port, ', process.env.PORT)
 })


app.listen(PORT, () => {
    console.log(`This SweetGist Server is listening on port ${PORT}`)
})