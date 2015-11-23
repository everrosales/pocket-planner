(function() {

  $(document).on("click",".rsvp-attend", function(e){
    e.preventDefault();
    var attending = true;
    if ($(this).attr("value") === 0){
      attending = false;
    }
    var event_id = $(this).attr("eventId");
    var email = document.forms[0].email.value;
    var name = document.forms[0].name.value;
    var comments = document.forms[0].note.value;
    if (!comments){
      comments = "";
    }

    $.post("/attend/" + event_id, {email:email, name:name, attending:attending, note:comments})

    window.setTimeout(function(){
      window.location.href="/";
    }, 200);
  });
  $(document).on("click", "#home-link", function(evt){
    evt.preventDefault();
    window.location.href="/";
  })
})();
