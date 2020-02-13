var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    console.log("##post request", req.query.name, req.query.email);
    res.render('result_page',{title:'get result', method:"get"});
});


router.post('/', function(req, res, next){
    console.log("##post request", req.body.name, req.body.email);
    res.render('result_page',{title:'post result', method:"post"});
});
module.exports = router;