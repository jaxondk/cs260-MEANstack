var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = mongoose.model('product'); //links up with models/products.js file

//your top level app.js file takes care of connecting to the db for you b/c you added a few lines there
//otherwise would need to do it here.

router.get('/products', function(req,res,next) {
  console.log("GET /products");
  Product.find(function(err, products) {
    if(err) return console.error(err);
    console.log(products);
    res.json(products);
  });
});

router.post('/products',function(req,res,next) {
  console.log("POST /products");
  var newproduct = new Product(req.body); //instantiates a Product object
  newproduct.save((err,post) => {
    if(err) return console.error(err);
    console.log(post);
    res.sendStatus(200);
  });
});

//delete all
router.delete('/products', (req,res,next) => {
  console.log("DELETE /products");
  Product.remove({}, (err) => {//Since we give an empty {} as first param, all objects in db will match and get removed
    if(err) return console.error(err);
    res.sendStatus(200);
  });
});

//delete one
router.delete('/products/:product', function(req, res) {
  console.log("in Delete");
  req.product.remove();
  res.sendStatus(200);
});

router.put('/products/:product/order',(req,res,next) => {
  req.product.order((err,product) => {
    res.json(product);
  });
});

router.param('product', function(req, res, next, id) {
  var query = Product.findById(id);
  query.exec(function (err, product){
    if (err) { return next(err); }
    if (!product) { return next(new Error("can't find product")); }
    req.product = product;
    return next();
  });
});

module.exports = router;
