var MoviesControllers = angular.module('movieApp.controllers', []);

/* Side Menu Controller */
MoviesControllers.controller('asideMenuController', function ($scope,   $location) {
      $scope.$on('$routeChangeSuccess', function() {
		  var array = $location.path().split("/");
		  var loc = array[array.length-1]=="0" ? "add" : array[1];
          $scope.menuActive = loc;
      });
  })
/* Movies List Controller */ 
MoviesControllers.controller('MoviesListController', ['$scope', 'dataFactory', function($scope, dataFactory) {
	$scope.pageTitle = "Movies List";
	$scope.status;
	$scope.movies = null;
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

/* Edit Movies Controller */
MoviesControllers.controller('MoviesEditController', ['$scope', '$routeParams', '$location', 'dataFactory',  function($scope, $routeParams,$location, dataFactory) {
	$scope.id = $routeParams.id;
	$scope.status = "";
	

	$scope.movie;
	$scope.previewMovieItem = null;
	
	if($scope.id=="0"){
		$scope.pageTitle = "Create New Movie";	
		$scope.movie = MovieTemplateHelper.getLocalCopy();
		$scope.previewMovieItem = MovieTemplateHelper.getUpdatedModel(angular.copy($scope.movie));
	}	
	else{
		$scope.pageTitle = "Update Movie";	
		dataFactory.getMovie($scope.id).success(function(data){			
			$scope.movie = data;
			$scope.previewMovieItem = MovieTemplateHelper.getUpdatedModel(angular.copy($scope.movie));
		})
		.error(function(error){				
			$scope.status = 'Unable to load movies data: '+error.errorMessage;
			alert($scope.status);
		});	
	}
	$scope.addMovie = function(movie){
		//console.log(movie);		
		dataFactory.insertMovie(movie)
			.success(function(data){
				$scope.pageTitle = "Update Movie";	
				$scope.status = "<h3>Movie Added Successfully!</h3>";				
				MovieTemplateHelper.updateMovie($scope.movie,data);								
				var previewMovieItem = MovieTemplateHelper.getUpdatedModel(angular.copy($scope.movie));				
				MovieTemplateHelper.updateMovie($scope.previewMovieItem,previewMovieItem);	
				MovieTemplateHelper.clearLocalCopy();
				$('.error-container').html($scope.status);
			})
			.error(function(error){				
				$scope.status = error.errorMessage;
				$scope.movie["id"] = "0";
				console.log(error.errorMessage);
				$('.error-container').html($scope.status);

			});		
	}	
	$scope.updateMovie = function(){
		//console.log(movie);		
		dataFactory.updateMovie($scope.movie)
			.success(function(data){
				MovieTemplateHelper.updateMovie($scope.movie,data);								
				var previewMovieItem = MovieTemplateHelper.getUpdatedModel(angular.copy($scope.movie));				
				MovieTemplateHelper.updateMovie($scope.previewMovieItem,previewMovieItem);								
				console.log("Movie Updated Successfully!");
			})
			.error(function(error){				
				$scope.status = error.errorMessage;
				$('.error-container').html($scope.status);
			});		
	} // updateMovie
	
	
	$scope.previewMovie = function(){
		if((typeof $scope.movie["id"] == 'undefined') || $scope.movie["id"]=="0"){
			MovieTemplateHelper.setLocalCopy($scope.movie);
		}
		$location.path('/edit/preview/'+$scope.movie["id"]);		
					
	}
	$scope.showMovieForm = function(){
		var movieId = $scope.movie["id"];
		$location.path('/edit/form/'+movieId);		

	}

}]);

