var mongoose = require('mongoose');
var productSchema = new mongoose.Schema({
  name:String,
  price:{type: Number, default: 0},
  url:{type: String, default: "https://www.kpfinder.com/assets/default_product.jpg"},
  orders:{type: Number, default: 0}
});
productSchema.methods.order = function(cb) {
  this.orders += 1;
  this.save(cb);
};
mongoose.model('product', productSchema);
