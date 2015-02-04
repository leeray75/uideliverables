angular.module('moviesApp', [
  'ngRoute',
  'moviesApp.services',
  'movieApp.controllers',
  'movieApp.directives'
]).config(['$routeProvider', function($routeProvider) {
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
}])

