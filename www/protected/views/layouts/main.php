<?php /* @var $this Controller */ 
$baseURL = Yii::app()->request->baseUrl;
?>
<?php header('Content-language: en'); ?> 
<!DOCTYPE HTML>
<!-- 
<?php /* echo 'Current PHP version: ' . phpversion(); */ ?>
-->
<?php 

if(isset($_GET["portfolio"]) and ($_GET["portfolio"] == "angular-movies-rating"))
{
	echo('<html lang="en" ng-app="myApp">');
}else{
	echo('<html lang="en">');
}
?><head>
<meta charset="utf-8">
<meta name="google-site-verification" content="EPIlhr6_ScpRyrPBAia0j6H8ooaKOa4Y8nmF9SrSZv4" />
<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">
<link href='//fonts.googleapis.com/css?family=Lobster|Open+Sans:400,300,300italic,600,400italic,600italic,700,700italic,800,800italic|Roboto+Condensed:400,300,300italic,400italic,700,700italic|Source+Sans+Pro:400,200,200italic,300,300italic,400italic,600,600italic,700,700italic,900,900italic|PT+Sans:400,400italic,700,700italic|Droid+Serif:400,400italic,700,700italic|Ubuntu:400,300,300italic,400italic,500,500italic,700,700italic|Merriweather:400,300,300italic,400italic,700,700italic,900,900italic' rel='stylesheet' type='text/css'>
<?php
if ( (isset($this->isSSL) and $this->isSSL === true) and (!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] !== 'on')) {
    if(!headers_sent()) {
        header("Status: 301 Moved Permanently");
        header(sprintf(
            'Location: https://%s%s',
            $_SERVER['HTTP_HOST'],
            $_SERVER['REQUEST_URI']
        ));
        exit();
    }
}
else if((isset($_SERVER['HTTPS']) and $_SERVER['HTTPS'] === 'on')){
	
	if(isset($this->isSSL) and !$this->isSSL === true)
	{
		if(!headers_sent()) {
			header("Status: 301 Moved Permanently");
			header(sprintf(
				'Location: http://%s%s',
				$_SERVER['HTTP_HOST'],
				$_SERVER['REQUEST_URI']
			));
			exit();
		}
    }
}
?>
<?php if(isset($this->metaDescription)): ?>
<meta name="description" content="<?php echo $this->metaDescription; ?>">
<?php endif ?>
<?php if(isset($this->metaKeywords)): ?>
<meta name="keywords" content="<?php echo $this->metaKeywords; ?>">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<?php endif ?>
<meta name="author" content="Raymond Lee" />
<?php include_once "includes/js-files.php"; ?>
<?php include_once "includes/css-files.php"; ?>


<title><?php echo CHtml::encode($this->pageTitle); ?></title>
</head>

<body>
<!-- Google Tag Manager -->

<div class="container" id="page" data-role="page">
  <?php include "includes/header.php" ?>
  <section id="main" class="row" data-role="content">
    <div class="content-container col-xs-12 clearfix">
    	
      <?php if(isset($this->breadcrumbs)):?>
      <?php $this->widget('zii.widgets.CBreadcrumbs', array(
			'links'=>$this->breadcrumbs,
		)); ?>
      <!-- breadcrumbs -->
      
      <?php endif?>
 		
      <?php echo $content; ?> 
      </div>
    <!-- /content-container --> 
  </section>
  <!-- /main -->
  <footer data-role="footer">
    <div class="content-container clearfix">
      <div id="linkedin-plugin-container"> 
        <!--
<script src="//platform.linkedin.com/in.js" type="text/javascript"></script>
--> 
<!--
        <script language="javascript">
	LazyLoad.js("//platform.linkedin.com/in.js", function () {});
</script> 
        <script type="IN/MemberProfile" data-id="http://www.linkedin.com/pub/raymond-lee/3/946/382" data-format="click" data-related="false"></script> 
        -->
      </div>
      <!-- /linkedin-plugin-container --> 
      Copyright &copy; <?php echo date('Y'); ?> by <?php echo CHtml::encode(Yii::app()->name); ?>.<br/>
      All Rights Reserved.<br/>
      <?php echo Yii::powered(); ?> </div>
    <!-- /content-container --> 
  </footer>

</div>
<!-- page -->

<?php include_once $_SERVER['DOCUMENT_ROOT']."/analyticstracking.php"; ?>
<!-- Piwik -->

<script type="text/javascript">stLight.options({publisher: "0749a3e4-1b28-453c-8ace-e949971754c9", doNotHash: false, doNotCopy: false, hashAddressBar: false});</script>
<script>
var options={ "publisher": "0749a3e4-1b28-453c-8ace-e949971754c9", "logo": { "visible": true, "url": "http://www.uideliverables.com/", "img": "http://www.uideliverables.com/www/content/images/global/logo-UIDeliverables.png", "height": 30}, "ad": { "visible": false, "openDelay": "5", "closeDelay": "0"}, "livestream": { "domain": "", "type": "sharethis"}, "ticker": { "visible": false, "domain": "", "title": "", "type": "sharethis"}, "facebook": { "visible": false, "profile": "sharethis"}, "fblike": { "visible": false, "url": ""}, "twitter": { "visible": false, "user": "sharethis"}, "twfollow": { "visible": false}, "custom": [{ "visible": false, "title": "Custom 1", "url": "", "img": "", "popup": false, "popupCustom": { "width": 300, "height": 250}}, { "visible": false, "title": "Custom 2", "url": "", "img": "", "popup": false, "popupCustom": { "width": 300, "height": 250}}, { "visible": false, "title": "Custom 3", "url": "", "img": "", "popup": false, "popupCustom": { "width": 300, "height": 250}}], "chicklets": { "items": ["facebook", "twitter", "linkedin", "pinterest", "email", "sharethis"]}};
var st_bar_widget = new sharethis.widgets.sharebar(options);
</script>
</body>
</html>
