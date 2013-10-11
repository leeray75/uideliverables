<?php
/* @var $this SiteController */

$this->pageTitle=Yii::app()->name;
$this->pageCSS = "homepage.css";
?>

<div class="container">
  <div class="hero-unit">
    <h1>Welcome to <i><?php echo CHtml::encode(Yii::app()->name); ?></i></h1>
    <p>I am Raymond Lee. This is my online portfolio. I am a Front-End Web Developer living in Edison, NJ!</p>
    <p><a class="btn btn-primary btn-large" href="/www/index.php?r=site/page&view=resume">My Resume &raquo;</a></p>
  </div>
  <!-- .hero-unit -->
  
  <div class="row">
    <div class="span4 box">
      <h2>My Resume</h2>
      <p>A document that present my backgrounds and skills. It contains a summary of my relevant job experience, technical skills, and education.</p>
      <p><a class="btn" href="/www/index.php?r=site/page&view=resume">Resume &raquo;</a></p>
    </div>
    <!-- .span4 -->
    
    <div class="span4 box">
    
      <h2>Contact Me</h2>
      <p>Please feel free to contact me if you have any questions, comments, or suggestions. I will receive everything sent through this contact form.</p>
      <p><a class="btn" href="/www/index.php?r=site/contact">Contact Me &raquo;</a></p>
    </div>
    <!-- .span4 -->
    
    <div class="span4 box">
      <h2>My Portfolio</h2>
      <p>A list of sites and other projects I've coded recently.</p>
      <p><a class="btn" href="/www/index.php?r=site/page&view=portfolio">Portfolio &raquo;</a></p>
    </div>
    <!-- .span4 --> 
    
  </div>
  <!-- .row --> 
</div>
<!-- .container -->