<?php
/* @var $this SiteController */
	$this->pageCSS = array(
		"/www/content/css/resume.css",
	);
	$this->pageJS = array(
"/www/content/js/libs/underscore/underscore-1.5.2.js",
"/www/content/js/libs/backbone/backbone-min-1.0.0.js",	
		"/www/content/js/resume.js",
	);
$this->metaKeyWords = "resume, html, css, javascript, jquery, ajax, json, frontend, developer";
$this->metaDescription = "Raymond Lee's resume. Frontend web developer. Experience programming with HTML, CSS, and JavaScript. Experience with jQuery library and various plugins.";
$this->pageTitle=Yii::app()->name . ' - Resume';
$this->breadcrumbs=array(
	'Resume',
);
?>
<!-- This is a "static" page. You may change the content of this page
by updating the file <code><?php echo __FILE__; ?></code>.
$_SERVER['DOCUMENT_ROOT']
-->

<?php include $_SERVER['DOCUMENT_ROOT']."/www/content/snippets/resume.html"; ?>



