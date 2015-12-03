(function () {
  var event_id = undefined;

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
      min: new Date()
    });
  });


  //Submit Add todo form.
  $(document).on('click', '#add-todo', function(){
    var categoryId = $(this).parent().parent().parent().attr('categoryId');
    event_id = $('#event-panel').attr("eventId");
    // var error_div = $(this).parent().find('.error');
    var form = $(this).parent();
    var todo_name = form.find('.todo-name').val();
    var deadline = (form.find('.deadline').val());
    console.log(deadline);
    var priority = form.find(".priority").val();

    //check that it has name and deadline
    if (todo_name.length < 1 || !deadline){

      Materialize.toast('Todo must have a name and deadline.', 2000);


    }else{
      deadline = new Date(deadline);
      info = {name: todo_name, deadline:deadline};

      //check that priority is correct range if applicable.
      if(priority && (priority <= 0 || priority > 10)){
        Materialize.toast("Todo priority must be a number between 1 and 10.", 2000);

      }else{
        if(priority){
          info.priority = priority;
        }
        $.post('events/'+event_id+'/categories/'+categoryId+'/todos', info).done(function(response){
          loadTodosPage(event_id);
        }).fail(function(responseObject){
          console.log(responseObject);
          var response = $.parseJSON(responseObject.responseText);
          Materialize.toast(response.err, 2000);
          // error_div.text(response.err);
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

    edit_form.find(".edit-todo-deadline").pickadate({
      min: new Date(),
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year
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
    console.log(todo_priority);

    if (!todo_name || !todo_deadline){
      Materialize.toast("Todo must have a name and deadline.", 2000)
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
          console.log("failed");
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
        console.log("success");
      }).fail(function(responseObject){
        console.log("failed");
        var response = $.parseJSON(responseObject.responseText);
        Materialize.toast(response.err, 2000);
      });
    }else{
      $.ajax({
        url: "/events/"+event_id+"/categories/"+cat_id+"/todos/"+todo_id,
        type: 'PUT',
        data: {status: 'uncheck'}
      }).done(function(response){
        console.log("success");
      }).fail(function(responseObject){
        console.log("failed");
        var response = $.parseJSON(responseObject.responseText);
        Materialize.toast(response.err, 2000);
      });
    }
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
    console.log($('#start-date').text());
    var start_date = ($('#start-date').text());
    var end_date = ($('#end-date').text());

    $("#event_editable").hide();
    $("#event-edit-form").show();
    $("#edit-start-date").pickadate({
      min: new Date(),
      max: $('#edit-end-date').val() || new Date(8640000000000000),
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year
      onClose: function(){
        $('#edit-end-date').pickadate('picker').set('min', $('#edit-start-date').val());
      }
    });

    $('#edit-end-date').pickadate({
      selectMonths: true,
      selectYears: 15,
      /*onSet: function(){
        $('#start_date').pickadate.set('max', $(this).val());
      }*/
      min: $('#edit-start-date').val() || new Date(),
      onClose: function(){
        $('#edit-start-date').pickadate('picker').set('max', $('#edit-end-date').val());
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
    console.log($("#event_name_edit").val());

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

    var location = $("#edit-event-loc").val();
    var budget = $("#edit-event-budget").val();

    var desc = $("#edit-event-desc").val();

    var info = {name:name, start:start_date, end:end_date, location:location, budget:budget, description: desc};
    console.log(info);

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
})();
