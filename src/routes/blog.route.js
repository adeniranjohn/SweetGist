const blog = require('express').Router();
const BlogService = require('../services/blog.service');


blog.get('/', async (req, res, next) => {
    try{ 
        const blogs = await BlogService.getPublishedBlogs();
        res.json(blogs);
    }catch(error){
        next(error)
    }

})


blog.get('/:blog_id', async (req, res, next) => {
    const { blog_id } = req.params;
    const blog = await BlogService.getABlog({blog_id });
    res.json(blog);
})






module.exports = blog;