(function(){

  /*
  Cost UI functions.
    -Open add cost form
    -Cancel adding Cost
    -Submit Cost
    -Remove Cost
  */

  //Remove cost when clicking the remove button next to the cost.
  $(document).on("click", ".remove-cost", function(){
    event_id = $("#event-panel").attr("eventId");
    var cost_id = $(this).parent().parent().parent().attr("costId");
    $.ajax({
      url: 'events/'+event_id+'/costs/'+cost_id,
      type: 'DELETE'
    }).done(function(response){
      window.location.href = "#event-costs";
      loadTodosPage(event_id);
    }).fail(function(responseObject){
      console.log("failed");
      var response = $.parseJSON(responseObject.responseText);
      Materialize.toast(response.err, 2000);
    });
  });

  //open form to add cost.
  $(document).on("click", "#add-cost", function(){
    $("#add-cost").hide();
    $("#add-cost-form").show();
  });

  //Cancel adding cost.
  $(document).on("click", "#cancel-cost", function(){
    event_id = $("#event-panel").attr("eventId");
    window.location.href = "#event-costs";
    loadTodosPage(event_id);
  });

  //Submit add cost form.
  $(document).on("click", "#submit-cost", function(){
    event_id = $("#event-panel").attr("eventId");
    var name = $("#cost-name").val();
    var amount = $("#cost-amount").val();
    if (amount < 0) {
      Materialize.toast("Cost amount must be positive.", 2000);
      return;
    }
    var desc = $("#cost-desc").val();
    $.post("/events/"+event_id+"/costs", {name:name , amount:amount, description:desc}).done(function(response){
      window.location.href = "#event-costs";
      loadTodosPage(event_id);
    }).fail(function(responseObject){
      console.log(responseObject);
      var response = $.parseJSON(responseObject.responseText);
      Materialize.toast(response.err, 2000);
    });
  });
})();
