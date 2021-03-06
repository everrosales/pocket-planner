(function () {
  var event_id;

  /*
  *Adding todos functions.
  * -Add todo form
  *     -opening form
  *     -canceling form
  *     -submitting form
  */

  //Open add todo form.
  $(document).on('click', '.add_todo', function() {

    var parent = $(this).parent();
    $(this).hide();

    parent.find(".new-todo-form").show();
    $('.deadline').pickadate({
      min: new Date(),
      onStart: function(){
        var event_start = new Date($("#edit-start-date").val());
        this.set('select', [event_start.getFullYear(), event_start.getMonth(), event_start.getDate()]);
      }
    });
  });


  //Submit Add todo form.
  $(document).on('click', '#add-todo', function(){
    var categoryId = $(this).parent().parent().parent().attr('categoryId');
    event_id = $('#event-panel').attr("eventId");
    var form = $(this).parent();
    var todo_name = form.find('.todo-name').val();
    var deadline = (form.find('.deadline').val());
    var priority = form.find(".priority").val();

    //check that it has name and deadline
    if (todo_name.length < 1 || !deadline) {
      Materialize.toast('To-Do must have a name and deadline.', 2000);
    } else if (todo_name.length > 100) {
      Materialize.toast('To-Do name can be at most 100 characters long.', 2000);

    } else {
      deadline = new Date(deadline);
      info = {name: todo_name, deadline:deadline};

      //check that priority is correct range if applicable.
      if(priority && (priority <= 0 || priority > 10)){
        Materialize.toast("To-Do priority must be a number between 1 and 10.", 2000);

      }else{
        if(priority){
          info.priority = priority;
        }
        $.post('events/'+event_id+'/categories/'+categoryId+'/todos', info).done(function(response){
          loadTodosPage(event_id);
        }).fail(function(responseObject){
          var response = $.parseJSON(responseObject.responseText);
          Materialize.toast(response.err, 2000);
        });
      }

    }
  });

  //Cancel add todo form.
  $(document).on('click', '#cancel-add-todo', function(){

    var container = $(this).parent();
    container.find(".todo-name").val("");
    container.find(".deadline").val("");
    container.find(".priority").val("");
    $(this).parent().hide(); //remove form
    $(this).parent().parent().find(".add_todo").show();
  });

/*
* Delete Todos functions.
*   -delete todo when clicking the "X" button next to the todo.
*/

  //Delete todo.
  $(document).on('click', '.delete-todo', function(){
    var todoId = $(this).parent().parent().attr('todoId');
    var categoryId = $(this).parent().parent().parent().parent().attr('categoryId');
    event_id = $('#event-panel').attr('eventId');
    $.ajax({
      url:'events/'+event_id+'/categories/'+categoryId+'/todos/'+todoId,
      type: 'DELETE'
    }).done(function(response){
      loadTodosPage(event_id);
    }).fail(function(responseObject) {
      var response = $.parseJSON(responseObject.responseText);
      Materialize.toast(response.err, 2000);
    });
  });

/*Edit Todos functions.
* -edit todo form
*     -opening form
*     -canceling
*     -submitting
*/

  //Open edit todo form.
  $(document).on("click", ".edit-todo", function(){
    $(this).parent().hide();
    var edit_form = $(this).parent().parent().find(".edit-todo-form");
    edit_form.show();
    $(this).parent().parent().parent().find(".add_todo").hide();

    var cur_deadline = new Date(edit_form.find(".edit-todo-deadline").val());
    edit_form.find(".edit-todo-deadline").pickadate({
      min: new Date(),
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year
      onStart: function(){
        this.set('select', [cur_deadline.getFullYear(), cur_deadline.getMonth(), cur_deadline.getDate()]);
      }
    });

  });

  //Cancel editing todo.
  $(document).on("click", ".cancel-edit-todo", function(){
    event_id = $("#event-panel").attr("eventId");
    loadTodosPage(event_id);
  });

  //Submit edit todo form.
  $(document).on("click", ".submit-edit-todo", function(){

    //get all info for request.
    event_id = $("#event-panel").attr("eventId");
    var cat_id = $(this).parent().parent().parent().parent().attr("categoryId");

    var todo_id = $(this).parent().parent().attr("todoId");

    var edit_form = $(this).parent();
    var todo_name = edit_form.find(".edit-todo-name").val();

    var todo_deadline = new Date(edit_form.find(".edit-todo-deadline").val());

    var todo_priority = edit_form.find(".edit-todo-priority").val();

    if (todo_name.length < 1 || !deadline) {
      Materialize.toast('To-Do must have a name and deadline.', 2000);
    } else if (todo_name.length > 100) {
      Materialize.toast('To-Do name can be at most 100 characters long.', 2000);

    }else{
      var info = {name: todo_name, deadline: todo_deadline};

      if(todo_priority && (todo_priority < 1 || todo_priority > 10)){
        Materialize.toast("Priority must be between 1 and 10.", 2000);
      }else{
        //add priority if applicable.
        if(todo_priority){
          info.priority = todo_priority;
        }

        $.ajax({
          url: "/events/"+event_id+"/categories/"+cat_id+"/todos/"+todo_id,
          type: 'PUT',
          data: {status: 'edit', information: info}
        }).done(function(response){
          loadTodosPage(event_id);
        }).fail(function(responseObject){
          var response = $.parseJSON(responseObject.responseText);
          Materialize.toast(response.err, 2000);
        });
      }

    }

  });

  /* Modifying Todos functions.
  *     -checking/unchecking Todos
  *     -editing Todos
  */

  //Checking/unchecking todo
  $(document).on("change", ".check-todo", function(){
    //get info for request.
    event_id = $("#event-panel").attr("eventId");
    var cat_id=$(this).parent().parent().parent().parent().parent().attr("categoryId");
    var todo_id = $(this).attr("todoId");
    var checked = $(this).is(":checked");

    if(checked){
      $.ajax({
        url: "/events/"+event_id+"/categories/"+cat_id+"/todos/"+todo_id,
        type: 'PUT',
        data: {status: 'check'}
      }).done(function(response){
      }).fail(function(responseObject){
        var response = $.parseJSON(responseObject.responseText);
        Materialize.toast(response.err, 2000);
      });
    }else{
      $.ajax({
        url: "/events/"+event_id+"/categories/"+cat_id+"/todos/"+todo_id,
        type: 'PUT',
        data: {status: 'uncheck'}
      }).done(function(response){
      }).fail(function(responseObject){
        var response = $.parseJSON(responseObject.responseText);
        Materialize.toast(response.err, 2000);
      });
    }
  });

  //open assign todo form
  $(document).on("click", ".assign-person", function() {
    $(this).hide();
    var edit_form = $(this).parent().parent().find(".add-assignee-form");
    edit_form.show();
  });

  //submit assign todo form
  $(document).on("click", ".submit-add-assignee", function() {
    event_id = $("#event-panel").attr("eventId");
    var cat_id = $(this).parent().parent().parent().parent().attr("categoryId");

    var todo_id = $(this).parent().parent().attr("todoId");

    var edit_form = $(this).parent();
    var assignee_email = edit_form.find(".add-assignee-email").val();
    if (!assignee_email) {
      Materialize.toast("Must enter assignee's email", 2000);
      return;
    }
    $.ajax({
      url: "/events/"+event_id+"/categories/"+cat_id+"/todos/"+todo_id,
      type: 'PUT',
      data: {status: "assign", assign: "assign", email: assignee_email}
    }).done(function(response){
      loadTodosPage(event_id);
    }).fail(function(responseObject){
      var response = $.parseJSON(responseObject.responseText);
      Materialize.toast(response.err.msg, 2000);
    });
  });

  //cancel assign todo form
  $(document).on("click", ".cancel-add-assignee", function() {
    event_id = $("#event-panel").attr("eventId");
    loadTodosPage(event_id);
  });

  //remove assignee
  $(document).on("click", ".delete-assignee", function() {
    event_id = $("#event-panel").attr("eventId");
    var cat_id = $(this).parent().parent().parent().parent().parent().attr("categoryId");
    var todo_id = $(this).parent().parent().parent().attr("todoId");

    $.ajax({
      url: "/events/"+event_id+"/categories/"+cat_id+"/todos/"+todo_id,
      type: 'PUT',
      data: {status:'assign', assign:"remove"}
    }).done(function(response) {
      loadTodosPage(event_id);
    }).fail(function(responseObject) {
      var response = $.parseJSON(responseObject.responseText);
      Materialize.toast(response.err.msg, 2000);
    });
  });
/*
* Event panel functions.
*   -Open form for editing all event info.
*   -Cancel editing
*   -Submit editing
*/

//Open edit event form.
  $(document).on('click', '#edit-event', function(){
    event_id = $('#event-panel').attr("eventId");
    var event_name = $('#event_name').text();
    var start_date = new Date($('#start-date').text());
    var end_date = new Date($('#end-date').text());

    $("#event_editable").hide();
    $("#event-edit-form").show();

    $("#edit-start-date").pickadate({
      min: new Date(),
      max: new Date($('#edit-end-date').val()) || new Date(8640000000000000),
      format:'mm/dd/yyyy',
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year
      onClose: function(){
        $('#edit-end-date').pickadate('picker').set('min', $('#edit-start-date').val());
      },
      onStart: function(){
        this.set('select', [start_date.getFullYear(), start_date.getMonth(), start_date.getDate()]);
      }
    });

    $('#edit-end-date').pickadate({
      selectMonths: true,
      selectYears: 15,
      format:'mm/dd/yyyy',
      /*onSet: function(){
        $('#start_date').pickadate.set('max', $(this).val());
      }*/
      min: new Date($('#edit-start-date').val()) || new Date(),
      onClose: function(){
        $('#edit-start-date').pickadate('picker').set('max', $('#edit-end-date').val());
      },
      onStart: function(){
        this.set('select', [end_date.getFullYear(), end_date.getMonth(), end_date.getDate()]);
      }
    });

  });

  //Cancel editing event.
  $(document).on('click', '#cancel-edit-event', function(){
    event_id = $("#event-panel").attr("eventId");
    window.location.href = "#";
    loadTodosPage(event_id);
  });

  //Submit edit event.
  $(document).on("click", "#submit-edit-event", function(){
    event_id = $("#event-panel").attr("eventId");
    var start_date = new Date($("#edit-start-date").val());
    var end_date = new Date($("#edit-end-date").val());

    var name = $("#event_name_edit").val();

    //parse out Dates
    var start_hr_min = ($('#edit-start-time').val()).split(':');
    var start_hour = parseInt(start_hr_min[0]);
    var start_min = parseInt(start_hr_min[1]);

    if (start_hour) {
      start_date.setHours(start_hour);
    }
    if (start_min) {
      start_date.setMinutes(start_min);
    }

    var end_hr_min = ($('#edit-end-time').val()).split(':');
    var end_hour = parseInt(end_hr_min[0]);
    var end_min = parseInt(end_hr_min[1]);
    if (end_hour) {
      end_date.setHours(end_hour);
    }
    if (end_min) {
      end_date.setMinutes(end_min);
    }
    if (end_date < start_date) {
      Materialize.toast("End date/time must be after Start date/time.", 2000);
      return;
    }

    var location = $("#edit-event-loc").val();
    var budget = $("#edit-event-budget").val();
    if (budget < 0) {
      Materialize.toast('Budget must be positive', 2000);
      return;
    }

    var desc = $("#edit-event-desc").val();
    var is_private = $("#edit-private")[0].checked;
    var info = {name:name, start:start_date, end:end_date, location:location, private:is_private, budget:budget, description: desc};

    $.ajax({
      url:"/events/"+event_id,
      type: 'PUT',
      data: {information: info}
    }).done(function(response){
      window.location.href = "#";
      loadTodosPage(event_id);
    }).fail(function(responseObject){
      Materialize.toast('Invalid input format', 2000);
    });
  });

  //Email functions

  //email invitees form
  $(document).on("click", "#email-invitees", function(){
    $("#email-form").show();
    $("#email-invitees").hide();
    $("#email-attendees").hide();

    $("#email-form-label").text("Email invitees");
  });

  //email attendees form
  $(document).on("click", "#email-attendees", function(){
    $("#email-form").show();
    $("#email-invitees").hide();
    $("#email-attendees").hide();

    $("#email-form-label").text("Email attendees");
  });

  //cancel emailing
  $(document).on("click", "#cancel-email-form", function(){
    event_id = $("#event-panel").attr("eventId");
    loadTodosPage(event_id);
  });

  //submit emailing form
  $(document).on("click", "#submit-email-form", function(){
    event_id = $("#event-panel").attr("eventId");
    var attendee = false;

    if ($("#email-form-label").text() == "Email attendees"){
      attendee = true;
    }

    var invitation = $("#email-invitation").is(":checked");

    var subject = $("#email-subject").val();
    var message = $("#email-message").val();

    $.post("/events/"+event_id+"/email", {message: message, subject: subject, invitation: invitation, attendee: attendee}).done(function(response){
      Materialize.toast("Emails sent!", 2000);
      loadTodosPage(event_id);
    }).fail(function(responseObject){
      var response = $.parseJSON(responseObject.responseText);
      Materialize.toast(response.err, 2000);
    });

  });
})();
