(function(){

  /*
  * Invitee UI functions.
  *   -Open form to add a Invitee
  *   -Cancel adding Invitee
  *   -Submit form to add Invitee
  */

  //Open form to add planner.
  $(document).on("click", "#add-invitee", function(){
    $("#add-invitee").hide();
    $("#add-invitee-form").show();
  });

  //Cancel adding planner.
  $(document).on("click", "#cancel-invitee", function(){
    event_id = $("#event-panel").attr("eventId");
    window.location.href = "#event-attendees";
    loadTodosPage(event_id);
  });

  //Submit add invitee form.
  $(document).on("click", "#submit-invitee", function(){
    event_id = $("#event-panel").attr("eventId");
    var email = $("#invitee-email").val();
    if (!email) {
      Materialize.toast("You must enter an email.", 2000);
      return;
    } else if (!validator.isEmail(email)) {
      Materialize.toast("That is not an email address.", 2000);
      return;
    } else if (email != $("#invitee-email-confirm").val()) {
      Materialize.toast("Emails must match.", 2000);
      return;
    }
    $.post("/events/"+event_id+"/invite", {attendee:email}).done(function(response){
      window.location.href = "#event-attendees";
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
