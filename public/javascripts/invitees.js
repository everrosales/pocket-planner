(function(){

  /*
  * Invitee UI functions.
  *   -Open form to add a Invitee
  *   -Cancel adding Invitee
  *   -Submit form to add Invitee
  */

  //remove invitee
  $(document).on("click", ".remove-invitee", function(){
    event_id = $('#event-panel').attr("eventId");
    var invitee_id = $(this).parent().parent().parent().attr("inviteeid");
    $.ajax({
      url: 'events/'+event_id+'/invitees/'+invitee_id,
      type: 'DELETE'
    }).done(function(response){
      window.location.href = "#event-attendees";
      loadTodosPage(event_id);
    }).fail(function(responseObject){
      var response = $.parseJSON(responseObject.responseText);
      Materialize.toast(response.err, 2000);
    });
  });

  //Open form to add invitee.
  $(document).on("click", "#add-invitee", function(){
    $("#add-invitee").hide();
    $("#add-invitee-form").show();
  });

  //Cancel adding invitee.
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
    $.post("/events/"+event_id+"/invitees", {attendee:email}).done(function(response){
      window.location.href = "#event-attendees";
      loadTodosPage(event_id);
    }).fail(function(responseObject){
      var response = $.parseJSON(responseObject.responseText);
      if (response.err.msg) {
        response.err = response.err.msg;
      }
      Materialize.toast(response.err, 2000);
    });
  });

})();
