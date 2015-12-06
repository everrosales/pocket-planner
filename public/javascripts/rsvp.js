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
    evt = response.content.event;
    loadPage('rsvp', evt);
  }).fail(function(responseObject) {
    console.log(responseObject);
    var response = $.parseJSON(responseObject.responseText);
    console.log(response);
    Materialize.toast(response.err, 4000);
  });
}

$(document).on("click",".rsvp-attend", function(e){
  e.preventDefault();
  var attending = true;
  if ($(this).val() == 0){
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

  if (!email || !name) {
    Materialize.toast("You must enter a name and an email.", 2000);
    return;
  } else if (!validator.isEmail(email)) {
    Materialize.toast("That is not an email address.", 2000);
    return;
  } else if (name.length > 100) {
    Materialize.toast("Your name can be at most 100 characters long.", 2000);
    return;
  } else if (comments.length > 100) {
    Materialize.toast("Your comments can be at most 300 characters long.", 2000);
    return;
  }
  $.post("/events/" + event_id + "/attend",  {
      email:email,
      name:name,
      attending:attending,
      note:comments
    }).done(function(response) {
      console.log('success!');
      Materialize.toast('You registered for the event! Redirecting..' , 4000);
      window.setTimeout(function(){
        window.location.href="/";
      }, 1000);
    }).fail(function(responseObject) {
      console.log('oops');
      var response = $.parseJSON(responseObject.responseText);
      Materialize.toast(response.err, 4000);
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
  });
});

$(document).on('click', '#signin-btn', function(evt) {
    $('#login-modal').openModal();
});

$(document).on('click', '#register-btn', function(evt) {
    $('#signup-modal').openModal();
});
