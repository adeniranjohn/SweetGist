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


user.get('/:user_id/blogs', async (req, res, next) => {
    try{
        const { user_id } = req.params;
        const { state } = req.query;
       const blogs = await BlogService.getUserBlogs({ user_id, state});
        res.json(blogs);

    }catch(error){
        next(error)
    }
})

user.post('/:user_id/blogs', async (req, res, next) => {
    try{
        const { user_id } = req.params;
    
        const { title, description, tags, body} = req.body;
       const blogs = await BlogService.createBlog({ 
        author: req.user._id,
        title,
        description,
        tags,
        body,
        reading_time: 0
        

    });
        res.json(blogs);

    }catch(error){
        next(error)
    }
})

user.get('/:user_id/blogs/:blog_id', async (req, res, next) => {
    try{
        const { blog_id } = req.params;
        const { _id } = req.user;
        const blog = await BlogService.getUserBlog({user_id: _id, blog_id});
        res.json(blog)

    }catch(error){
        next(error)
    }
})

user.patch('/:user_id/blogs/:blog_id', async (req, res, next) => {
    try{
        const { blog_id } = req.params;
        const { _id } = req.user;
        const blog = await BlogService.updateBlog({_id, blog_id});
        res.json(blog)
    }catch(error){
        next(error)
    }
})


user.delete('/:user_id/blogs/:blog_id', async (req, res, next) => {
    try{
        const { blog_id } = req.params;
        const blog = await BlogService.getUserBlog({blog_id});
        res.json(blog)
    }catch(error){
        next(error)
    }
})


module.exports = user;