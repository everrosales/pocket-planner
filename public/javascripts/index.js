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

//register partial
Handlebars.registerPartial('event', Handlebars.templates.event);
Handlebars.registerPartial('todo', Handlebars.templates.todo);
Handlebars.registerPartial('header', Handlebars.templates.header);
Handlebars.registerPartial('subscribe', Handlebars.templates.subscribe);
//global variable set when a user is logged in. - unsafe should replace!
currentUser = undefined;

var loadPage = function(template, data) {
    data = data || {};
    $('#main-container').html(Handlebars.templates[template](data));
};

var loadHomePage = function() {
    if (currentUser) {
        loadEventsPage();
    } else {
        loadPage('index');
    }
};

var loadTodosPage = function(event_id) {

  $.get('/events/' + event_id).done(function(response){
    console.log(response.content);
    response.content.categories.forEach(function(c){
      c.todos.forEach(function(t){
        t.deadline = new Date(t.deadline);
        t.deadline = t.deadline.toLocaleDateString();
      })
    })
    loadPage('todos', {event: response.content, title:"Your Todos for " + response.content.name, currentUser: currentUser});
  }).fail(function(responseObject){
    console.log("failed");
  });
}
var loadEventsPage = function() {
    //get request for events. replace my_events with results
    //
    $.get('/events', function(response){
      results = [];
      response.content.forEach(function(e){
        results.push(e);
      });
      results.forEach(function(r){
        //console.log(r.date);
        r.start = new Date(r.start);
        r.start_time = r.start.toLocaleTimeString();
        var tmp_time = r.start_time.split(' ');
        var am_pm = tmp_time[1];
        tmp_time = r.start_time.split(':');
        r.start_time = tmp_time.slice(0,2).join(':') +' '+ am_pm;
        r.start = r.start.toLocaleDateString();

        r.end = new Date(r.end);
        r.end_time = r.end.toLocaleTimeString();
        tmp_time = r.end_time.split(' ');
        am_pm = tmp_time[1];
        tmp_time = r.end_time.split(':');
        r.end_time = tmp_time.slice(0,2).join(':') +' '+ am_pm;
        r.end = r.end.toLocaleDateString();

      })
      loadPage('events', {
        my_events: response.content,
        title: "Your Events",
        currentUser: currentUser

      });
    });

};

$(document).ready(function() {
    $.get('/users/current', function(response) {
        if (response.content.loggedIn) {
            currentUser = response.content.user;
        }
        loadHomePage();
    });

});


$(document).on('click', '#home-link', function(evt) {
    evt.preventDefault();
    loadHomePage();
});

$(document).on('click', '#signin-btn', function(evt) {
    loadPage('signin');
});

$(document).on('click', '#register-btn', function(evt) {
    loadPage('register');
});
