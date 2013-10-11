<?php
/* @var $this SiteController */
$this->pageCSS = "portfolio.css";
$this->metaKeyWords = "portfolio, html, css, javascript, jquery, ajax, code, samples";
$this->metaDescription = "A list of sites and other projects I've coded recently.";
$this->pageTitle=Yii::app()->name . ' - Portfolio';
$this->breadcrumbs=array(
	'Portfolio',
);
?>
<!-- This is a "static" page. You may change the content of this page
by updating the file <code><?php echo __FILE__; ?></code>.
$_SERVER['DOCUMENT_ROOT']
-->
<p>
<?php include $_SERVER['DOCUMENT_ROOT']."/www/content/snippets/portfolio.html"; ?>


</p>
