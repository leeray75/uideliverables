angular.module('moviesApp.services', []).factory('dataFactory', ['$http', function($http) {

    var urlBase = '/www/index.php/api/movies';
    var dataFactory = {};

    dataFactory.getMovies = function() {
        return $http.get(urlBase);
    };

    dataFactory.getMovie = function(id) {
        return $http.get(urlBase + '/' + id);
    };

    dataFactory.insertMovie = function(movie) {
        /* Remove the Movie's ID key, otherwise after the API Call, the response will come back with this ID instead of the newly created ID */
        delete movie.id;
        return $http.post(urlBase, movie);
    };

    dataFactory.updateMovie = function(movie) {
        return $http.put(urlBase + '/' + movie.id, movie)
    };

    dataFactory.deleteMovie = function(id) {
        var deleteApi = urlBase + '/' + id;
        return $http({
            method: 'DELETE',
            url: deleteApi
        });
        /* The following throws an error in IE8. Because 'delete' is a reserved word */
        //return $http.delete(urlBase + '/' + id);
    };

    dataFactory.submitVote = function(vote) {
        return $http.put('/www/index.php/api/vote' + '/' + vote["movie_id"], vote);
    };
    return dataFactory;
}]);