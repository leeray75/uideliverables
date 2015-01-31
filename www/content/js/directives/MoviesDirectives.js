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
    .directive('InlineEditTemplateReady', function() {
        return {
            restrict: 'C',
            link: function(scope, elem, attrs) {
                    //console.log("Inline Edit Ready!")	
                    scope.$watch('previewMovieItem', function() {
                            if (scope.previewMovieItem != null) {
                                MoviesPlugins.setEditables(scope,elem,attrs);				 
                            } // end scope.previewMovieItem!=null

                        }) // end scope.$watch
                } // end link
        }
    })
	/*
    .directive('inlineEditTopCopy', function() {
        return {
            restrict: 'C',
            templateUrl: '/www/content/snippets/portfolio/movies-rating/inline-edit-top-copy.html'
        } // end return
    })
	*/
	.directive('maskedDate',function(){
		return {
            restrict: 'C',
            link: function(scope, elem, attrs) {
                    //console.log("Inline Edit Ready!")	
					MoviesPlugins.setMaskedDate(scope,elem,attrs);	

                } // end link
        }
	});