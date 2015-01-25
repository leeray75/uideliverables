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

<div id="Welcome-Hero" class="jumbotron">
<div class="row">
<div class="hero-copy-col col-lg-6 col-md-6 col-sm-12 col-xs 12">
  <h1>Welcome to <?php echo CHtml::encode(Yii::app()->name); ?></h1>
  <p>I am a front-end developer with experience in developing in HTML, JavaScript, CSS. I have experience with JavaScript libraries and frameworks such as jQuery, backbone.js, and AngularJS. I also have knowlege working with Bootstrap, a responsive web framework. I am always looking forward to new opportunities and working in a dynamic learning environment where I can contribute my current skills, and grow through new opportunities.</p>
  <p>- Raymond Lee</p>
  <p><a class="btn btn-primary btn-large" href="/www/index.php/site/page?view=resume">My Resume &raquo;</a></p>
  </div>
  <div class="hero-image-col col-lg-6 col-md-6 hidden-sm hidden-xs">
  <img src="/www/content/images/download/_TOON4.GIF" class="img-responsive" alt="You can't just punch i 'let there be light' without writing the code underlying the user interface functions" />
  </div>
  </div>
  <!-- /row -->
</div>
<!-- /Welcome-Hero -->

<div id="RSS-FEED" role="tabpanel"> 
  
  <!-- Nav tabs -->
  <ul class="nav nav-tabs" role="tablist">
    <li role="presentation" class="active"><a href="#css-tricks" aria-controls="css-tricks" role="tab" data-toggle="tab">CSS-Tricks</a></li>
    <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Smashing Magazine</a></li>
  </ul>
  
  <!-- Tab panes -->
  <div class="tab-content">
    <div role="tabpanel" class="tab-pane active" id="css-tricks">
	 <?php
    $rss = new DOMDocument();
    $rss->load('http://feeds.feedburner.com/CssTricks');
    $feed = array();
    
    foreach ($rss->getElementsByTagName('item') as $node) {
        $item = array(
            'title' => $node->getElementsByTagName('title')->item(0)->nodeValue,
            'desc' => $node->getElementsByTagName('description')->item(0)->nodeValue,
            'link' => $node->getElementsByTagName('link')->item(0)->nodeValue,
            'date' => $node->getElementsByTagName('pubDate')->item(0)->nodeValue
        );
        array_push($feed, $item);
    }
    $limit = 8;
    for ($x = 0; $x < $limit; $x++) {
        $title       = str_replace(' & ', ' &amp; ', $feed[$x]['title']);
        $link        = $feed[$x]['link'];
        $description = $feed[$x]['desc'];
        $date        = date('l F d, Y', strtotime($feed[$x]['date']));
        echo '<p><strong><a href="' . $link . '" title="' . $title . '" target="CssTricks">' . $title . '</a></strong><br />';
        echo '<small><em>Posted on ' . $date . '</em></small></p>';
        echo '<p>' . $description . '</p>';
    }
    ?>     
    </div>
    <div role="tabpanel" class="tab-pane" id="profile">
    <?php
    $rss = new DOMDocument();
    $rss->load('http://www.smashingmagazine.com/feed/');
    $feed = array();
    
    foreach ($rss->getElementsByTagName('item') as $node) {
		$desc = $node->getElementsByTagName('description')->item(0)->nodeValue;
		$tableStartPos = strpos($desc,"<table");
		$tableEndPos = strpos($desc,"</table>");
	
		if ($tableEndPos>-1 && $tableEndPos>0) {
			$tableEndPos += 8; //remove <em> tag aswell</table>
			$len = intval($tableEndPos) - intval($tableStartPos);
	
			$desc = substr_replace($desc, '', $tableStartPos, $len);
			$desc = $desc;
		}
		
        $item = array(
            'title' => $node->getElementsByTagName('title')->item(0)->nodeValue,
            'desc' => $desc,
            'link' => $node->getElementsByTagName('link')->item(0)->nodeValue,
            'date' => $node->getElementsByTagName('pubDate')->item(0)->nodeValue
        );
        array_push($feed, $item);
    }
    $limit = 8;
    for ($x = 0; $x < $limit; $x++) {
        $title       = str_replace(' & ', ' &amp; ', $feed[$x]['title']);
        $link        = $feed[$x]['link'];
        $description = $feed[$x]['desc'];
        $date        = date('l F d, Y', strtotime($feed[$x]['date']));
		if($x>0){
			echo '<hr>';
		}
        echo '<p><strong><a href="' . $link . '" title="' . $title . '" target="SmashMagazine">' . $title . '</a></strong><br />';
        echo '<small><em>Posted on ' . $date . '</em></small></p>';
        echo '<p>' . $description . '</p>';
    }
    ?>  
    </div>
  </div>
</div>
<!-- /RSS-FEED -->
<script language="javascript">
$('#RSS-FEED img').addClass('img-responsive');
</script>
<div id="Site-Info" class="row">
  <div class="col-lg-4 col-md-4 col-sm-4">
    <div class="box">
      <h2>My Resume</h2>
      <p>A document that present my backgrounds and skills. It contains a summary of my relevant job experience, technical skills, and education.</p>
      <p><a class="btn btn-info" href="/www/index.php/site/page?view=resume">Resume &raquo;</a></p>
    </div>
  </div>
  <div class="col-lg-4 col-md-4 col-sm-4">
    <div class="box">
      <h2>Contact Me</h2>
      <p>Please feel free to contact me if you have any questions, comments, or suggestions. I will receive everything sent through this contact form.</p>
      <p><a class="btn btn-info" href="/www/index.php/site/contact">Contact Me &raquo;</a></p>
    </div>
  </div>
  <div class="col-lg-4 col-md-4 col-sm-4">
    <div class="box">
      <h2>My Demos &amp; Portfolio</h2>
      <p>A list of sites and other projects I've coded recently. It displays some personal project demos and prototypes I am working on.</p>
      <p><a class="btn btn-info" href="/www/index.php/site/page?view=portfolio">Portfolio &raquo;</a></p>
    </div>
  </div>
</div>
<!-- .row -->