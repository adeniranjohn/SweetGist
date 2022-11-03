const user = require('express').Router();
const UserService = require('../services/user.service');



user.get('/', async (req, res) => {
    try{
        const users = await UserService.getUsers();
        res.json(users)
    }catch(error){
        next(error)
    }
    res.send('This is the default user route')
})




module.exports = user;