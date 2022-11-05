const user = require('express').Router();
const UserService = require('../services/user.service');
const BlogService = require('../services/blog.service');



user.get('/', async (req, res) => {
    try{
        const users = await UserService.getUsers();
        res.json(users)
    }catch(error){
        next(error)
    }
    res.send('This is the default user route')
})

user.get('/:user_id', async (req, res, next) => {
    try{
        const { user_id } = req.params;
        const user = await UserService.getUser({_id: user_id})
        res.json(user)

    }catch(error){
        next(error)
    }
});


user.get('/:user_id/blogs?state=state', async (req, res, next) => {
    try{
        const { user_id } = req.params;
        const { state } = req.query.state;
       // const blogs = await BlogService.getBlogs({ user_id, state});
        res.json(state);

    }catch(error){
        next(error)
    }
})




module.exports = user;