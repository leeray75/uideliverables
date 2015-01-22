 var UsersCollection = Backbone.Collection.extend({
	// Reference to this collection's model.
	model: User,
	url: '/www/index.php/api/userprofile',
	initialize: function() {
        //this.sort_order = 'desc';
    }
}); // end / End TaskEventsCollection