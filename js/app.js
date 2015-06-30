var app = angular.module("myApp", [
	'ui.bootstrap',
	'ngRoute'
	]);

app.config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {
		$routeProvider
    //home page
    .when('/', {
    	templateUrl: 'pages/home.html'
    })

    .when('/about', {
    	templateUrl: 'pages/about.html'
    }).
    when('/contact', {
    	templateUrl: 'pages/contact.html'
    }).
    when('/view/:productId', {
        templateUrl: 'pages/detail.html',
        controller: 'ProductDetailCtrl'    
    }).
    otherwise({
    	redirectTo: '/'
    });
     // use the HTML5 History API
     // $locationProvider.html5Mode(true);

 }]);

//filter
app.filter('startFrom', function(){
	return function(data, start){
		return data.slice(start);
	}
});