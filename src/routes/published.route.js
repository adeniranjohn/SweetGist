const published = require('express').Router();

published.get('/', async (req, res, next) => {
    try{
        const { 
            title, 
            page=1,
            tags,
            limit=20
        } = req.query;

        let posts;

        if(title){
            posts = await Post.find({ title });
        } else if(author){
            posts = await Post.find({ author }).find({ state: "published"}).sort({ _id: -1 }).limit(limit*1).skip((page-1)*limit).exec();
        } else if(tag){
            posts = await Post.find({tags: {$in: [tag]}}).find({ state: "published" }).sort({ _id: -1 }).limit(limit*1).skip((page-1)*limit).exec();
        } else {
            posts = await Post.find({ state: "published"}).sort({ [sort]: -1 }).limit(limit*1).skip((page-1)*limit).exec();

        }




    }catch(error){
        next(error)
    }
})

