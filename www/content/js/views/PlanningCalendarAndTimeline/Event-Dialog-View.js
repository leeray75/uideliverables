// JavaScript Document

var EventDialogView, EventDialogTemplate;

$(document).ready(function(){
	
	EventDialogTemplateView = Backbone.View.extend({	
		tagName:  "div",
		// Cache the template function for a single item.
		template: _.template($('#event-dialog-template').html()),
		el: '#eventDialog',
		events: {
		 // "click .task-deactivate-link"   : "doDeactivate",
		  //"click .task-activate-link"   : "doActivate"	
		},

		initialize: function() {
			console.log("this.el = " + this.el);
			//console.log(' initialize jsonModel = ' + JSON.stringify(this.model.toJSON()));
		  //this.listenTo(this.model, 'change', this.render);
		  //this.listenTo(this.model, 'destroy', this.remove);
		},
		render: function() {		
			var jsonModel = this.model.toJSON();
			console.log("render this.el = " + this.el);
			console.log('jsonModel = ' + JSON.stringify(jsonModel));
			var template = this.template(jsonModel);
			//console.log('template = ' + template);
			$('#eventDialog').remove();
			$('body').append(template);
			this.initDateTimePickerPlugin();
		  	//var html = this.$el.html(template);
            return this;

		},
		initDateTimePickerPlugin: function()
		{
			
			$('#start').datetimepicker({
				timeFormat: 'HH:mm:ss',
				dateFormat: 'yy-mm-dd'
			});		
			$('#end').datetimepicker({
				timeFormat: 'HH:mm:ss',	
				dateFormat: 'yy-mm-dd'
			});
			

			//$('#start').timepicker();	
				
		}
		
	}); 
	EventDialogTemplate = new EventDialogTemplateView();
	EventDialogView = Backbone.View.extend({	
		tagName:  "div",
		// Cache the template function for a single item.
		events: {
		 // "click .task-deactivate-link"   : "doDeactivate",
		  //"click .task-activate-link"   : "doActivate"	
		},

		initialize: function() {
			console.log("this.id = " + this.id);

			this.el = $(this.id);
			//console.log(' initialize jsonModel = ' + JSON.stringify(this.model.toJSON()));
		  //this.listenTo(this.model, 'change', this.render);
		  //this.listenTo(this.model, 'destroy', this.remove);
		},
		render: function() {		
			var jsonModel = this.model.toJSON();
			console.log("render this.el = " + this.el);
			console.log('jsonModel = ' + JSON.stringify(jsonModel));

			var thisObj = this;
            var buttons = {'Ok': function(){ thisObj.save(); }};
			console.log("!this.model.isNew() = " + !this.model.isNew());
            if (!this.model.isNew()) {
                _.extend(buttons, {'Delete': this.destroy});
            }
            _.extend(buttons, {'Cancel': this.close});            
			//alert(this.model.get('title'));
			
			EventDialogTemplate.model = this.model;
			EventDialogTemplate.render();	
			console.log("this.$el.exists() = " + this.$el.exists());		
            $('#eventDialog').dialog({
                modal: true,
                title: (this.model.isNew() ? 'New' : 'Edit') + ' Event',
                buttons: buttons
				
            });

            return this;

		},


		save: function() {

            
            if (this.model.isNew()) {
				 var newModel = new TaskEvent({'title': $('#title').val(),'description': $('#description').val(), 'start': $('#start').val(), 'end': $('#end').val() });
                events.create(newModel, {wait: true, success: function(data){ 
					
						console.log("events = " +JSON.stringify(events.toJSON()));
						if(data.get("errorMessage") != null)
						{
							alert(data.get("errorMessage"));	
						}
						else
						{
							eventView.close();
						}
					}// end success
				});
            } else {
				 
				var newModel = new TaskEvent (this.model.toJSON() );
				newModel.set("title",$('#title').val());
				newModel.set("description",$('#description').val());
				newModel.set("start",$('#start').val());
				newModel.set("end",$('#end').val());
				 console.log("newModel = " +JSON.stringify(newModel.toJSON()));
                eventView.model.save(newModel, {success: function(data){ 
					
						console.log("events = " +JSON.stringify(events.toJSON()));
						console.log("data = " +JSON.stringify(data.toJSON()));
						if(data.get("errorMessage") != null)
						{
							alert(data.get("errorMessage"));	
						}
						else
						{
							eventView.close();
						}
					},// end success
					error: function(model,response){
						var data = $.parseJSON(response.responseText);
						alert(data.message);
					}
				});
            } 
			
        },
        close: function() {
            $('#eventDialog').dialog('close');
        },
        destroy: function() {
            eventView.model.destroy({success: eventView.close});
        }        
		
	}); // end TaskEventItemView

});