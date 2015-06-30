
app.factory('ProductService', function($http) {
	var productUrl = 'http://codepen.io/rattanak22/pen/eNyXeL.js';
	var catUrl = 'http://codepen.io/rattanak22/pen/RPxdxr.js';

	var ProductService = {
		getAllProducts : function(){
			return $http.get(productUrl);
		},

		getAllCats : function(){
			return $http.get(catUrl);
		}

	}

	return ProductService;
});