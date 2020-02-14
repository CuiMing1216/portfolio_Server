var express = require('express');
var router = express.Router();
const sgMail = require('@sendgrid/mail');

var Email = require('./../model/email');
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


router.get('/', function(req, res, next){
  Email.find({}, function(err, data){
    if (err)
      return res.status(500).json({message: 'Get Data Error', error:err});

      res.status(200).json({data});
  });
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

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const new_mail = {
      to : 'cuiming1216@gmail.com',
      from : req.body.email,
      subject : req.body.name,
      text : req.body.message,
      html : '<strong>and easy to do anywhere, even with Node.js</strong>'
    };
    sgMail.send(new_mail)
          .then(()=>{},console.error);

    res.status(200).json({message:'Email sent successfully!'});
  })
});

module.exports = router;
