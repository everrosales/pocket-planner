(function(){
  $(document).on("click", ".remove-planner", function(){
    event_id = $('#event-panel').attr("eventId");
    var planner_id = $(this).parent().parent().attr("plannerId");
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

  $(document).on("click", "#add-planner", function(){
    $("#add-planner").hide();
    $("#add-planner-form").show();
  });

  $(document).on("click", "#cancel-planner", function(){
    event_id = $("#event-panel").attr("eventId");
    window.location.href = "#event-planners";
    loadTodosPage(event_id);
  });

  $(document).on("click", "#submit-planner", function(){
    event_id = $("#event-panel").attr("eventId");
    var email = $("#planner-email").val();
    $.post("/events/"+event_id+"/planners", {planner_email:email}).done(function(response){
      window.location.href = "#event-planners";
      loadTodosPage(event_id);
    }).fail(function(responseObject){
      console.log(responseObject);
      var response = $.parseJSON(responseObject.responseText);
      // $("#add-planner-form").find(".error").text(response.err)
      console.log(response);
      Materialize.toast(response.err, 2000);
    });
  });

})();
