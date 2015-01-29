var MoviesControllers = angular.module('MoviesControllers', []);

/* Side Menu Controller */
MoviesControllers.controller('asideMenuController', function ($scope,   $location) {
      $scope.$on('$routeChangeSuccess', function() {
          $scope.menuActive = $location.path().split("/")[1];
      });
  })
/* Movies List Controller */ 
MoviesControllers.controller('MoviesListController', ['$scope', 'dataFactory', function($scope, dataFactory) {
	$scope.pageTitle = "Movies List";
	$scope.status;
	$scope.movies;
	$scope.moviesSearchFilter = function (movie) {
        var re = new RegExp($scope.titleFilter, 'i');
        return !$scope.titleFilter || re.test(movie.title) || re.test(movie.plot);
    };
	$scope.deleteMovie = function(movie){
		//console.log(movie);
		if(confirm("Delete Movie: "+movie.title+"?")){		
			dataFactory.deleteMovie(movie.id)
				.success(function(data){				
					//$scope.movie = data;
					
					alert("Movie Deleted Successfully!");
					getMovies();
				})
				.error(function(error){				
					$scope.status = error.errorMessage;
					alert($scope.status);
				});	
		}
	}
	function getMovies(){
		dataFactory.getMovies()
			.success(function(data){
				//console.clear();
				//console.log(data);
				for (var obj in data){
					var movie=data[obj];
					movie.allowDeleteEdit = ( (movie["user_id"]==user.id) || user.isAdmin);	
					movie = MovieTemplateHelper.getUpdatedModel(movie);
			
				}				
				$scope.movies = data;
			})
			.error(function(error){
				$scope.status = 'Unable to load movies data: '+error.errorMessage;
				alert($scope.status);
			});
	}
	getMovies();
	/*
	$scope.addMovie = function(movie){
		alert ($scope.movie.title);	
	}
	*/

}]);

/* Add Movies Controller */

MoviesControllers.controller('MoviesAddController', ['$scope', 'dataFactory', function($scope, dataFactory) {
	$scope.pageTitle = "Create New Movie";
	$scope.status;
	$scope.movie = 
		{ 
			rated: "PG",
			imdbRating: "0",
			imdbVotes: "0"
		};
	$scope.previewMovieItem;
	//alert("INSIDE CONTROLLER");	
	
	$scope.addMovie = function(movie){
		//console.log(movie);		
		dataFactory.insertMovie(movie)
			.success(function(data){				
				$scope.movie = data;
				alert("Movie Added Successfully!");
			})
			.error(function(error){				
				$scope.status = 'Unable to load movies data: '+error.errorMessage;
				alert($scope.status);
			});		
	}
	
	$scope.previewMovie = function(movie){
		$scope.previewMovieItem = MovieTemplateHelper.getUpdatedModel(angular.copy(movie));
		$('#Add-Edit-Movie').hide();
		$('#Movie-Preview-Container').show();
	}
	$scope.donePreview = function(){
		$('#Movie-Preview-Container').hide();
		$('#Add-Edit-Movie').show();		
		$scope.previewMovieItem = null;
	}

	

}]);

/* Edit Movies Controller */
MoviesControllers.controller('MoviesEditController', ['$scope', '$routeParams', 'dataFactory', function($scope, $routeParams, dataFactory) {
	$scope.id = $routeParams.id;
	$scope.status;
	$scope.pageTitle = "Update Movie";
	$scope.movie;
	//alert("INSIDE CONTROLLER");	
	dataFactory.getMovie($scope.id).success(function(data){
		$scope.movie = data;
	})
	.error(function(error){				
		$scope.status = 'Unable to load movies data: '+error.errorMessage;
		alert($scope.status);
	});	
	
	$scope.updateMovie = function(movie){
		console.log(movie);		
		dataFactory.updateMovie(movie)
			.success(function(data){
				$scope.movie = data;
				alert("Movie Updated Successfully!");
				$scope.previewMovie(data);
			})
			.error(function(error){				
				$scope.status = error.errorMessage;
				alert($scope.status);
			});		
	} // updateMovie
	
	
	$scope.previewMovie = function(movie){
		$scope.previewMovieItem = MovieTemplateHelper.getUpdatedModel(angular.copy(movie));
		$('#Add-Edit-Movie').hide();
		$('#Movie-Preview-Container').show();
	}
	$scope.donePreview = function(){
		$('#Movie-Preview-Container').hide();
		$('#Add-Edit-Movie').show();		
		$scope.previewMovieItem = null;
	}

}]);


var MovieTemplateHelper =
{
	getUpdatedModel: function(movie){
		movie.poster = this.getPosterImageSrc(movie.poster);					
		movie.GenreLabel = this.getGenreLabel(movie.genre);
		movie.DisplayReleaseDate = this.getReleaseDateDisplay(movie.released)
		movie.DirectorLabel = this.getDirectorsLabel(movie.director);
		movie.WriterLabel = this.getWritersLabel(movie.writers);
		movie.ActorsLabel =this.getActorsLabel(movie.actors);
		movie.imdbRating = this.getImdbRating(movie.imdbRating, movie.imdbVotes);	
		return movie;		
	},
	getReleaseDateDisplay: function(Released)
	{
		var dateArray = Released.split("-");
		var returnVal = "";
		if(dateArray.length==3){
			returnVal = dateArray[1] + "-" + dateArray[2] + "-" + dateArray[0];	
		}
		return returnVal;
	},
	getGenreLabel: function(Genre)
	{
		var genresArray = Genre.split(",");
		return genresArray.length>1 ? "Genres" : "Genre";		
	},
	getDirectorsLabel: function(Director)
	{
		var directorsArray = Director.split(",");
		return directorsArray.length>1 ? "Directors" : "Director";		
	},
	getWritersLabel: function(Writer)
	{
		var writersArray = Writer.split(",");
		return writersArray.length>1 ? "Writers" : "Writer";		
	},
	getActorsLabel: function(Actors)
	{
		var actorsArray = Actors.split(",");
		return actorsArray.length>1 ? "Stars" : "Star";
	},
	getRuntimeMinutes: function(Runtime)
	{
		RuntimeMinutes = 0;
		var RuntimeArray = Runtime.split(" ");	
		if(RuntimeArray.length==4)
		{
			RuntimeMinutes = parseInt(RuntimeArray[0])*60 + parseInt(RuntimeArray[2]);
		}
		else if(RuntimeArray[1] == "h")
		{	
			RuntimeMinutes = parseInt(RuntimeArray[0])*60	
		}
		else
		{
			RuntimeMinutes = parseInt(RuntimeArray[0]);
		}	
		return RuntimeMinutes;	
	},
	getPosterImageSrc: function(Poster)
	{
		return Poster.replace('http://ia.media-imdb.com/images/',MoviesSettings.PosterImageUri);	
	},
	getImdbRating: function(ratings, votes){
		var rating = ratings/votes;		
		var roundedRating = (votes>0) ? Math.round(rating*10)/10 : 0;
		return roundedRating.toFixed(1);	
	}
	
}