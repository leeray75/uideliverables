var AppView, ProgramsCategories;
var app = app || {};
$(function() {

	if($('#CONTENT-PRO100').exists())
	{
		PRO100_CONTENT.init();
	}
				
});
var PRO100_CONTENT =
{
	ContentID: '#CONTENT-PRO100',
	init: function()
	{
		var thisObj = this;
		console.log('CONTENT-PRO100.init');						
		AppView = Backbone.View.extend({
			el: $(thisObj.ContentID),
			categoryViewsMap: {},
			events: {
				"click .showLink": "showContent",
				"click .hideLink": "hideContent",
				"click .reset-to-recommended-link": "resetToRecommended"	
			},
		
			initialize: function() {
				console.log("AppView Start initialize");
				//console.log(JSON.stringify(this.collection.toJSON()));
				this.listenTo(this.collection, 'add', this.addCategory);	
				this.listenTo(this.collection, 'sync', this.syncTasks);									
				console.log("AppView End initialize");
			  //alert(this);
			  //thisObj.Tasks.fetch();
			},
			
			render: function() {
				console.log('AppView.render: \n');
				
			},
			changeCategoryView: function(){
				console.log('AppView.changeCategoryView');
			},
			addCategory: function(categoryModel)
			{
				console.log("addCategory");
				console.log(JSON.stringify(categoryModel.toJSON()));
				var key = categoryModel.get("id");
				console.log("key = "+key);
				this.categoryViewsMap[key] = new ProgramCategoryView({model: categoryModel});
				this.categoryViewsMap[key].render();
			},
			getProgramDetailsCollection: function(categoryId)
			{
				return this.categoryViewsMap[categoryId].collection;
			},
			hideContent: function(ev)
			{
				var tag = ev.currentTarget;
				var contentId = $(tag).attr("href");
				console.log("hideContent: "+contentId);
				$(contentId).hide();
				$(tag).removeClass("hideLink");
				$(tag).addClass("showLink");
				$(tag).html("Show");
				return false;
			},
			showContent: function(ev)
			{
				var tag = ev.currentTarget;
				var contentId = $(tag).attr("href");
				$(contentId).show();
				$(tag).removeClass("showLink");
				$(tag).addClass("hideLink");
				$(tag).html("Hide");
				return false;
			},
			resetToRecommended: function(ev)
			{
				var keys = Object.keys(this.categoryViewsMap);
				for(i=0;i<keys.length;i++)
				{	
					var keyName = keys[i];
					var categoryCollection = this.getProgramDetailsCollection(keyName);
					for(j=0;j<categoryCollection.length;j++)
					{
						var programDetails = categoryCollection.at(j);
						var isRecommended = programDetails.get("isRecommended");
						programDetails.set("isChecked",isRecommended);	
					}
				}
				return false;
			}
		
		}); // end AppView	
		ProgramsCategories = new ProgramCategoryCollection();
		app = new AppView({collection: ProgramsCategories});	 		 
	}
	
	
} // end PRO100_CONTENT