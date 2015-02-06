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
	$scope.statusCount=0;
	$scope.status = {};
	$scope.movies = null;
	$scope.moviesSearchFilter = function (movie) {
        var re = new RegExp($scope.titleFilter, 'i');
        return !$scope.titleFilter || re.test(movie.title) || re.test(movie.plot);
    };
	$scope.deleteMovie = function(movie){
		var message = "Delete Movie: "+movie.title+"?";
		var status = {
			type:"CONFIRM",
			message: message,
			title: "Movie Delete Confirmation",
			okCallback: function(){
				dataFactory.deleteMovie(movie["id"])
				.success(function(data){					
					var message = movie.title+" Deleted Successfully!";
					var status = {
						type:"SUCCESS",
						message: message,
						title: "Movie Deleted",
						okCallback: function(){ }											
					};
					angular.copy(status,$scope.status);
					$scope.statusCount++;
					getMovies();
				}) // end success
				.error(function(error){				
					message = error.errorMessage;
					var status = {
						type:"ERROR",
						message: message,
						title: "ERROR"	
					};	
					angular.copy(status,$scope.status);
					$scope.statusCount++;				
				});	// end error
			} //end okCallback
		};// end status
		angular.copy(status,$scope.status);
		$scope.statusCount++;

	} // end scope.deleteMovie
	function getMovies(){
		dataFactory.getMovies()
			.success(function(data){
				for (var obj in data){
					var movie=data[obj];					
					movie = MovieTemplateHelper.getUpdatedModel(movie);			
				}				
				$scope.movies = data;
			})
			.error(function(error){
				var message = 'Unable to load movies data: '+error.errorMessage;
				var status = {
					type:"ERROR",
					message: message,
					title: "ERROR"	
				};	
				angular.copy(status,$scope.status);
				$scope.statusCount++;			
			});
	}
	getMovies();
	
}]);

/* Add/Edit Movies Controller */
MoviesControllers.controller('MoviesAddEditController', ['$scope', '$routeParams', '$route', '$location', 'dataFactory',  function($scope, $routeParams, $route, $location, dataFactory) {
	$scope.theForm = null;
	$scope.isDraggable = ('draggable' in document.createElement('span'));
	$scope.id = $routeParams.id;
	$scope.statusCount=0;
	$scope.status = {};
	$scope.updateLabel = "Update Movie";
	$scope.addLabel = "Add Movie";
	$scope.resetLabel = "Reset Movie";
	$scope.editLabel = "Edit Form";
	$scope.resetData = {};
	$scope.movie = angular.copy(DefaultMovieModel);
	$scope.previewMovieItem = null;
	if($scope.id=="0"){
		$scope.pageTitle = "Create New Movie";	
		$scope.movie = MovieTemplateHelper.getLocalCopy();
		$scope.resetData = angular.copy($scope.movie);
		$scope.previewMovieItem = MovieTemplateHelper.getUpdatedModel(angular.copy($scope.movie));
	}	
	else{		
		dataFactory.getMovie($scope.id).success(function(data){		
			$scope.pageTitle = "Update Movie";	
			$scope.movie = data;
			$scope.resetData = angular.copy($scope.movie);
			$scope.previewMovieItem = MovieTemplateHelper.getUpdatedModel(angular.copy($scope.movie));
		})
		.error(function(error){				
			$scope.pageTitle = "Update Movie";
			var message = 'Unable to load movies data: '+error.errorMessage;
			var status = {
				type:"ERROR",
				message: message,
				title: "ERROR"	
			};
			$scope.status = angular.copy(status);
			$scope.statusCount++;
		});	
	}
	$scope.addMovie = function(){
		if($scope.theForm.$valid){
			dataFactory.insertMovie($scope.movie)
				.success(function(data){										
					var message = "Movie Created Successfully!";
					$scope.movie["id"] = "0";
					var status  = {
						type:"SUCCESS",
						message: message,
						title: "Add Movie Success",
						okCallback: function(){
							$scope.resetMovie();
						}					
					};	
					angular.copy(status,$scope.status);
					$scope.statusCount++;					
				})
				.error(function(error){				
					var message = error.errorMessage;
					$scope.movie["id"] = "0";
					var status = {
						type:"ERROR",
						message: message,
						title: "Error Adding Movie"	
					};				
					angular.copy(status,$scope.status);
					$scope.statusCount++;							
				});	
		}
	}	
	$scope.setForm = function(form){
		$scope.theForm = form;
	}

	$scope.updateMovie = function(){
		if($scope.theForm.$valid){
			var updatedAttributes="";
			var updates = 0;
			for(key in $scope.movie){
				if($scope.movie[key]!=$scope.resetData[key]){
					if(updates>0){
						updatedAttributes += ", ";
					}					
					updatedAttributes += MovieModelLabels[key];
					updates++;
				}				
			}
			if(updates>0){
				dataFactory.updateMovie($scope.movie)
					.success(function(data){
						angular.copy(data,$scope.movie);							
						var previewMovieItem = MovieTemplateHelper.getUpdatedModel(angular.copy($scope.movie));				
						angular.copy(previewMovieItem,$scope.previewMovieItem);
						$scope.resetData = angular.copy($scope.movie);
						var message = "Updated Successfully: "+updatedAttributes;	
						var status = {
							type:"SUCCESS",
							message: message,
							title: "Update Success"	
						};		
						$scope.status = angular.copy(status);
						$scope.statusCount++;								
					})
					.error(function(error){		
						var message = error.errorMessage;	
						var status = {
							type:"ERROR",
							message: error.errorMessage,
							title: "Update Error"	
						};
						$scope.status = angular.copy(status);
						$scope.statusCount++;
					});		
			}// if updates>0
			else{
					var message = "Nothing To Update!";	
					var status = {
						type:"ERROR",
						message: message,
						title: "Update Warning"	
					};
					$scope.status = angular.copy(status);
					$scope.statusCount++;
			}
		}
	} // updateMovie
	
	$scope.resetMovie = function(){
		if($scope.movie["id"]=="0"){	
			MovieTemplateHelper.clearLocalCopy();	
			$scope.reloadView();		
		}
		else{		
			if((typeof $scope.theForm != 'undefined') && $scope.theForm !=null){
				$scope.theForm.$setPristine();
				$scope.theForm.$setUntouched();
			}					
			angular.copy($scope.resetData,$scope.movie);	
		}
	}
	
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
	$scope.reloadView = function(){
		$route.reload();
	}
}]);

