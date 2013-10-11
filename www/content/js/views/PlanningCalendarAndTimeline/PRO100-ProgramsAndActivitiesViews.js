// JavaScript Document

var ProgramCategoryView, ProgramDetailsView;

$(document).ready(function(){
	ProgramCategoryView = Backbone.View.extend({
	
			//... is a list tag.
			tagName:  "div",
			className: "program-category-container",
			el: $('#Programs-Categories-Container'), 
		
			// Cache the template function for a single item.
			template: _.template($('#program-category-template').html()),
	
			events: {
				/*
			  "click .task-activate-button"   : "doDeactivate",
			  "click .task-deactivate-button"   : "doActivate"	
				*/
			},
	
			initialize: function() {
				//console.log(' initialize jsonModel = ' + JSON.stringify(this.model.toJSON()));
			  //this.listenTo(this.model, 'change', this.render);
			  //this.listenTo(this.model, 'destroy', this.remove);
			  console.log("ProgramCategoryView.initialize");			  
			  this.collection = new ProgramDetailsCollection();
			  this.listenTo(this.collection, 'add', this.addProgramDetails);
			},
		
			// Re-render the titles of the tasks item.
			render: function() {		
				var jsonModel = this.model.toJSON();
				//console.log('jsonModel = ' + JSON.stringify(jsonModel));
				var template = this.template(jsonModel);
				//console.log('template = ' + template);
				this.$el.append(template);
			  
			  //alert(this.el.html());
			  return this;
			},
			addProgramDetails: function(programDetailsModel)
			{
				console.log("ProgramCategoryView.addProgramDetails");
				var view = new ProgramDetailsView({model: programDetailsModel });
				var html = view.render().el;
				var categoryId = programDetailsModel.get("categoryId");
				var listId = "#Program-Details-List-"+categoryId;
				
		  		this.$(listId).append(html);
			}
			
		
	
	  }); // end ProgramCategoryView
	  
	  ProgramDetailsView = Backbone.View.extend({
	
			//... is a list tag.
			tagName:  "li",
			className: "program-details-item",
	
		
			// Cache the template function for a single item.
			template: _.template($('#program-details-template').html()),
	
			events: {				
				"change .program-checkbox" : "changeCheckbox"
			},
	
			initialize: function() {
			/* 	##################################################################################
					Re-render the view when the Model is changed		
				################################################################################## */
			  this.listenTo(this.model, 'change', this.render);
			  //this.listenTo(this.model, 'destroy', this.remove);
			},
		
			// Re-render the titles of the tasks item.
			render: function() {		

				var jsonModel = this.model.toJSON();
				//console.log('jsonModel = ' + JSON.stringify(jsonModel));
				var template = this.template(jsonModel);
				//console.log('template = ' + template);
				this.$el.html(template);
			  
			  //alert(this.el.html());
			  return this;
			},
			/* 	##################################################################################
					Update the Model, but don't re-render the view when user change the checkbox			
				################################################################################## */
			changeCheckbox: function(ev)
			{
				var tag = ev.currentTarget;
				var isChecked = $(tag).prop("checked");
				this.model.set("isChecked",isChecked, {silent: true} );
			},
			addCollection: function(programDetailsCollection)
			{
				
			}
			
		
	
	  }); // end ProgramDetailsView

});