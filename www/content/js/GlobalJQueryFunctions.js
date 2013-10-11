// JavaScript Document
var console = console || { log: function(){}}
String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
}
jQuery.fn.exists = function(){return jQuery(this).length>0;} 

jQuery.fn.isNumeric = function(event)
{
	//alert(event.keyCode);
	var keyCode = event.keyCode;
	//alert(keyCode);
	if(event.shiftKey)
	{
		return false;
	}
	else if(keyCode == 8 || keyCode == 46 || (keyCode>36 && keyCode<41) || (keyCode>95 && keyCode<106))
	{
		return true;	
	}
	else if (keyCode < 48 || keyCode > 57 ) {
		//event.preventDefault();	
		return false;
	}
	else {
		// Ensure that it is a number and stop the keypress
		return true;
	}
}

function isInteger(s) {
  return (s.toString().search(/^-?[0-9]+$/) == 0);
}

jQuery.fn.selectAll = function(event){ this.select(); } // jQuery.fn.selectAll

jQuery.fn.isMobile = function()
{
	var ua = navigator.userAgent;
	var checker = {
  		iphone: ua.match(/(iPhone|iPod|iPad)/),
  		blackberry: ua.match(/BlackBerry/),
		android: ua.match(/Android/)
	};
	return (checker.iphone!=null || checker.blackberry!=null || checker.android!=null);
}

jQuery.fn.reset = function () {
  $(this).each (function() { this.reset(); });
}