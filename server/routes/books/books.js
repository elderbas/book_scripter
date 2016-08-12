let router = require('express').Router();

// /api/books/
router.use(require('./_get.js'));
router.use(require('./_post.js'));

// /api/books/suggestion
router.use('/suggestion', require('./suggestion/_get.js'));

// /api/books/characters
router.use('/characters', require('./characters/_post.js'));




module.exports = router;