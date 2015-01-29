<?php
/* @var $this SiteController */
$this->pageCSS = array(
/* "/www/content/css/jquery-ui-1.10.3.custom.css", */
//"/mediamorph/css/global.css",s
	"/www/content/css/portfolio.css",
	 "/www/content/css/jquery-ui-1.10.3.custom.css",
	 "/www/content/js/libs/jquery/plugins/rateit/rateit.css",
	 "/www/content/css/portfolio/movies-rating-v2.css",
);


$this->pageJS = array(

"/www/content/js/libs/jquery/jquery-ui-1.10.3.custom.min.js",
"/www/content/js/libs/underscore/underscore-1.5.2.js",
"/www/content/js/libs/backbone/backbone-min-1.0.0.js",
"/www/content/js/models/Users/User.js",
"/www/content/js/main.js",

	"/www/content/js/libs/jquery/plugins/rateit/jquery.rateit-modified.js",
	"/www/content/js/libs/angular/angular.min.js",	
	"/www/content/js/libs/angular/angular-route.min.js",
	//"/www/content/js/libs/angular/angular-animate.min.js",
	"/www/content/js/apps/MoviesDemo-Angular-v2.js",
	"/www/content/js/services/MoviesServices.js",
	"/www/content/js/controllers/Movies/MoviesControllers-v2.js",
	"/www/content/js/directives/MoviesDirectives.js",
	
	//
);
/*
$this->pageJS = array(

"/www/content/js/libs/jquery/jquery-ui-1.10.3.custom.min.js",
//"/www/content/js/libs/angular.min.js",
//"/www/content/js/libs/angular/angular-route.min.js",
//"/www/content/js/libs/angular/angular-animate.min.js",
"/www/content/js/libs/backbone/backbone-min-1.0.0.js",	
"/www/content/js/models/Users/User.js",
"/www/content/js/main.js",

	"/www/content/js/libs/jquery/plugins/rateit/jquery.rateit-modified.js",
	//"/www/content/js/controllers/Movies/MoviesControllers.js",

);
*/

$this->metaKeyWords = "html, css, javascript, jquery, ajax, json, angularjs, movies, ratings REST";
$this->metaDescription = "A problem and solution to a movies rating problem version 2";
$this->pageTitle=Yii::app()->name . ' - Demo: Movies Rating Demo Version 2';
$this->breadcrumbs=array(
	'Demos & Portfolio'=>array('/site/page/?view=portfolio'), 
	'Movies Rating Version 2'
);
?>

<section class="top-content clear-fix row">
  <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
    <div class="top-copy">
      <h1>Movies Rating Version 2 - AngularJS</h1>
      <?php include $_SERVER['DOCUMENT_ROOT']."/www/content/snippets/portfolio/movies-rating/top-copy-angular-v2.html"; ?>
    </div>
    <!-- /top-copy --> 
  </div>
</section>
<!-- /top-content -->

<section id="MoviesListView">
  <div ng-app="moviesApp">
    <div id="MoviesAppRow" class="row">
      <div id="MoviesSideNavColumn" class="col-lg-2 col-md-2">
        <aside id="MoviesNavContainer" ng-controller="asideMenuController">
          <div id="Movie-Collapse-Menu">
            <ul class="movies-navbar" >           
              <li class="movies-brand-logo"><a href="/www/index.php/site/page?view=portfolio&portfolio=angular-movies-rating-v2"><img src="/www/content/images/logos/UI-Deliverables-Movies.gif" class="movie-logo img-responsive" /></a></li>
              
              <li class="nav-link-item" ng-class="{active: menuActive == 'list'}"><a href="/www/index.php/site/page?view=portfolio&portfolio=angular-movies-rating-v2#/list" class="btn btn-default">Movies List <span class="glyphicon glyphicon-triangle-right"></span></a></li>
              <li class="nav-link-item" ng-class="{active: menuActive == 'add'}"><a href="/www/index.php/site/page?view=portfolio&portfolio=angular-movies-rating-v2#/add" class="btn btn-default">Add Movie <span class="glyphicon glyphicon-triangle-right"></span></a></li>
            </ul>
          </div>
          <!-- /Movie-Collapse-Menu -->
          <div class="clear-fix"></div>
        </aside>
      </div>
      <!-- /MoviesSideNavColumn -->
      <div id="MoviesMainViewColumn" class="col-lg-10 col-md-10">
        <div class="main" ng-view></div>
      </div>
      <!-- /MoviesMainViewColumn --> 
    </div>
    <!-- /MoviesAppRow --> 
  </div>
  <!-- /ng-app --> 
</section>
