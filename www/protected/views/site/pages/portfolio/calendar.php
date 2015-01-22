<?php
/* @var $this SiteController */
$this->pageCSS = array(
/* "/www/content/css/jquery-ui-1.10.3.custom.css", */

	"/www/content/css/portfolio.css",
	"/www/content/plugins/fullcalendar/fullcalendar.css",
	 "/www/content/css/portfolio/calendar.css", 
	 "/www/content/css/jquery-ui-1.10.3.custom.css",
);
$this->pageJS = array(

"/www/content/js/libs/jquery/jquery-ui-1.9.1.custom.js",

"/www/content/js/libs/underscore/underscore-1.5.2.js",
"/www/content/js/libs/backbone/backbone-min-1.0.0.js",
"/www/content/js/libs/modernizr/modernizr-custom-2.6.2.js",
"/www/content/js/models/Users/User.js",
"/www/content/js/main.js",
"/www/content/js/libs/jquery/plugins/jquery.simplemodal-1.4.4.js",
	"/www/content/js/libs/jquery/plugins/jquery.NobleCount.js",
	"/www/content/plugins/fullcalendar/fullcalendar.js",
	"/www/content/js/libs/jquery/plugins/jquery-ui-timepicker-addon.js",
	"/www/content/js/models/Calendar/Event.js",	
	"/www/content/js/collections/Calendar/EventsCollection.js",	
	"/www/content/js/views/Calendar/ModalViews.js",	
	"/www/content/js/views/Calendar/FullCalendarView.js",
	"/www/content/js/views/Calendar/EventsListView.js",
    "/www/content/js/apps/Calendar.js",
	
);

$this->metaKeyWords = "html, css, javascript, jquery, ajax, json, backbone.js, fullcalendar, calendar, events, REST";
$this->metaDescription = "An events calendar developed with Backbone.js and FullCalendar";
$this->pageTitle=Yii::app()->name . ' - Demo: Calendar';
$this->breadcrumbs=array(
	'Portfolio'=>array('/site/page/?view=portfolio'), 
	'Calendar'
);
?>

<section class="top-content clear-fix row">
  <div class="col-lg-8 col-md-8">
  	<div class="top-copy">
    <h1>Events Calendar</h1>
    <?php include $_SERVER['DOCUMENT_ROOT']."/www/content/snippets/portfolio/calendar/top-copy.html"; ?>
    </div>
     <!-- /top-copy -->
  </div>
 
  <div class="col-lg-4 col-md-4 visible-lg visible-md">
  <div class="resource-box">
    <?php include $_SERVER['DOCUMENT_ROOT']."/www/content/snippets/portfolio/calendar/resource-box.html"; ?>
    </div>
    <!-- /resource-box --> 
  </div>
  
</section>
<!-- /top-content -->
<section id="tabs-container" class="row">
  <div role="tabpanel"> 
    <!-- Nav tabs -->
    <ul class="nav nav-tabs" role="tablist">
      <li role="presentation" class="active"><a href="#calendar" aria-controls="calendar" role="tab" data-toggle="tab">Calendar</a></li>
      <li role="presentation"><a href="#events-list" aria-controls="events-list" role="tab" data-toggle="tab">Current &amp; Future Events List</a></li>
    </ul>
    
    <!-- Tab panes -->
    <div class="tab-content">
      <div role="tabpanel" class="tab-pane active" id="calendar"></div>
      <div role="tabpanel" class="tab-pane" id="events-list">
        <div id="active-events-list"> </div>
      </div>
    </div>
  </div>
  <!--
  <div class="col-lg-12">
    <ul class="nav nav-tabs">
      <li id="calendar-tab"><a href="#calendar">Calendar</a></li>
      <li id="events-list-tab"><a href="#events-list">Current &amp; Future Events List</a></li>
      <li id="test-tab"><a href="#test">Test</a></li>
    </ul>
    <div class="tab-content">
        <div class="tab-pane fade active in" id="calendar"></div>
        <div class="tab-pane fade active" id="events-list">
          <div id="active-events-list"> </div>
        </div>
        <div class="tab-pane fade active" id="test">
          test
        </div>
    </div>
  </div>
  --> 
</section>
<!-- /tabs-container --> 

<!--#include virtual="/bookfairs/cptoolkit/common_includes/templates/PlanningCalendarAndTimeline/CAL-Overlay-Modals-Templates.html" -->
<?php //include $_SERVER['DOCUMENT_ROOT']."/www/content/templates/calendar/calendar-modals-template.html"; ?>
<?php //include $_SERVER['DOCUMENT_ROOT']."/www/content/templates/calendar/event-list-item-template.html"; ?>