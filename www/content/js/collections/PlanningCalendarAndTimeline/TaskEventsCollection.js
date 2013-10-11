 var TaskEventsCollection = Backbone.Collection.extend({
	// Reference to this collection's model.
	model: TaskEvent,
	url: 'controllers/events.php',
	initialize: function() {
        //this.sort_order = 'desc';
    },
	comparator: function(model) {
		var startDate = new Date(getDateObject(model.get('start')));
		var endDate = new Date(getDateObject(model.get('end')));
		console.log("comparator: "+model.get('start'));
        return [model.get('start'),model.get('end')];
    }
}); // end / End TaskEventsCollection