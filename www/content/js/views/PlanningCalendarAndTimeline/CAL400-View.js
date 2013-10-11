// JavaScript Document

var TaskEventItemView;

$(document).ready(function(){
	TaskEventItemView = Backbone.View.extend({	
		tagName:  "li",
		// Cache the template function for a single item.
		template: _.template($('#task-item-template').html()),
		events: {
		  "click .task-deactivate-link"   : "doDeactivate",
		  "click .task-activate-link"   : "doActivate"	
		},

		initialize: function() {
			//console.log(' initialize jsonModel = ' + JSON.stringify(this.model.toJSON()));
		  this.listenTo(this.model, 'change', this.render);
		  //this.listenTo(this.model, 'destroy', this.remove);
		},
	
		// Re-render the titles of the tasks item.
		render: function() {		
			var jsonModel = this.model.toJSON();
			console.log('jsonModel = ' + JSON.stringify(jsonModel));
			var template = this.template(jsonModel);
			//console.log('template = ' + template);
		  	this.$el.html(template);
		  
		  //alert(this.el.html());
		  return this;
		},
		doDeactivate: function(){						
			this.model.set({isActive: false});
		},
		doActivate: function(){
			this.model.set({isActive: true});
		}					
	}); // end TaskEventItemView

});