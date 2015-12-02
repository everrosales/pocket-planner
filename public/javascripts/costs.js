(function(){
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

  $(document).on("click", "#add-cost", function(){
    $("#add-cost").hide();
    $("#add-cost-form").show();
  });

  $(document).on("click", "#cancel-cost", function(){
    event_id = $(this).parent().attr("eventId");
    window.location.href = "#event-costs";
    loadTodosPage(event_id);
  });

  $(document).on("click", "#submit-cost", function(){
    event_id = $(this).parent().attr("eventId");
    var name = $("#cost-name").val();
    var amount = $("#cost-amount").val();
    var desc = $("#cost-desc").val();
    $.post("/events/"+event_id+"/costs", {name:name , amount:amount, description:desc}).done(function(response){
      window.location.href = "#event-costs";
      loadTodosPage(event_id);
    }).fail(function(responseObject){
      console.log(responseObject);
      var response = $.parseJSON(responseObject.responseText);
      // $("#add-cost-form").find(".error").text(response.err);
      Materialize.toast(response.err, 2000);
    });
  });
})();
