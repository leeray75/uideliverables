angular.module('movieApp.directives', [])
    .directive('formContainer', function() {
        return {
            restrict: 'C',
            templateUrl: '/www/content/partials/movies-rating/movies-add-edit.html'
        }
    })
    .directive('imdbUserRate', function(dataFactory) {
        return {
            restrict: 'A',
            link: function(scope, elem, attrs) {
                   MoviesPlugins.setUsersRateIt(scope,elem,attrs,dataFactory);		
                } // end link
        } // end return obj;
    })
    .directive('imdbRate', function() {
        return {
            restrict: 'A',
            link: function(scope, elem, attrs) {
                scope.$watch('movie', function() {
                    if (scope.movie != null) {
                       MoviesPlugins.setReadOnlyRateIt(scope,elem,attrs); 
                    }
                });
            }
        }
    })
	.directive('contenteditable',function(){
		return {
            restrict: 'A',
            link: function(scope, elem, attrs, ctrl) {
                    //console.log("Inline Edit Ready!")	
                    elem.on('blur',function(){
						var value = elem.html();
						var key = attrs['modelKey'];
						console.log(key);
						console.log(value);
					});
                } // end link
        } // end return
	})
    .directive('InlineEditTemplateReady', function() {
        return {
            restrict: 'C',
            link: function(scope, elem, attrs) {
				scope.$watch('previewMovieItem', function() {
						if (scope.previewMovieItem != null) {
							MoviesPlugins.setEditables(scope,elem,attrs);				 
						} // end scope.previewMovieItem!=null
					}) // end scope.$watch
			} // end link
        }
    })
	.directive('numericField',function(){
		return {
            restrict: 'C',
            link: function(scope, elem, attrs) {
				MoviesPlugins.setNumericField(scope,elem,attrs);	
			} // end link
        }
	})
	.directive('maskedDate',function(){
		return {
            restrict: 'C',
            link: function(scope, elem, attrs) {
				MoviesPlugins.setMaskedDate(scope,elem,attrs);	
			} // end link
        }
	})
	.directive('maskedYear',function(){
		return {
            restrict: 'C',
            link: function(scope, elem, attrs) {
				MoviesPlugins.setMaskedYear(scope,elem,attrs);	
			} // end link
        }
	})
	.directive('dialogContainer',function(){
		return {
            restrict: 'E',
			templateUrl: '/www/content/partials/movies-rating/movies-dialog.html',			
            link: function(scope, elem, attrs) {
				scope.$watch('statusCount', function() {
						if (scope.statusCount >0 ) {
							MoviesPlugins.setDialog(scope,elem,attrs);				 
						} // end scope.previewMovieItem!=null

					}) // end scope.$watch

                } // end link
        }
	});