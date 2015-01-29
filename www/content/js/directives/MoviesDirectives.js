angular.module('MoviesDirectives', []).directive('imdbUserRate', function() {
	return {
            restrict: 'A',
            link: function(scope, elem, attrs) {	
				//console.log(scope);		
				var previousVal = parseInt(attrs.rating)/2;
				var imdbID = attrs.imdbID;
				var title = attrs.ratetitle;
				var rateitObj = $(elem).rateit({
					"title" : title,
					"imdbID": imdbID,
					"beforeSelection": function(prevVal){
						previousVal = prevVal;

					},
					"afterSelection": function(val){	
						var thisObj = this;
						var rating = val*2;
						var AjaxData = { "imdbID": this.imbdID, "rating": rating};
						var response = $.ajax({
							url: MoviesSettings.RateMovieUri,
							type: "POST",
							dataType: 'json',
							data: AjaxData	
						});
						response.done(function(data)
						{
							
							var dialogData = {}
							if(data.status.toUpperCase() == "FAILURE")
							{
								var message = data.reason;
								dialogData = { 
									"status": data.status,
									"message": "Your rating failed to submit! Reason: \""+message+"\""
								}					
								rateitObj.rateit('value', previousVal)
								alert(dialogData.message);
							}
							else
							{
								dialogData = { 
									"status": data.status,
									"message": "Your rating for \""+thisObj.title+"\" was sucessfully submitted!"
								}	
								alert(dialogData.message);
							}
							//thisObj.showRatingDialog(dialogData);
							
							
						});
						response.fail(function(msg)
						{
							dialogData = { 
								"status": "FAILURE",
								"message": "Your rating failed to submit!"
							}
							alert("Failure!");	
							//thisObj.showRatingDialog(dialogData);
						});
					}
			
			});

			
			
            }
        }
}).directive('imdbRate', function() {
	return {
            restrict: 'A',
            link: function(scope, elem, attrs) {			
				var imdbRating = parseInt(attrs.rating)/2;				
				$(elem).rateit( {"readonly": true, "value": imdbRating, "max": 5 });
            }
        }
});