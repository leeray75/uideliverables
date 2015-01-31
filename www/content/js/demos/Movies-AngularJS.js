var DefaultMovieModel = {
	   "id":"0",
	   "user_id": user.id,
	   "title": "",
	   "plot": "",
	   "genre": "",
	   "director": "",
	   "writers": "",
	   "actors":"",
	   "poster": "/www/content/images/movie-posters/default.gif",
	   "rated":"PG",
	   "released":"",
	   "year":"",
	   "runtime":"",
	   "type":"movie",
	   "imdbID":"",
	   "imdbRating":"0",
	   "imdbVotes":"0"
	}
	
var MovieTemplateHelper =
{
	getUpdatedModel: function(movie){
		//console.log("Inside MovieTemplateHelper");
		movie.allowDeleteEdit = ( (movie["user_id"]==user.get("id")) || user.get("isAdmin")=="1");	
		movie.poster = this.getPosterImageSrc(movie.poster);					
		movie.GenreLabel = this.getGenreLabel(movie.genre);
		movie.DisplayReleaseDate = this.getReleaseDateDisplay(movie.released)
		movie.DirectorLabel = this.getDirectorsLabel(movie.director);
		movie.WriterLabel = this.getWritersLabel(movie.writers);
		movie.ActorsLabel =this.getActorsLabel(movie.actors);		
		//movie._imdbRating = movie.imdbRating;
		movie.rating = this.getImdbRating(movie.imdbRating, movie.imdbVotes);	
		
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
	},
	updateMovie: function(origData,newData){
		for(key in newData)
		{
			var value = newData[key];
			origData[key] = value;				
		}		
	},
	setLocalCopy: function(movie){
		var localMovie = angular.copy(DefaultMovieModel);
		this.updateMovie(localMovie,movie);
		localStorage.setItem("MovieModel",angular.toJson(localMovie));
		for(key in movie)
		{		
			var value = movie[key];		
			if((typeof value != 'undefined') && value.length>0){
				localMovie[key] = value;	
			}			
		}	
		localStorage.setItem("MovieModel",angular.toJson(localMovie));		
	},
	getLocalCopy: function(){
		var isAvailable = !(typeof localStorage.getItem("MovieModel") == 'undefined' || localStorage.getItem("MovieModel")==null);
		var movie = isAvailable ? angular.fromJson(localStorage.getItem("MovieModel")) : angular.copy(DefaultMovieModel) ;
		return movie;
	},
	clearLocalCopy: function(){
		localStorage.removeItem("MovieModel");
	}
	
	
}
	
