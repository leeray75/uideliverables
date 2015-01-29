angular.module('moviesApp', [
  'ngRoute',
  /*'ngAnimate',*/
  'moviesApp.services',
  'MoviesControllers',
  'MoviesDirectives'
]).config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/list', {
    templateUrl: '/www/content/partials/movies-rating/movies-list-v2.html',
    controller: 'MoviesListController'
  }).
  when('/add', {
    templateUrl: '/www/content/partials/movies-rating/movies-add-edit.html',
    controller: 'MoviesAddController'
  }).
  when('/edit/:id', {
    templateUrl: '/www/content/partials/movies-rating/movies-add-edit.html',
    controller: 'MoviesEditController'
  }).
  otherwise({
    redirectTo: '/list'
  });
}])

