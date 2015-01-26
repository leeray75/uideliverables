<!-- <script src="//code.jquery.com/jquery-1.10.1.min.js" async="true"></script> -->
<script language="javascript">
var user = user || {};
var UserNav = UserNav || {};
var GlobalVariables = GlobalVariables || {};
</script>
<?php 
if(isset($_GET["portfolio"]) and (strpos($_GET["portfolio"],'movies-rating') !== false))
{
?>
<script>
var MoviesSettings =
{
	MoviesApiUri: '/mediamorph/hiring/list.php',
	RateMovieUri: '/mediamorph/hiring/rate.php',
/* 
	IMDb blocks images from rendering if the referer isn't part of their domain or localhost
	Work around, is downloading the image from their site and host it somewhere else 
	e.g. PosterImageUri: '//mediamorph.uideliverables.com/images/imdb/'
*/
	PosterImageUri: '/mediamorph/images/imdb/'
	//PosterImageURI: '//ia.media-imdb.com/images/'
}
</script>
<?php 
}
?>

<?php 
	
$jsArray =  array(

    $baseURL."/content/js/json2.js",
    //$baseURL."/content/js/libs/jquery/jquery-1.9.1.min.js",
	$baseURL."/content/js/libs/jquery/jquery-1.10.1.min.js",
	$baseURL."/content/js/libs/bootstrap/bootstrap.min.js",
	/* $baseURL."/content/js/libs/modernizr/modernizr-custom-2.6.2.js", */
	/* 
	$baseURL."/content/plugins/jquery.mobile/1.3.2/jquery.mobile-1.3.2.min.js",
	$baseURL."/content/js/libs/jquery/jquery-ui-1.9.1.custom.js",
	$baseURL."/content/js/libs/underscore/underscore-1.5.2.js",
	
	$baseURL."/content/js/libs/backbone/backbone-min-1.0.0.js",	
	
	
	$baseURL."/content/js/models/Users/User.js",
	$baseURL."/content/js/main.js",
	$baseURL."/content/js/libs/jquery/plugins/jquery.simplemodal-1.4.4.js", 
	*/
	
);

//$jsArray = array_merge($jsArray, $this->pageJS);
				 
$pageJS = isset($this->pageJS) ? $this->pageJS : array();
	foreach ($jsArray as &$scriptSrc) {
		echo '<script src="'.$scriptSrc.'"></script>'."\r\n";
	}
	foreach ($pageJS as &$scriptSrc) {
		echo '<script src="'.$scriptSrc.'"></script>'."\r\n";
	}
?>

<script language="javascript" type="text/javascript">
function initUser()
{
	user = new User(<?php echo json_encode(Yii::app()->user->userProfile) ?>);
	<?php /*
	user = new User({
		isGuest: <?php echo Yii::app()->user->isGuest==1 ? "true" : "false" ?>,
		isAdmin: <?php echo Yii::app()->user->isAdmin()==1 ? "true" : "false" ?>,
		id: "<?php echo Yii::app()->user->id ?>",
		username: "<?php echo Yii::app()->user->username ?>",
		email: "<?php echo Yii::app()->user->email ?>"	
	});
	*/
	?>
}
</script>
<script type="text/javascript">var switchTo5x=true;</script>
<script type="text/javascript" src="http://w.sharethis.com/button/buttons.js"></script>
<script type="text/javascript" src="http://s.sharethis.com/loader.js"></script>



