var events, eventView, calendarView, datepickerView;
$(function(){	 	
    var CalendarView = Backbone.View.extend({
        initialize: function(){
            //_.bindAll(this); 			
            this.listenTo(this.collection, 'reset', this.addAll);
            this.listenTo(this.collection, 'add', this.addOne);
            this.listenTo(this.collection, 'change', this.change);            
            this.listenTo(this.collection, 'destroy', this.destroy);                      
        },
        render: function() {
			console.log('render');
			console.log('jsonModel = ' + JSON.stringify(this.collection));
		
			

            this.$el.fullCalendar({
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },

                selectable: true,
                selectHelper: true,
                editable: true,
                ignoreTimezone: false,                
                select: this.select,
                eventClick: this.eventClick,
                eventDrop: this.eventDropOrResize,        
                eventResize: this.eventDropOrResize,
            });
			
	

        },
        addAll: function() {
			console.log("addAll");
            this.$el.fullCalendar('addEventSource', events.toJSON());
        },
        addOne: function(event) {
			console.log("addOne id="+event.id);
			console.log("event.errorMessage = "+event.get("errorMessage"));
			if(event.id != null)
			{
				//this.$el.fullCalendar( 'refetchEvents' );
				
            	this.$el.fullCalendar('renderEvent', event.toJSON(), { stick: true });
			}
			else if(event.get("errorMessage") !=null)
			{			
				events.pop();
				console.log("pop events = " +JSON.stringify(events.toJSON()));
			}				
			
        },        
        select: function(startDate, endDate) {
			console.log('select');
			console.log('jsonModel = ' + JSON.stringify(events));
            //eventView.collection = events;
            eventView.model = new TaskEvent({start: getDateString(startDate), end: getDateString(endDate)});
            eventView.render();            
        },
        eventClick: function(fcEvent) {
			console.log('eventClick id = ' + fcEvent.id);
            eventView.model = events.get(fcEvent.id);
            eventView.render();
        },
        change: function(event) {
			
			console.log("change id = "+event.get('id'));
            // Look up the underlying event in the calendar and update its details from the model
            var fcEvent = this.$el.fullCalendar('clientEvents', event.get('id'))[0];
			if(event.get('id')==null)
			{
				events.pop();
				console.log("pop events = " +JSON.stringify(events.toJSON()));
			}
			else if(fcEvent==null)
			{
				this.addOne(event);
			}
			else
			{
            	fcEvent.title = event.get('title');
	            fcEvent.start = event.get('start');
				fcEvent.end = event.get('end');
        	    this.$el.fullCalendar('updateEvent', fcEvent);           
			}
        },
        eventDropOrResize: function(fcEvent) {
			console.log("eventDropOrResize");
            // Lookup the model that has the ID of the event and update its attributes
            this.collection.get(fcEvent.id).save({start: fcEvent.start, end: fcEvent.end});            
        },
        destroy: function(event) {
			console.log("destroy");
            this.$el.fullCalendar('removeEvents', event.id);         
        }        
    }); // end CalendarView
	
	
    var EventView = Backbone.View.extend({
        
        initialize: function() {
            //_.bindAll(this);           
        },
        render: function() {
			var thisObj = this;
            var buttons = {'Ok': function(){ thisObj.save(); }};
            if (!this.model.isNew()) {
                _.extend(buttons, {'Delete': this.destroy});
            }
            _.extend(buttons, {'Cancel': this.close});            
			//alert(this.model.get('title'));

            this.$el.dialog({
                modal: true,
                title: (this.model.isNew() ? 'New' : 'Edit') + ' Event',
                buttons: buttons,
                open: this.open()
				
            });

            return this;
        },        
        open: function() {
            this.$el.find('#title').val(this.model.get('title'));
            this.$el.find('#start').val(this.model.get('start'));  
			this.$el.find('#end').val(this.model.get('end'));           
        },        
        save: function() {
            var newModel = new Event({'title': eventView.$('#title').val(), 'start': eventView.$('#start').val(), 'end': eventView.$('#end').val() });
            
            if (eventView.model.isNew()) {
				 var newModel = new Event({'title': eventView.$('#title').val(), 'start': eventView.$('#start').val(), 'end': eventView.$('#end').val() });
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
				 var newModel = new Event({'id': eventView.model.get('id'),'title': eventView.$('#title').val(), 'start': eventView.$('#start').val(), 'end': eventView.$('#end').val() });
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
            eventView.$el.dialog('close');
        },
        destroy: function() {
            eventView.model.destroy({success: eventView.close});
        }        
    });
    
    events = new TaskEventsCollection();
	eventView = new EventDialogView({id: '#eventDialog', collection: events}); 
    calendarView = new CalendarView({el: $("#calendar"), collection: events});
	calendarView.render();
    events.fetch();
	

});