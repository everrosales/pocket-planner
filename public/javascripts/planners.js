(function(){

  /*
  * Planner UI functions.
  *   -Remove a Planner
  *   -Open form to add a Planner
  *   -Cancel adding Planner
  *   -Submit form to add Planner
  */

  //Remove planner when clicking the "remove" button next to the planner name.
  $(document).on("click", ".remove-planner", function(){
    event_id = $('#event-panel').attr("eventId");
    var planner_id = $(this).parent().parent().parent().attr("plannerId");
    console.log(planner_id);
    $.ajax({
      url: 'events/'+event_id+'/planners/'+planner_id,
      type: 'DELETE'
    }).done(function(response){
      window.location.href = "#event-planners";
      loadTodosPage(event_id);
    }).fail(function(responseObject){
      console.log("failed");
      var response = $.parseJSON(responseObject.responseText);
      Materialize.toast(response.err, 2000);
    });
  });

  //Open form to add planner.
  $(document).on("click", "#add-planner", function(){
    $("#add-planner").hide();
    $("#add-planner-form").show();
  });

  //Cancel adding planner.
  $(document).on("click", "#cancel-planner", function(){
    event_id = $("#event-panel").attr("eventId");
    window.location.href = "#event-planners";
    loadTodosPage(event_id);
  });

  //Submit add planner form.
  $(document).on("click", "#submit-planner", function(){
    event_id = $("#event-panel").attr("eventId");
    var email = $("#planner-email").val();
    $.post("/events/"+event_id+"/planners", {planner_email:email}).done(function(response){
      window.location.href = "#event-planners";
      loadTodosPage(event_id);
    }).fail(function(responseObject){
      console.log(responseObject);
      var response = $.parseJSON(responseObject.responseText);
      console.log(response);
      if (response.err.msg) {
        response.err = response.err.msg;
      }
      Materialize.toast(response.err, 2000);
    });
  });

})();
