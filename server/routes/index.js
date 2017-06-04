(function() {

  'use strict';
  var express = require('express');
  var router = express.Router();
  var mongojs = require('mongojs');
  var db = mongojs('mongodb://paperfly:paperfly@ds143231.mlab.com:43231/paperfly', ['paymentDetails']);

  /* GET home page. */
  router.get('/', function(req, res) {
    res.render('index');
  });

  router.get('/api/orders', function(req, res) {
    db.paymentDetails.find().sort({ _id: -1 },function(err, data) {
      res.json(data);
    });
  });

  router.post('/api/orders', function(req, res) {
    db.paymentDetails.insert(req.body, function(err, data) {
      var respo = {
    "resultcode":1,
    "msg":"success"
  };
        res.json(respo);
    });

  });
  router.put('/api/orders', function(req, res) {
    db.paymentDetails.update({'orderNo':req.body.orderNo},{$set:{'orderStatus':'delivered'}},function(err,data){
      var respo = {
    "resultcode":1,
    "msg":"success"
  };
        res.json(respo);
    });

  });
  module.exports = router;

}());
