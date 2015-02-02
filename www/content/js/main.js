// main.js

var console = console || { log: function(){  }}
String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
}
jQuery.fn.exists = function(){return jQuery(this).length>0;} 

jQuery.fn.isNumericEvent = function(event)
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
/* 
Check if position:fixed; is supported. Requires presence of document.body
*/
function IS_POSITION_FIXED_SUPPORTED(){
  var container = document.body;
  
  if (document.createElement && container && container.appendChild && container.removeChild) {
    var el = document.createElement('div');
    
    if (!el.getBoundingClientRect) return null;
        
    el.innerHTML = 'x';
    el.style.cssText = 'position:fixed;top:100px;';
    container.appendChild(el);

    var originalHeight = container.style.height,
        originalScrollTop = container.scrollTop;
    // In IE<=7, the window's upper-left is at 2,2 (pixels) with respect to the true client.
    // surprisely, in IE8, the window's upper-left is at -2, -2 (pixels), but other elements
    // tested is just right, so we need adjust this.
    // https://groups.google.com/forum/?fromgroups#!topic/comp.lang.javascript/zWJaFM5gMIQ
    // https://bugzilla.mozilla.org/show_bug.cgi?id=174397
    var extraTop  = document.documentElement.getBoundingClientRect().top;
    extraTop = extraTop > 0 ? extraTop : 0;

    container.style.height = '3000px';
    container.scrollTop = 500;

    var elementTop = el.getBoundingClientRect().top;
    container.style.height = originalHeight;
    
    var isSupported = (elementTop - extraTop) === 100;
    container.removeChild(el);
    container.scrollTop = originalScrollTop;

    return isSupported;
  }
  return null;
} // End IS_POSITION_FIXED_SUPPORTED
function generateModal(ContentID)
{
		var ModalStyle = "opacity: 0.5; height: 100%; width: 100%; position: fixed; left: 0px; top: 0px; z-index: 1001;";
		var ModalHTML = '<div id="'+ContentID+'"-Modal" class="cptk-modal-overlay" style="'+ModalStyle+'"></div>';
		$('body').append(ModalHTML);	
		$(ContentID).show();
		var WindowHeight = $(window).height();
		var WindowWidth = $(window).width();
		var WrapperHeight = $(ContentID).height();
		var WrapperWidth = $(ContentID).width();
		var WrapperTop = (WindowHeight/2) - (WrapperHeight/2) ;
		var WrapperLeft = (WindowWidth/2) - (WrapperWidth/2) ;		
		$(ContentID).css({position: 'fixed', top: WrapperTop, left: WrapperLeft});	
		$(ContentID).prepend('<a title="Close" class="modalCloseImg simplemodal-close"></a>');
}

function getMilitaryTime(time)
{
	var hours = Number(time.match(/^(\d+)/)[1]);
	var minutes = Number(time.match(/:(\d+)/)[1]);
	var AMPM = time.match(/\s(.*)$/)[1];
	if(AMPM == "PM" && hours<12) hours = hours+12;
	if(AMPM == "AM" && hours==12) hours = hours-12;
	var sHours = hours.toString();
	var sMinutes = minutes.toString();
	if(hours<10) sHours = "0" + sHours;
	if(minutes<10) sMinutes = "0" + sMinutes;
	return sHours + ":" + sMinutes;	
}
function getFormattedTime(militaryTime) {
    var timeArray = militaryTime.split(":");
    var hours = ((parseInt(timeArray[0]) + 11) % 12) + 1;
    var amPm = parseInt(timeArray[0]) > 11 ? ' PM' : ' AM';
    var minutes = timeArray[1];

    return hours + ':' + minutes + amPm;
};

function getDateObject(dateString)
{
	//console.log("dateString = "+dateString);
	//"2013-08-29 06:00:00"
	var fullDateArray = dateString.split(" ");
	var date = fullDateArray[0];
	var time = fullDateArray[1];
	var dateArray = date.split("-");
	var timeArray = time.split(":");
	var year = dateArray[0];
	var month = parseInt(dateArray[1])-1;
	var day = dateArray[2];
	var hours = timeArray[0];
	var minutes = timeArray[1];
	var seconds = timeArray.length>2 ? timeArray[2] : "00";
	var milliseconds = "00";
	return new Date(year, month, day, hours, minutes, seconds, milliseconds)
	
}



var UI = UI || {};

UI = {
	sidrId: '#sidr',
	init: function()
	{
		//console.log("intiializing!");
		initUser();
		GlobalVariables = GlobalVariables || {};
		var now = new Date();
		var year = now.getFullYear();
		var month = now.getMonth()+1;
		var day = now.getDate();
		month = month<10 ? "0"+month : month;
		day = day<10 ? "0"+day : day;
		GlobalVariables.CurrentDate = year+"-"+month+"-"+day+" 00:00:00";
		
	},
	loadGoogleSearch: function()
	{
		var cx = '007094520602235572549:qc-ix-slhds';
		/*
			var gcse = document.createElement('script');
			gcse.type = 'text/javascript';
			gcse.async = true;
			gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
				'//www.google.com/cse/cse.js?cx=' + cx;
			var s = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(gcse, s);
			
		*/
		var gsURL = '//www.google.com/cse/cse.js?cx=' + cx;
		LazyLoad.js(gsURL,function(){
			console.log("loaded: "+gsURL);
		});		
	}
	
}
$(function(){	
	UI.init();
	
	
});
