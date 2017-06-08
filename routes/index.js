var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/home', function (req, res) {
    T.display('home',function(html){
        res.end(html);
    });
});

/* GET home page. */
router.get('/', function (req, res) {
    T.display('start',function(html){
        res.end(html);
    });
});

module.exports = {
    paths: [
        '/'
    ],
    router: router
};