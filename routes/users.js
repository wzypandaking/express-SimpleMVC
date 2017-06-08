var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.end('respond with a resource');
});

/* GET users listing. */
router.get('/def', function(req, res) {
  res.send('aaa with a resource');
});

module.exports = {
  paths :  ['/users', '/my'],
  router : router
};