class BlogService {

    async getAllBlogs(){

    }


    async getABlog(blog_id){

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