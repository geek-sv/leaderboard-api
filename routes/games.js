var express = require('express');
var router = express.Router();

/* GET games  listing. */
router.get('/', function(req, res, next) {
  res.render('games', { title:'Games'});
});

module.exports = router;
