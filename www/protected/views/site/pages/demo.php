<?php
if(isset($_GET["demo"]))
{
	
?>
	<?php include "demo/".$_GET["demo"].".php"; ?>

<?php
}
else{
?>
<?php
    /* @var $this SiteController */
	$this->pageCSS = array(
		"/www/content/css/portfolio.css",
	);	
	$this->pageJS = array(
		"/www/content/js/pages/portfolio.js",
		"/www/content/js/pages/demos.js",
	);	
    $this->metaKeyWords = "demos, portfolio, html, css, javascript, jquery, ajax, code, samples";
    $this->metaDescription = "A list of sites and other projects I've coded recently.";
    $this->pageTitle=Yii::app()->name . ' - Portfolio';
    $this->breadcrumbs=array(
        'Demos',
    );
    ?>
    <!-- This is a "static" page. You may change the content of this page
    by updating the file <code><?php echo __FILE__; ?></code>.
    $_SERVER['DOCUMENT_ROOT']
    -->
    
    <?php include $_SERVER['DOCUMENT_ROOT']."/www/content/snippets/portfolio.html"; ?>
<?php } ?>
