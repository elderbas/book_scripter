let router = require('express').Router();
console.log('inside books router', router);
router.use(require('./_get.js'));
router.use(require('./_post.js'));




module.exports = router;