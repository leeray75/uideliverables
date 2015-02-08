angular.module('moviesApp', [
  'ngRoute',
  'ngStorage',
  'moviesApp.services',
  'movieApp.controllers',
  'movieApp.directives'
]).run(function($rootScope,$route){
	$rootScope.message = '';
	$rootScope.updateView = function(){
		$route.reload();	
	}
	UI.setLogInOutCallback($rootScope.updateView);	
}).config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/list', {
    templateUrl: '/www/content/partials/movies-rating/movies-list-v2.html',
    controller: 'MoviesListController'
  }).
  when('/edit/preview/:id', {
    templateUrl: '/www/content/partials/movies-rating/movies-preview.html',
    controller: 'MoviesAddEditController'
  }).
  when('/edit/form/:id', {
    templateUrl: '/www/content/partials/movies-rating/movies-add-edit.html',
    controller: 'MoviesAddEditController'
  }).
  otherwise({
    redirectTo: '/list'
  }); 
}]);