var MoviesPlugins = {
	setMaskedDate: function(scope,elem,attrs){
		$(elem).mask("99-99-9999",{placeholder:"MM-DD-YYYY"});
		$(elem).on('blur',function(){
			var released = $(this).val();
			var dateArray = released.split("-");
			if (dateArray[0].length < 4) {
				released = dateArray[2] + "-" + dateArray[0] + "-" + dateArray[1];
			}
			scope.movie["released"] = released;
		});
	},// end MoviesPlugins.setMaskedDate
	setReadOnlyRateIt: function(scope,elem,attrs){
		var imdbRating = 0;
		if (attrs.rating != "0") {
			imdbRating = MovieTemplateHelper.getImdbRating(scope.movie.imdbRating, scope.movie.imdbVotes) / 2;;
		}
		$(elem).rateit({
			"readonly": true,
			"value": imdbRating,
			"max": 5
		});		
	}, //end MoviePlugins.setReadOnlyRateIt
	setUsersRateIt: function(scope,elem,attrs,dataFactory){
 		var previousVal = parseInt(attrs.rating) / 2;	
		var rateitObj = $(elem).rateit({
			"beforeSelection": function(prevVal) {
				previousVal = prevVal;
			},
			"afterSelection": function(val) {
					var thisObj = this;
					//console.log("Val="+val);
					var movie = angular.copy(scope.movie);
					var votes = (typeof localStorage.getItem("MovieVotes") == 'undefined' || localStorage.getItem("MovieVotes") == null) ? {} : angular.fromJson(localStorage.getItem("MovieVotes"));
					if (!votes.hasOwnProperty("movie_" + movie["id"]) || user.get("isAdmin") == "1") {
						var movieID = movie['id'];
						var title = movie['title'];
						var rating = val * 2;
						//console.log("rating = "+rating);
						dataFactory.submitVote(movie, rating)
							.success(function(data) {
								var movie = MovieTemplateHelper.getUpdatedModel(data);
								votes["movie_" + movie["id"]] = rating;
								localStorage.setItem("MovieVotes", angular.toJson(votes));
								for (key in movie) {
									scope.movie[key] = movie[key];
								}
								thisObj.readonly = true;
								//MoviesPlugins.setReadOnlyRateIt(scope,elem,attrs);
								var message = "Your vote for \"" + movie["title"] + "\" is successful!";
								console.log("Your vote for \"" + movie["title"] + "\" is successful!");
								$(elem).parent().find('.message').remove();
								$(elem).parent().prepend('<div class="message" style="color:#f00;">'+message+'</div>');

							})
							.error(function(error) {
								message = 'Unable to submit vote: ' + error.errorMessage;
								$(elem).parent().find('.message').remove();
								$(elem).parent().prepend('<div class="message" style="color:#f00;">'+message+'</div>');
							});
					} else {
						var message = "You have already voted for this movie!";
						$(elem).parent().find('.message').remove();
						$(elem).parent().prepend('<div class="message" style="color:#f00;">'+message+'</div>');
					}
				} // end afterSelection
		}); // end rateitObj		
	}, // end MoviesPlugins.setUsersRateIt
	setEditables: function(scope,elem,attrs){
			var textSettings = {
				cssclass: 'editable-item',
				type: 'text',
				submit: 'OK',
				cancel: 'CANCEL'
			};
			$('.editable-text').editable(function(value, settings) {
				var key = $(this).attr('model-key');
				if ($.trim(value) != "") {
					scope.movie[key] = value;
					if (scope.movie["id"] == 0) {
						MovieTemplateHelper.setLocalCopy(scope.movie);
					} else {
						scope.updateMovie();
					}
					return (value);
				} else {
					return (scope.movie[key]);
				}
			},textSettings); // end .editable-text
			var dateSettings =  {
				cssclass: 'editable-item',
				type: "masked",
				mask: "99-99-9999",
				submit: 'OK',
				cancel: 'CANCEL'
			};
			$('.editable-date').editable(function(value, settings) {
				var key = $(this).attr('model-key');
				if ($.trim(value) != "") {
					var released = value;
					var dateArray = released.split("-");
					if (dateArray[0].length < 4) {
						released = dateArray[2] + "-" + dateArray[0] + "-" + dateArray[1];
					}
					scope.movie[key] = released;

					if (scope.movie["id"] == 0) {
						MovieTemplateHelper.setLocalCopy(scope.movie);
					} else {
						scope.updateMovie();
					}
					return (value);
				} else {
					return (scope.previewMovieItem["DisplayReleaseDate"]);
				}
			},dateSettings); // end .editable-date

			var ratingSettings = {
				data: " {'G':'G','PG':'PG','PG-13':'PG-13', 'R':'R'}",
				type: 'select',
				submit: 'OK',
				cancel: 'CANCEL'
			}
			$('#Editable-Select-Rated').editable(function(value, settings) {
				var key = $(this).attr('model-key');
				if ($.trim(value) != "") {
					scope.movie[key] = value;
					if (scope.movie["id"] == 0) {
						MovieTemplateHelper.setLocalCopy(scope.movie);
					} else {
						scope.updateMovie();
					}
					return (value);
				} else {
					return (scope.movie[key]);
				}
			},ratingSettings); // end .editable-rated	

			var textareaSettings =  {
				cssclass: 'editable-item',
				type: 'textarea',
				submit: 'OK',
				cancel: 'CANCEL'
			}
			$('.editable-textarea').editable(function(value, settings) {
				var key = $(this).attr('model-key');
				if ($.trim(value) != "") {
					scope.movie[key] = value;
					if (scope.movie["id"] == 0) {
						MovieTemplateHelper.setLocalCopy(scope.movie);
					} else {
						scope.updateMovie();
					}
					return (value);
				} else {
					return (scope.movie[key]);
				}
			},textareaSettings); // end .editable						 

	} // end MoviesPlugins.setEditables
} //end MoviesPlugins