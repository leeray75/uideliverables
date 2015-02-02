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
		delete movie.id;
        return $http.post(urlBase, movie);
    };

    dataFactory.updateMovie = function (movie) {
        return $http.put(urlBase + '/' + movie.id, movie)
    };

    dataFactory.deleteMovie = function (id) {
		var deleteApi = urlBase + '/' + id;
		return $http({
        	method: 'DELETE', 
        	url: deleteApi
    	});
		/* The following throws an error in IE8. Because 'delete' is a reserved word */
        //return $http.delete(urlBase + '/' + id);
    };
	
	dataFactory.submitVote = function(movie, rating){	
		/* Removes keys that were created in the model that aren't part of the original model */			
		for(key in movie){
			if(!DefaultMovieModel.hasOwnProperty(key)){
				delete movie[key];	
			}
		}

		movie['imdbRating'] = (parseInt(movie['imdbRating'])+rating).toString();
		movie['imdbVotes'] = (parseInt(movie['imdbVotes'])+1).toString();
		return dataFactory.updateMovie(movie);			
			
		
		/*
		var AjaxData = { "movieId": movieId, "rating": rating};
		return $.ajax({
			url: MoviesSettings.RateMovieUri,
			type: "POST",
			dataType: 'json',
			data: AjaxData	
		});
		*/
	};
    return dataFactory;
}]);