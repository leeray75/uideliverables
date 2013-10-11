 var ProgramCategoryCollection = Backbone.Collection.extend({
	// Reference to this collection's model.
	model: ProgramCategoryModel
	//url: 'controller/events.php',
	/*
	comparator: function(model) {
		//console.log("comparator: "+model.get('start'));
        //return [model.get('start'),model.get('end')];
    }
	*/
}); //  End ProgramCategoryCollection 

 var ProgramDetailsCollection = Backbone.Collection.extend({
	// Reference to this collection's model.
	model: ProgramDetailsModel
	//url: 'controller/events.php',
	/*
	comparator: function(model) {
		//console.log("comparator: "+model.get('start'));
        //return [model.get('start'),model.get('end')];
    }
	*/
}); //  End ProgramCategoryCollection 