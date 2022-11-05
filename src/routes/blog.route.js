const blog = require('express').Router();

blog.get('/', (req, res, next) => {
    res.send('This is the blogs route')
})


blog.get('/:blog_id', (req, res, next) => {
    res.send('This is the blogs route')
})


blog.patch('/:blog_id', (req, res, next) => {
    res.send('This is to update the blog')
})




module.exports = blog;