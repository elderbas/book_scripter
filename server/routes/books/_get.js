let router = require('express').Router();

router.get('/', getBookNames);

// upload
function getBookNames (req, res) {
  return res.send('Game of Thrones');
}

module.exports = router;