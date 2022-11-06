const Blog = require('../models/blog.model');


class BlogService {

    async getAllPublishedBlogs(page, limit){
        const blogs = await Blog.find({state: 'published'}).limit(limit * 1).skip((page -1) * limit);
        return ({success: true, pageblogs, page, total: blogs.length}); 
    }

    async getUserBlogs({user_id, state}){

        const blogs = await Blog.find({author: user_id, state: state});
        return blogs; 
    } 

    async getUserBlog({user_id, blog_id}){
        const blog = await Blog.find({author: user_id, blog_id: blog_id});
        return blog;
    }


    async getABlog(blog_id){
        const blog = await Blog.find({blog_id: blog_id});
        return blog;
    }

    async updatedBlog(blog_id){
        const data = req.body;
        const blog = await Blog.updateOne({...data}).where({blog_id: blog_id, author: user_id});
        res.json(blogs)
    }

    async publishBlog(blog_id){

    }

    async createBlog(aBlog){
        const blog = await Blog.create(aBlog);
        return blog;
    }

    async getPublishedBlogs(){

    }

    async getDrafts(user_id){
        const drafts = await Blog.find({author: user_id, state: 'draft'})
        return drafts;
    }

    async publishBlog(blog_id){
        const { _id } = req.user;
      const updatedBlog =   await Blog.update({state: 'published'}).where({_id, state: 'draft'});
        return updatedBlog;
    }

    async deleteBlog(blog_id){
        const { _id } = req.user;
        const deletedBlog = await Blog.delete({blog_id: blog_id}).where({author: _id});
        return deletedBlog;
    };

    

    
}

module.exports = new BlogService;