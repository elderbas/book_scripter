let router = require('express').Router();
router.use(require('./_get.js'));
router.use(require('./_post.js'));




module.exports = router;