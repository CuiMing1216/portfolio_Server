var express = require('express');
var router = express.Router();
var Email = require('./../model/email');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/', function(req, res, next) {
  console.log("##post", req.body.name);
  var newEmail = new Email({
    name: req.body.name,
    email: req.body.email,
    msg: req.body.message
  });
  newEmail.save(function(err){
    if(err){
      return res.status(500).json({message:'Send Email Error', error:err});
    }

    res.status(200).json({message:'Email sent successfully!'});
  })
  res.render('index', { title: req.body.email });
});

module.exports = router;
