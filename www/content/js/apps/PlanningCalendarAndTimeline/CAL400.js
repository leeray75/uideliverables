// JavaScript Document

$(function() {

	if($('#CONTENT-CAL400').exists())
	{		
		CAL400_CONTENT.init();
	}
	
	
});


var CAL400_CONTENT =
{
	init: function()
	{
		var TasksEventsList, App;
		var PastDueTasks, TwoMonthsBeforeTasks, ThreeToFourWeeksBeforeTasks,OneToTwoWeeksBeoforeTasks,OneDayBeforeTasks,DuringFairTasks,AfterYourFairTask;
		
		
		
	  	
		var AppView = Backbone.View.extend({
			el: $("#CONTENT-CAL400"),
			events: {
				"click .btn-add-task": "addTask"		
		},
		
		initialize: function() {
			console.log("AppView Start initialize");

			//this.listenTo(this.collection, 'add', this.updateTasksView);	
			this.collection =  new TaskEventsCollection();
			this.listenTo(this.collection, 'sync', this.syncTasks);	

			this.PastDueTasksView = new TaskListView({id: '#Past-Due-Tasks', listId: '#Past-Due-Task-Items'});
			this.TwoMonthsBeforeView = new TaskListView({id: '#Two-Months-Before-Tasks', listId: '#Two-Months-Before-Task-Items'});
			this.ThreeToFourWeeksBeforeView = new TaskListView({id: '#Three-Four-Weeks-Before-Tasks', listId: '#Three-Four-Weeks-Before-Task-Items'});
			this.OneToTwoWeeksBeforeView = new TaskListView({id: '#One-Two-Weeks-Before-Tasks', listId: '#One-Two-Weeks-Before-Task-Items'});
			this.OneDayBeforeView = new TaskListView({id: '#One-Day-Before-Tasks', listId: '#One-Day-Before-Task-Items'});
			this.DuringFairView = new TaskListView({id: '#During-Fair-Tasks', listId: '#During-Fair-Task-Items'});
			this.AfterYourFairView = new TaskListView({id: '#After-Your-Fair-Tasks', listId: '#After-Your-Fair-Task-Items'});
			
			

		  //thisObj.Tasks.fetch();
		},
		
		render: function() {
			console.log('AppView.render: \n');
			this.collection.fetch();
		},
		clearAllDisplayedTasksEvents: function()
		{
			this.PastDueTasksView.clear();
			this.AfterYourFairView.clear();
			this.ThreeToFourWeeksBeforeView.clear();
			this.OneToTwoWeeksBeforeView.clear();
			this.TwoMonthsBeforeView.clear();
			this.OneDayBeforeView.clear();
			this.DuringFairView.clear();
					
			//this.$("#PastDueTaskItems").html('');
		},
		addPastDueTaskEvent: function(taskEvent) {

		  //view.delegateEvents(view.events);
		 
		},
		syncTasks: function(tasks){
			console.log('syncTasks');
			//this.addPastDueTaskEvent(task);
			
			this.clearAllDisplayedTasksEvents();
			var currentDate = getDateObject(GlobalVariables.CurrentDate);									
			var fairStartDate = getDateObject(GlobalVariables.FairStartDate);
			var fairEndDate = getDateObject(GlobalVariables.FairEndDate);
			
			var oneDayBeforeDate = getDateObject(GlobalVariables.FairStartDate);
			var twoMonthsBeforeDate = getDateObject(GlobalVariables.FairStartDate);
			var threeWeeksBeforeDate = getDateObject(GlobalVariables.FairStartDate);
			var fourWeeksBeforeDate = getDateObject(GlobalVariables.FairStartDate);
			var oneWeeksBeforeDate = getDateObject(GlobalVariables.FairStartDate);
			var twoWeeksBeforeDate = getDateObject(GlobalVariables.FairStartDate);
			oneDayBeforeDate.setDate(fairStartDate.getDate()-1);
			oneWeeksBeforeDate.setDate(fairStartDate.getDate() - 2);
			twoWeeksBeforeDate.setDate(fairStartDate.getDate() - 14);	
			threeWeeksBeforeDate.setDate(fairStartDate.getDate() - 21);
			fourWeeksBeforeDate.setDate(fairStartDate.getDate() - 28);
			twoMonthsBeforeDate.setMonth(fairStartDate.getMonth() - 2);
			//twoMonthsBeforeDate.setDate(fairStartDate.getDate() - 29);
			
			console.log("oneDayBeforeDate = " + oneDayBeforeDate);
				
			for(i=0;i<this.collection.length;i++)
			{
				var task = this.collection.at(i);
				
				var taskStart = getDateObject(task.get("start"));
				var taskEnd = getDateObject(task.get("end"));
				var isComplete = task.get("isComplete");
				var isPastDate = (taskEnd < currentDate);
				
				var isDuringFair = ((taskStart >= fairStartDate) && (taskStart <= fairEndDate));
				var isOneDayBefore = ((taskStart < fairStartDate) && (taskStart >= oneDayBeforeDate));
				var isOneTwoWeeksBefore = ( (taskStart < oneDayBeforeDate) &&  (taskStart >= twoWeeksBeforeDate));
				var isThreeFourWeeksBefore = ((taskStart < twoWeeksBeforeDate) && (taskStart >= fourWeeksBeforeDate));
				var isTwoMonthsBefore = ((taskStart < fourWeeksBeforeDate) && (taskStart >= twoMonthsBeforeDate));
				
				
				var theView = null;
				/*
				console.log("task id: "+task.get("id"));
				console.log("isPastDate: "+isPastDate);
				console.log("isComplete: "+isComplete);
				console.log("currentDate = "+currentDate);
				console.log("fairStartDate = "+fairStartDate);
				console.log("oneDayBeforeDate = " + oneDayBeforeDate);
				console.log("fairEndDate = " + fairEndDate);
				console.log("taskStart = " + taskStart);
				console.log("taskEnd = " + taskEnd);
				console.log("(taskStart >= oneDayBeforeDate) = " + (taskStart >= oneDayBeforeDate));
				console.log("isOneDayBefore  = "+ isOneDayBefore );
				*/
				if(taskStart > fairEndDate)
				{
					console.log("Adding to After Your Fair");
					theView = this.AfterYourFairView;					
				}
				else if(isThreeFourWeeksBefore)
				{
					console.log("Adding to 3 - 4 Weeks Before");
					theView = this.ThreeToFourWeeksBeforeView;
				}
				else if(isOneTwoWeeksBefore)
				{
					console.log("Adding to 1 - 2 Weeks Before");
					theView = this.OneToTwoWeeksBeforeView;
				}
				else if( isTwoMonthsBefore )
				{
					console.log("Adding to 2 Months Before");
					theView = this.TwoMonthsBeforeView;
				}
				else if( isOneDayBefore )
				{
					console.log("Adding to One Day Before");
					theView = this.OneDayBeforeView;
				}
				else if( isDuringFair )
				{
					console.log("Adding to During Fair");
					theView = this.DuringFairView;
				}
				if(theView!=null)
				{
					theView.addTaskEvent(task)
				}
				else
				{
					console.log("Task Not in any modules!");
				}
																	
				if( !isComplete && isPastDate )
				{
					console.log("Adding to Past Due Tasks");
					this.PastDueTasksView.addTaskEvent(this.collection.at(i));
				}
			}
			
		}
		
		}); // end AppView

		App = new AppView();	  	
		App.render();
				 		 
	}
	
	
} // end CAL400_CONTENT