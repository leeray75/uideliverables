<?php
// Check if id was submitted via GET
		if(!isset($_GET['id']))
			$this->_sendResponse(500, 'Error: Parameter <b>id</b> is missing' );
	 
		switch($_GET['model'])
		{
			// Find respective model    
			case 'events':
				$model = Event::model()->findByPk($_GET['id']);
				break;
			case 'movies':
				$model = Movie::model()->findByPk($_GET['id']);
				break;
			default:
				$this->_sendResponse(501);
				Yii::app()->end();
		}
		// Did we find the requested model? If not, raise an error
		if(is_null($model))
			$this->_sendResponse(404, 'No Item found with id '.$_GET['id']);
		else
			$this->_sendResponse(200, CJSON::encode($model));
?>