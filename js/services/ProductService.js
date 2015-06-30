
app.factory('ProductService', function($http) {
	var productUrl = 'https://dl.dropboxusercontent.com/u/2122820/hosted_json/hitechproducts.json';
	var catUrl = 'https://dl.dropboxusercontent.com/u/2122820/hosted_json/hitechCategories.json';

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