angular.module('app', [])
.controller('AppCtrl', [
  '$scope','$http',
  function($scope,$http){
    $scope.cart = [];
    $scope.products = [];
    $scope.getAll = function() {
      return $http.get('/products').success(function(data){
        angular.copy(data, $scope.products); //copy products from DB to $scope.products
      });
    };
    $scope.getAll();
    $scope.create = function(product) {
      console.log("In create with product: "+product.name+" for $"+product.price+" w/ url: "+product.url);
      return $http.post('/products', product).success(function(data){}); //not sure what's supposed to go in that f(x)
    };
    $scope.order = function(product) {
      return $http.put('/products/' + product._id + '/order')
        .success(function(data){
          console.log("order worked");
          product.orders += 1;
        });
    };
    $scope.delete = function(product) {
      $http.delete('/products/' + product._id )
        .success(function(data){
          console.log("delete worked");
          $scope.getAll();
        });
    };
    $scope.addProduct = function() {
      if($scope.newprodname === "" || $scope.newprodname === undefined) { return; }
      console.log("In addProduct with "+$scope.newprodname);
      $scope.create({
        name: $scope.newprodname,
        price: $scope.newprodprice,
        url: $scope.newprodurl
      });
      $scope.newprodname = '';
      $scope.newprodprice = '';
      $scope.newprodurl = '';
      $scope.getAll();
    };
    $scope.incrementOrders = function(product) {
        $scope.order(product);
    }
    $scope.delete = function(product) {
      $http.delete('/products/' + product._id )
        .success(function(data){
          console.log("delete worked");
          $scope.getAll();
        });
    };

    $scope.submitOrder = function() {
      console.log("Submitting order");
      $scope.cart = [];
      for (var i in $scope.products) {
        if ($scope.products[i].checked) {
          $scope.incrementOrders($scope.products[i]);
          $scope.cart.push($scope.products[i]);
        }
      }
    }

}]);
