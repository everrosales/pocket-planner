// equality helper for handlebars
Handlebars.registerHelper('equal', function(lvalue, rvalue, options) {
    if (arguments.length < 3)
        throw new Error("Handlebars Helper equal needs 2 parameters");
    if( lvalue!=rvalue ) {
        return options.inverse(this);
    } else {
        return options.fn(this);
    }
});

Handlebars.registerPartial('header', Handlebars.templates.header);
currentUser = undefined;

var loadPage = function(template, data) {
    data = data || {};
    $('#main-container').html(Handlebars.templates[template](data));
};

var loadRsvpPage = function() {
  var event_id = window.location.pathname.split('/')[2];
  $.get('/events/' + event_id + '/details').done(function(response) {
    console.log('success!');
    var evt = response.content.event;
    evt.start = new Date(evt.start);
    evt.start_time = evt.start.toLocaleTimeString();
    var tmp_time = evt.start_time.split(' ');
    var am_pm = tmp_time[1];
    tmp_time = evt.start_time.split(':');
    evt.start_time = tmp_time.slice(0,2).join(':') +' '+ am_pm;
    evt.start = evt.start.toLocaleDateString();

    evt.end = new Date(evt.end);
    evt.end_time = evt.end.toLocaleTimeString();
    tmp_time = evt.end_time.split(' ');
    am_pm = tmp_time[1];
    tmp_time = evt.end_time.split(':');
    evt.end_time = tmp_time.slice(0,2).join(':') +' '+ am_pm;
    evt.end = evt.end.toLocaleDateString();
    //console.log(evt.end.toLocaleDateString());

    if (currentUser) {
      evt[currentUser] = currentUser;
    }
    loadPage('rsvp', evt);
  }).fail(function(responseObject) {
    var response = $.parseJSON(responseObject.responseText);
    console.log(response);
    Materialize.toast(response.err, 4000);
  });
}

$(document).on("click",".rsvp-attend", function(e){
  e.preventDefault();
  var attending = true;
  if ($(this).attr("value") === 0){
    attending = false;
  }
  var event_id = $(this).attr("eventId");
  var attendeeForm = $('#attendee-status')[0];
  var email = attendeeForm.email.value;
  var name = attendeeForm.name.value;
  var comments = attendeeForm.note.value;
  if (!comments){
    comments = "";
  }

  $.post("/events/" + event_id + "/attend",  {
      email:email,
      name:name,
      attending:attending,
      note:comments
    }).done(function(response) {
      console.log('success!');
      Materialize.toast('You Registered for the event! Redirecting..' , 4000);
      window.setTimeout(function(){
        window.location.href="/";
      }, 1000);
    }).fail(function(responseObject) {
      console.log('oops');
      var response = $.parseJSON(responseObject.responseText);
      Materialize(response.err, 4000);
    });
});

$(document).on("click", "#home-link", function(evt){
  evt.preventDefault();
  window.location.href="/";
})

$(document).ready(function() {
  $.get('/users/current', function(response) {
    if (response.content.loggedIn) {
      currentUser = response.content.user;
    }
    loadRsvpPage();
  })
})
