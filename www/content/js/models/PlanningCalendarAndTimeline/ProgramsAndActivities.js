// JavaScript Document

var ProgramCategoryModel =  Backbone.Model.extend({

	// Default attributes for the task item.
	defaults: function() {
	  return {
		id: "",
		title: ""
	  };
	}	 
 }); // End ProgramCategoryModel
 
 var ProgramDetailsModel =  Backbone.Model.extend({

	// Default attributes for the task item.
	defaults: function() {
	  return {
		id: "",
		categoryId: "",
		isChecked: false,
		isRecommended: true,
		title: "",
		file: "",
		description: "",
		volunteers: "",
		duration: "",
		participants: "",
		books: "",
		bookFairSales: "",
		readingMinutes: ""
		
	  };
	}	 
 }); // End ProgramCategoryModel
 