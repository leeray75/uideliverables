$(function() {

	if($('#CONTENT-GOL1000').exists())
	{		
		GOL100_CONTENT.init();
	}
	
	
});
var GOL100_CONTENT =
{
	ContentID: '#CONTENT-GOL100',
	init: function()
	{
		this.initShare();
		this.initGoalInputFields();
	},
	initGoalInputFields: function()
	{
		var thisObj = this;
		$('#GoalDollarsInput').attr('maxlength',7);			
		$('#GoalDollarsInput').maskMoney({thousands: ',', allowZero: true,precision: 0});		
		$('#GoalQuantityInput').attr('maxlength',7);
		$('#GoalQuantityInput').maskMoney({thousands: ',', allowZero: true,precision: 0});					

	},
	initShare: function()
	{
		var thisObj = this;
		 $(".share label input[type=radio]").attr("disabled", "disabled");
		 $(thisObj.ContentID).on('click',".share label input[type=checkbox]",function(event){
			 if ($(".share label input[type=radio]:disabled").length > 0){
				 $(".share label input[type=radio]").removeAttr("disabled");
			 } else if (!$(this).is(":checked")){
				 $(".share label input[type=radio]").attr("disabled", "disabled");
			 }
		});
		$(thisObj.ContentID).on('click',".details .first input[type=radio]",function(event){
			 $(".details tr.highlight").removeClass("highlight");
			 $(this).parents("tr").addClass("highlight");
		 });
		 $(".details .first input[type=radio]:checked").parents("tr").addClass("highlight");
		 $(".details td input[type=text]").focus(function(){
			 $(this).parent().siblings(".first").find("input[type=radio]").trigger("click");
		 });		
	}
} //GOL100_CONTENT