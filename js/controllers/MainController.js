app.controller('ProductListCtrl', function($http, ProductService) {
  this.today = new Date();
  var self = this;
  this.pageSize = 5;
  this.currentPage = 1;

  function makeAProduct(i, cat){
    return {
      id: i,
      category: cat,
      name: 'Some title',
      description: 'some description',
      image: {
        small: "http://www.launchsh.com/product/pics/20130411/201304111365673268812.jpg",
        large: "http://www.launchsh.com/product/pics/20130411/201304111365673268812.jpg"
      }
    };
  };

  this.products = [];
  this.categories = [];

  //mock data
  this.populateProducts = function(){
    for(var i=0; i< 40; i++) {
      cat = this.categories[i%3];
      this.products.push(makeAProduct(i, cat));
    }
  };

   ProductService.getAllCats().success(function(data){
      self.categories = data;
    })
  .error(function(data, status){
    console.log("error status: " + status);
  })

  ProductService.getAllProducts().success(function(data){
      //console.log(data.data);
      //must use self inside callback to refer to original controller
      //***ipmportant***
      self.products = data;
    })
  .error(function(data, status){
    console.log("error status: " + status);
  })

  this.populateProductsByHttp = function(){
    var url = 'https://dl.dropboxusercontent.com/u/2122820/hosted_json/hitechproducts.json';
    $http.get(url)
    .success(function(data){
      //console.log(data.data);
      //must use self inside callback to refer to original controller
      //***ipmportant***
      self.products = data;
      console.log("http:" + self.products);
    })
    .error(function(data, status){
      console.log("error status: " + status);
    })
  };
  //this.populateProductsByHttp();
  

  //set products to selected cat
  // this.setCategoy = function(cat){
  //   this.populateProducts();

  //   this.products = this.products.filter(filterCat);

  //   function filterCat(value) {
  //     return value.category == cat;
  //   }
  // };

  var includedCat = [];
  this.includeCategoy = function(cat){
    console.log("include " + cat);
    var i = $.inArray(cat, includedCat); //return index or -1
    if ( i !== -1) {
      includedCat.splice(i, 1);
    } else {
      includedCat.push(cat);
    }
    console.log("include array " +  includedCat);
  };

  this.catFilter = function(product){
   if (includedCat.length > 0) {
    if ($.inArray(product.category, includedCat) < 0)
      return;  //return nothing
  }

  return product;
};

this.viewDetail = function(id){

};
});

/*************************
About Controller
**************************/
app.controller('AboutCtrl', [function() {
  this.text = "Hi Tech Cambodia is an automobile distributor"


}]);


/*************************
Prduct Detail Controller
**************************/
app.controller('ProductDetailCtrl', function($scope, $routeParams, ProductService) {
  $scope.msg = "Product Detail";
  console.log($routeParams.productId);
  ProductService.getAllProducts().success(function(data){
    $scope.products = data;
    console.log($scope.products);
    if($routeParams.productId) {
      $scope.productId = $routeParams.productId;
      $scope.getProduct($scope.productId);
    }
  })
  .error(function(data, status){
    console.log("error status: " + status);
  })
  

  $scope.getProduct = function(id){
    $scope.selectedProduct = $.grep($scope.products,
      function(e){
        return e.id == id;
      });
    $scope.selectedProduct = $scope.selectedProduct[0];
  };

});