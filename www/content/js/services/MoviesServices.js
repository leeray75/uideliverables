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
        return $http.delete(urlBase + '/' + id);
    };
	
	dataFactory.submitVote = function(movie, rating){	
		//console.log("Inside Service");				
		delete movie.rating;
		delete movie.allowDeleteEdit;
		delete movie.ActorsLabel;
		delete movie.DirectorLabel;
		delete movie.DisplayReleaseDate;
		delete movie.GenreLabel;
		delete movie.WriterLabel;
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