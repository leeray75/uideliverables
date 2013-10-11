// JavaScript Document

var TaskEventItemView, TaskListView;

$(document).ready(function(){

	TaskEventItemView = Backbone.View.extend({	
		tagName:  "li",
		// Cache the template function for a single item.
		template: _.template($('#task-item-template').html()),
		events: {
		  "click .task-do-complete-link"   : "doComplete",
		  "click .task-undo-complete-link"   : "undoComplete"	
		},

		initialize: function() {
		  this.listenTo(this.model, 'change', this.render);
		  this.listenTo(this.model, 'destroy', this.remove);
		},
	
		// Re-render the titles of the tasks item.
		render: function() {		
			var jsonModel = this.model.toJSON();
			var template = this.template(jsonModel);
		  	this.$el.html(template);
		  
		  //alert(this.el.html());
		  return this;
		},
		doComplete: function(){			
			this.setModelComplete(true);
			return false;
		},
		undoComplete: function(){
			this.setModelComplete(false);
			return false;
		},
		setModelComplete: function(value)
		{
			
				var newModel = new TaskEvent (this.model.toJSON() );
				newModel.set("isComplete",value);
                this.model.save(newModel, {success: function(data){ 
											
						if(data.get("errorMessage") != null)
						{
							alert(data.get("errorMessage"));	
						}
						else
						{
							//alert("success");
						}
					}// end success
				});			
		}
	}); // end TaskEventItemView
	
	TaskListView = Backbone.View.extend({
			el: $(".tasks-group-container"),
			listId: '',
			events:{},
			initialize: function(){
				this.el = $(this.id);
				this.collection = new TaskEventsCollection(); 
				this.listenTo(this.collection, 'change', this.change); 
				this.listenTo(this.collection, 'sync', this.syncTasks);					
			},
			render: function()
			{
				
			},
			change: function(eventModel){
				console.log("TaskListView change id = "+eventModel.get('id'));
			},
			addTaskEvent: function(taskEvent)
			{
				//console.log('TaskListView.addTaskEvent: \n');
				try{
					taskEvent.toJSON();
				}catch(e){
					taskEvent = new TaskEvent();
				}							  
				var view = new TaskEventItemView({model: taskEvent});
				//alert(view.render().el.html());
				var html = view.render().el;
				$(this.id).find('ul').append(html);							
			},
			syncTasks: function(tasks){				
			
			},
			clear: function()
			{
				console.log("clearing: "+this.id);
				this.collection.reset();
				$(this.id).find('ul').html('');				
			}
			
			
		});

});