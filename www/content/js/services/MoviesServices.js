//var MoviesFactory = angular.module('moviesApp',[]);

angular.module('moviesApp.services',[]).factory('dataFactory', ['$http', function($http) {

    var urlBase = '/www/index.php/api/movies';
    var dataFactory = {};

    dataFactory.getMovies = function () {
        return $http.get(urlBase);
    };

    dataFactory.getMovie = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    dataFactory.insertMovie = function (movie) {
        return $http.post(urlBase, movie);
    };

    dataFactory.updateMovie = function (movie) {
        return $http.put(urlBase + '/' + movie.id, movie)
    };

    dataFactory.deleteMovie = function (id) {
        return $http.delete(urlBase + '/' + id);
    };
    return dataFactory;
}]);