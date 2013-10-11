// JavaScript Document

var TaskEvent =  Backbone.Model.extend({

	// Default attributes for the task item.
	defaults: function() {
	  return {
		title: "",
		description: '',
		location: '',
		start: '',
		end: '',
		isAllDay: false,
		isEditable: true,
		isComplete: false	
	  };
	},
	setComplete: function(flag)
	{
		this.isComplete = flag;
	}
	 

 }); // End TaskEvent
 