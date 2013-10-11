<?php
/* @var $this SiteController */
$this->pageCSS = "resume.css";
$this->metaKeyWords = "resume, portfolio, html, css, javascript, jquery, ajax";
$this->metaDescription = "Raymond Lee's resume.";
$this->pageTitle=Yii::app()->name . ' - Resume';
$this->breadcrumbs=array(
	'Resume',
);
?>
<!-- This is a "static" page. You may change the content of this page
by updating the file <code><?php echo __FILE__; ?></code>.
$_SERVER['DOCUMENT_ROOT']
-->
<p>
<?php include $_SERVER['DOCUMENT_ROOT']."/www/content/snippets/resume.html"; ?>


</p>
