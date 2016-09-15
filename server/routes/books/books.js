let router = require('express').Router();

// /api/books/
router.use(require('./_get.js'));
router.use(require('./_post.js'));

// /api/books/suggestion
router.use('/suggestion', require('./suggestion/_get.js'));

// /api/books/characters
router.use('/characters', require('./characters/_post.js'));

// /api/books/verbs
router.use('/verbs', require('./verbs/_post.js'));
router.use('/verbs', require('./verbs/_get'));

// /api/books/multi
router.use('/multi', require('./multi/_post'));

// /api/books/test
router.use('/test', require('./test/_get'));


// /api/books/block
router.use('/block', require('./block/_get'));
router.use('/block', require('./block/_post'));




module.exports = router;