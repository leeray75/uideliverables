<?php
/* @var $this SiteController */
$this->pageCSS = array(
/* "/www/content/css/jquery-ui-1.10.3.custom.css", */
//"/mediamorph/css/global.css",s
	"/www/content/css/portfolio.css",
	//"/www/content/css/google-code-prettify/prettify.css",
	"//google-code-prettify.googlecode.com/svn/loader/prettify.css",
	 "/www/content/css/jquery-ui-1.10.3.custom.css",
	 "/www/content/js/libs/jquery/plugins/rateit/rateit.css",
	 "/www/content/css/portfolio/movies-rating-v2.css",
);


$this->pageJS = array(

"/www/content/js/libs/jquery/jquery-ui-1.10.3.custom.min.js",
"//google-code-prettify.googlecode.com/svn/loader/run_prettify.js",
//"/www/content/js/libs/jquery/plugins/google-code-prettify/prettify.js",
"/www/content/js/demos/Movies-AngularJS.js",

	"/www/content/js/libs/jquery/plugins/rateit/jquery.rateit-modified.js",
	"/www/content/js/libs/jquery/plugins/jeditable/jquery.jeditable-1.7.3.js",
	"/www/content/js/libs/jquery/plugins/jeditable/jquery.jeditable.masked.js",	
	"/www/content/js/libs/jquery/plugins/jquery.maskedinput.js",
//	"/www/content/js/libs/angular/angular-1.3.11/angular.min.js",	
	"/www/content/js/libs/angular/angular-1.3.11/angular-route.min.js",
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

$this->metaKeyWords = "html, css, javascript, jquery, ajax, json, AnglarJS, movies, ratings, REST";
$this->metaDescription = "A movies demo with AngularJS SPA (Single Page Application).";
$this->pageTitle=Yii::app()->name . ' - Movies Single Page Application Demo with AngularJS';
$this->breadcrumbs=array(
	'Demos & Portfolio'=>array('/site/page/?view=portfolio'), 
	'Movies - AngularJS SPA'
);
?>

<section class="top-content clear-fix row">
  <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
    <div class="top-copy">
      <h1>Movies Single Page Application Demo with AngularJS</h1>
      <?php include $_SERVER['DOCUMENT_ROOT']."/www/content/snippets/portfolio/movies-rating/top-copy-angular-v2.html"; ?>
    </div>
    <!-- /top-copy --> 
  </div>
</section>
<!-- /top-content -->
<ul class="nav nav-tabs" role="tablist">
  <li role="presentation" class="active"><a href="#demo" aria-controls="demo" role="tab" data-toggle="tab">Demo</a></li>  
  <li role="presentation"><a href="#details" aria-controls="details" role="tab" data-toggle="tab">Details</a></li>
  
</ul>
<div class="tab-content">
  <div role="tabpanel" class="tab-pane active" id="demo">
    <section id="MoviesListView">
      <div ng-app="moviesApp">
        <div id="MoviesAppRow" class="row">
          <div id="MoviesSideNavColumn" class="col-lg-2 col-md-2">
            <aside id="MoviesNavContainer" ng-controller="asideMenuController">
              <div id="Movie-Collapse-Menu">
                <ul class="movies-navbar" >
                  <li class="movies-brand-logo"><a href="/www/index.php/site/page?view=portfolio&portfolio=angular-movies-rating-v2#/"><img src="/www/content/images/logos/UI-Deliverables-Movies.gif" class="movie-logo img-responsive" /></a></li>
                  <li class="nav-link-item" ng-class="{active: menuActive == 'list'}"><a href="/www/index.php/site/page?view=portfolio&portfolio=angular-movies-rating-v2#/list" class="btn btn-default">Movies List <span class="glyphicon glyphicon-triangle-right"></span></a></li>
                  <li class="nav-link-item" ng-class="{active: menuActive == 'add'}"><a href="/www/index.php/site/page?view=portfolio&portfolio=angular-movies-rating-v2#/edit/preview/0" class="btn btn-default">Add Movie <span class="glyphicon glyphicon-triangle-right"></span></a></li>
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
  </div>
  <!-- /demo tab-pane -->
  <div role="tabpanel" class="tab-pane" id="details">
    <?php include $_SERVER['DOCUMENT_ROOT']."/www/content/snippets/portfolio/movies-rating/details-angular-v2.html"; ?>
  </div>
</div>
<!-- /tab-content --> 
