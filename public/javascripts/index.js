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
Handlebars.registerPartial('attendeventsummary', Handlebars.templates.attendeventsummary);
Handlebars.registerPartial('header', Handlebars.templates.header);
//global variable set when a user is logged in.
currentUser = undefined;

var loadPage = function(template, data) {
    data = data || {};
    $('#main-container').html(Handlebars.templates[template](data));
};

var loadHomePage = function() {
    if (currentUser){
      loadPage('index', {currentUser: currentUser});
    }else{
      loadPage('index');
    }
};


var zero_pad = function(str){
  if(str.length < 2){
    return "0" + str;
  }else{
    return str;
  }
};

var loadTodosPage = function(event_id) {

  $.get('/events/' + event_id).done(function(response) {

    response.content.event.start = new Date(response.content.event.start);
    response.content.event.end = new Date(response.content.event.end);
    response.content.event.start_time_24 = zero_pad(response.content.event.start.getHours().toString()) + ":" + zero_pad(response.content.event.start.getMinutes().toString());
    response.content.event.end_time_24 = zero_pad(response.content.event.end.getHours().toString()) + ":" + zero_pad(response.content.event.end.getMinutes().toString());


    response.content.event.start_time = response.content.event.start.toLocaleTimeString();
    var tmp_time = response.content.event.start_time.split(' ');
    var am_pm = tmp_time[1];
    tmp_time = response.content.event.start_time.split(':');
    response.content.event.start_time = tmp_time.slice(0,2).join(':') +' '+ am_pm;
    response.content.event.start = response.content.event.start.toLocaleDateString();


    response.content.event.end_time = response.content.event.end.toLocaleTimeString();
    tmp_time = response.content.event.end_time.split(' ');
    am_pm = tmp_time[1];
    tmp_time = response.content.event.end_time.split(':');
    response.content.event.end_time = tmp_time.slice(0,2).join(':') +' '+ am_pm;


    response.content.event.end = response.content.event.end.toLocaleDateString();
    response.content.event.categories.forEach(function(category){
      category.todos.forEach(function(todo){
        todo.deadline = new Date(todo.deadline);
        todo.deadline = todo.deadline.toLocaleDateString();
      });
    });
    response.content.event.categories.forEach(function(category) {
      category.todos.sort(function(todo1, todo2) {
        if (todo1.name < todo2.name) {
          return -1;
        } else {
          return 1;
        }
      });
      category.todos.sort(function(todo1, todo2) {
        if (response.content.currentUser == todo1.assignee) {
          if (response.content.currentUser == todo2.assignee) {
            return todo2.priority - todo1.priority; //highest priority (10) to no priority (0)
          } else {
            return -1; //todo1 assigned to me so higher than todo2
          }
        } else {
          if (response.content.currentUser == todo2.assignee) {
            return 1; //todo2 assigned to me so higher than todo1
          } else {
            return todo2.priority - todo1.priority;
          }
        }
      });
    });

    response.content.event.planners = response.content.planners;
    response.content.event.planners.sort(function(email1, email2) {
      if (email1 < email2) {
        return -1;
      } else {
        return 1;
      }
    });

    response.content.event.attendees.sort(function(attendee1, attendee2) {
      if (attendee1.attending == 1) {
        if (attendee2.attending == 1) {
          if (attendee1.email < attendee2.email) {
            return -1;
          } else {
            return 1;
          }
        } else {
          return -1; //attending go on top so attendee1 is first
        }
      } else if (attendee1.attending === 0) {
        if (attendee2.attending == 1) {
          return 1;
        } else if (attendee2.attending === 0) {
          if (attendee1.email < attendee2.email) {
            return -1;
          } else {
            return 1;
          }
        } else {
          return -1; //attendee2 not attending so attendee1 comes first
        }
      } else { //attendee1 not attending
        if (attendee2.attending == 2) {
          if (attendee1.email < attendee2.email) {
            return -1;
          } else {
            return 1;
          }
        } else { //attendee2 either attending or invited so comes first
          return 1;
        }
      }
    });

    response.content.event.freeBudget = response.content.freeBudget;

    response.content.event.attending = response.content.event.attendees.filter(function(e){
      return e.attending == 1;
    });
    loadPage('todos', {event: response.content.event, title:"Your Todos for " + response.content.event.name, currentUser: currentUser, page:"todos"});
  }).fail(function(responseObject){
    var response = $.parseJSON(responseObject.responseText);
    Materialize.toast(response.err, 4000);
  });
};

var loadEventsPage = function() {
    //get request for events. replace my_events with results
    if (currentUser){
      $.get('/events', function(response){
        results = [];
        response.content.forEach(function(e){
          results.push(e);
        });
        results.forEach(function(r){
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

          if (r.hostEmail == currentUser) {
            r.is_mine = true;
          } else {
            r.is_mine = false;
          }
        });
        loadPage('events', {
          my_events: response.content,
          title: "Your Events",
          currentUser: currentUser

        });
      });
    } else{
      $('#login-modal').openModal();
    }


};

var loadAttendEvents = function() {
  //get request for events. replace my_events with results
  //
  $.get('/events/public', function(response){
    results = [];
    response.content.forEach(function(e){
      results.push(e);
    });
    results.forEach(function(r){
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


    });
    loadPage('attendfeed', {
      my_events: results,
      title: "Current Events",
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

$(document).on('click', '#organize-events', function(){
  loadEventsPage();
});
$(document).on('click', '#home-link', function(evt) {

    loadHomePage();
});

$(document).on('click', '#signin-btn', function(evt) {
    $('#login-modal').openModal();
});

$(document).on('click', '#register-btn', function(evt) {
    $('#signup-modal').openModal();
});

$(document).on('click', '#attend-events', function(evt) {
  loadAttendEvents();
});

$(document).on('click', '#home-page-link', function(){
  loadHomePage();
});

$(document).on('click', '#events-page-link', function(){
  loadEventsPage();
});
