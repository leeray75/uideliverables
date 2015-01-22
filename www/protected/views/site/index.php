<?php
/* @var $this SiteController */

$this->pageTitle=Yii::app()->name;
$this->pageCSS = array(
	"/www/content/css/homepage.css",
	/* "/www/content/plugins/bxSlider/jquery.bxslider.css", */
);
$this->pageJS = array(
/*
	"/www/content/plugins/bxSlider/jquery.bxslider.js",
	*/
	"/www/content/js/pages/homepage.js",
);

$this->metaKeyWords="HTML,CSS,JavaScript,jQuery,resume,portfolio";
$this->metaDescription="Welcome to UI Deliverables! I am a front-end developer with experience in developing in HTML, JavaScript, CSS.";
?>

<div id="Hero-Slider-Container">
    <div id="Welcome-Hero" class="jumbotron">
      <h1>Welcome to <?php echo CHtml::encode(Yii::app()->name); ?></h1>
      <p>I am a front-end developer with experience in developing in HTML, JavaScript, CSS. I have experience with JavaScript libraries and frameworks such as jQuery, backbone.js, and AngularJS. I also have knowlege working with Bootstrap, a responsive web framework. I am always looking forward to new opportunities and working in a dynamic learning environment where I can contribute my current skills, and grow through new opportunities.</p>
      <p>- Raymond Lee</p>
     
      <p><a class="btn btn-primary btn-large" href="/www/index.php/site/page?view=resume">My Resume &raquo;</a></p>
    </div>
  <!-- /jumbotron --> 
</div>
<div class="row">
  <div class="col-lg-4 col-md-4 col-sm-4">
    <div class="box">
      <h2>My Resume</h2>
      <p>A document that present my backgrounds and skills. It contains a summary of my relevant job experience, technical skills, and education.</p>
      <p><a class="btn" href="/www/index.php/site/page?view=resume">Resume &raquo;</a></p>
    </div>
  </div>
  <div class="col-lg-4 col-md-4 col-sm-4">
    <div class="box">
      <h2>Contact Me</h2>
      <p>Please feel free to contact me if you have any questions, comments, or suggestions. I will receive everything sent through this contact form.</p>
      <p><a class="btn" href="/www/index.php/site/contact">Contact Me &raquo;</a></p>
    </div>
  </div>
  <div class="col-lg-4 col-md-4 col-sm-4">
    <div class="box">
      <h2>My Portfolio</h2>
      <p>A list of sites and other projects I've coded recently. It also displays some personal project demos and prototypes I am working on.</p>
      <p><a class="btn" href="/www/index.php/site/page?view=portfolio">Portfolio &raquo;</a></p>
    </div>
  </div>
</div>
<!-- .row --> 

