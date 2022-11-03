const blog = require('express').Router();

blog.get('/', (req, res) => {
    res.send('This is the blogs route')
})


blog.get('/:blog_id', (req, res) => {
    res.send('This is the blogs route')
})


module.exports = blog;