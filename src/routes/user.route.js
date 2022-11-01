const user = require('express').Router();


user.get('/', (req, res) => {
    res.send('This is the default user route')
})




module.exports = user;