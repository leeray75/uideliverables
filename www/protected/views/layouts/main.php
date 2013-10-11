<?php /* @var $this Controller */ 
$baseURL = Yii::app()->request->baseUrl;
?>
<!DOCTYPE HTML>
<!-- 
<?php echo 'Current PHP version: ' . phpversion(); ?>
-->
<html>
<head>
<meta charset="utf-8">

<meta name="description" content="<?php echo $this->metaDescription; ?>">
<meta name="keywords" content="<?php echo $this->metaKeywords; ?>">
<meta name="author" content="Raymond Lee">

<link rel="stylesheet" type="text/css" href="<?php echo $baseURL; ?>/content/css/reset.css" />
<link rel="stylesheet" type="text/css" href="<?php echo $baseURL; ?>/content/css/global.css" />
<link rel="stylesheet" type="text/css" href="<?php echo $baseURL; ?>/content/css/bootstrap.min.css" />
<?php 
	if(!empty($this->pageCSS)){
		echo '<link rel="stylesheet" type="text/css" href="'.$baseURL.'/content/css/'.CHtml::encode($this->pageCSS).'" />';
	}
?>
<script src="<?php echo $baseURL; ?>/content/js/json2.js"></script>
<script src="<?php echo $baseURL; ?>/content/js/libs/jquery/jquery-1.9.1.min.js"></script>
<script src="<?php echo $baseURL; ?>/content/js/libs/jquery/jquery-ui-1.10.3.custom.min.js"></script>
<script src="<?php echo $baseURL; ?>/content/js/libs/backbone/backbone-min-1.0.0.js"></script>
<script src="<?php echo $baseURL; ?>/content/js/libs/underscore/underscore-min-1.5.1.js"></script>
<script src="<?php echo $baseURL; ?>/content/js/libs/bootstrap/bootstrap.min.js"></script>
<title><?php echo CHtml::encode($this->pageTitle); ?></title>
</head>

<body>
<div class="site-container" id="page">
  <header>
    <div class="content-container clearfix">
      <div id="logo"> <img src="<?php echo $baseURL; ?>/content/images/global/logo-UIDeliverables.png" alt="UI Deliverables" />
        <?php /* echo CHtml::encode(Yii::app()->name); */?>
      </div>
    </div>
    <!-- /content-container --> 
  </header>
  <!-- header -->
  <nav>
    <div class="content-container clearfix">
      <?php $this->widget('zii.widgets.CMenu',array(
			'items'=>array(
				array('label'=>'Home', 'url'=>array('/site/index')),
				array('label'=>'My Resume', 'url'=>array('/site/page', 'view'=>'resume')),
				array('label'=>'Contact', 'url'=>array('/site/contact')),
				array('label'=>'Portfolio', 'url'=>array('/site/portfolio'))
				/*
				array('label'=>'Login', 'url'=>array('/site/login'), 'visible'=>Yii::app()->user->isGuest),
				array('label'=>'Logout ('.Yii::app()->user->name.')', 'url'=>array('/site/logout'), 'visible'=>!Yii::app()->user->isGuest)
				*/
			),
		)); ?>
    </div>
    <!-- /content-container --> 
  </nav>
  <section id="main">
    <div class="content-container clearfix">
      <?php if(isset($this->breadcrumbs)):?>
      <?php $this->widget('zii.widgets.CBreadcrumbs', array(
			'links'=>$this->breadcrumbs,
		)); ?>
      <!-- breadcrumbs -->
      
      <?php endif?>
      <?php echo $content; ?> </div>
    <!-- /content-container --> 
  </section>
  <!-- /main -->
  <footer>
    <div class="content-container clearfix"> Copyright &copy; <?php echo date('Y'); ?> by <?php echo CHtml::encode(Yii::app()->name); ?>.<br/>
      All Rights Reserved.<br/>
      <?php echo Yii::powered(); ?> </div>
    <!-- /content-container --> 
  </footer>
</div>
<!-- page -->

</body>
</html>
