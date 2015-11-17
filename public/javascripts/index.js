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

var loadEventsPage = function() {
    //get request for events. replace my_events with results
    //
    $.get('/events', function(response){
      console.log(response.content);
      results = [];
      response.content.forEach(function(e){
        results.push(e);
      });
      results.forEach(function(r){
        console.log(r.date);
        r.date = new Date(r.date);
        r.time = r.date.toLocaleTimeString();
        var tmp_time = r.time.split(' ');
        var am_pm = tmp_time[1];
        tmp_time = r.time.split(':');
        r.time = tmp_time.slice(0,2).join(':') +' '+ am_pm;
        r.date = r.date.toLocaleDateString();

      })
      loadPage('events', {
        my_events: response.content,
        title: "Your Events"

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



$(document).on('click', '#new_todo', function() {
  $('#new_todo').remove();
  var htmlStr = "<div class='column' id='new-todo-container'><div class='event'><input type='text' placeholder='To-Do List Title'><br><div class='btn btn-default' id='add-todo-button'>Add To-Do List</div><div class='btn btn-default' id='cancel-todo-button'>Cancel</div></div>";
  $(htmlStr).appendTo('#category-container');
});



$(document).on('click', '#cancel-todo-button', function(){
  $('#new-todo-container').remove();
  var htmlStr = '<div class="column btn btn-default" id="new_todo"><p>+ Add a new To-Do list</p></div>';
  $(htmlStr).appendTo('#category-container');
});

$(document).on('click', '.event-container', function(){
  //go to edit that event
  //get that event's info. for now, populated with dummy data.
  //make requests for each of the Todos
  //use date.toLocaleDateString() to get the string date
  console.log("clicked");
  var dummyDate = new Date();
  var dummyStrDate = dummyDate.toLocaleDateString();
  loadPage('todos', {
    name: "Birthday party",
    description: "it's gonna be awesome!",
    location: "3 Ames St",
    categories: [
      {
        name: "Food",
        todos: [
          {
            name: "Get cake",
            deadline: dummyStrDate,
            priority: 3
          },
          {
            name: "Decide on pizza or pasta",
            deadline: dummyStrDate,
            priority: 1
          }
        ]

      }
    ]
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
