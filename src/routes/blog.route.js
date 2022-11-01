const blog = require('express').Router();

blog.get('/', (req, res) => {
    res.send('This is the blog route')
})



module.exports = blog;