(function () {
  var event_id = undefined;

  $(document).on("click", ".remove-cost", function(){
    event_id = $(this).parent().parent().parent().parent().attr("eventId");
    var cost_id = $(this).parent().parent().attr("costId");
    $.ajax({
      url: 'events/'+event_id+'/costs/'+cost_id,
      type: 'DELETE'
    }).done(function(response){
      loadTodosPage(event_id);
    }).fail(function(responseObject){
      console.log("failed");
    })
  });

  $(document).on("change", ".check-todo", function(){
    event_id = $(this).parent().parent().parent().parent().attr("eventId");
    var cat_id=$(this).parent().parent().parent().attr("categoryId");
    var todo_id = $(this).attr("todoId");
    var checked = $(this).is(":checked");
    console.log(checked);
    if(checked){
      $.ajax({
        url: "/events/"+event_id+"/categories/"+cat_id+"/todos/"+todo_id,
        type: 'PUT',
        data: {status: 'check'}
      }).done(function(response){
        console.log("success");
      }).fail(function(responseObject){
        console.log("failed");
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
      });
    }
  });

  $(document).on("click", "#add-cost", function(){
    $("#add-cost").hide();
    $("#add-cost-form").show();
  });

  $(document).on("click", "#cancel-cost", function(){
    event_id = $(this).parent().attr("eventId");
    loadTodosPage(event_id);
  });

  $(document).on("click", "#submit-cost", function(){
    event_id = $(this).parent().attr("eventId");
    var name = $("#cost-name").val();
    var amount = $("#cost-amount").val();
    var desc = $("#cost-desc").val()
    $.post("/events/"+event_id+"/costs", {name:name , amount:amount, description:desc}).done(function(response){
      loadTodosPage(event_id);
    }).fail(function(responseObject){
      console.log(responseObject);
      var response = $.parseJSON(responseObject.responseText).err;
      $("#add-cost-form").find(".error").text(response);
    })
  });


  $(document).on('click', '#edit-event', function(){
    event_id = $(this).parent().parent().attr("eventId");
    var event_name = $('#event_name').text();
    console.log($('#start-date').text());
    var start_date = ($('#start-date').text());
    var end_date = ($('#end-date').text());


    //console.log(event_name);
    $("#event_editable").hide();
    $("#event-edit-form").show();
    $("#edit-start-date").datepicker();
    $("#edit-start-date").datepicker("setDate", start_date);
    $("#edit-end-date").datepicker();
    $("#edit-end-date").datepicker("setDate", end_date);

  });

  $(document).on('click', '#cancel-edit-event', function(){
    event_id = $(this).parent().parent().attr("eventId");
    loadTodosPage(event_id);
  });

  //when press cancel, loadTodosPage

  $(document).on('click', '#new_category', function() {
    $('#new_category').remove();
    var htmlStr = "<div class='column' id='new-category-container'><div class='event'><div class='error'></div><input id='category-title' type='text' placeholder='To-Do List Title'><br><div class='btn btn-default' id='add-category-button'>Add To-Do List</div><div class='btn btn-default' id='cancel-category-button'>Cancel</div></div>";
    $(htmlStr).appendTo('#category-container');
  });

  $(document).on('click', '#new_planner', function() {
    $('#new_planner').remove();
    var htmlStr = "<div class='column' id='new-planner-container'><div class='event'><div class='error'></div><input id='planner-email' type='text' placeholder='Email of new planner'><br><div class='btn btn-default' id='add-planner-button'>Add Planner</div><div class='btn btn-default' id='cancel-planner-button'>Cancel</div></div>";
    $(htmlStr).appendTo('#category-container');
  });

  $(document).on("click", "#submit-edit-event", function(){
    event_id = $(this).parent().parent().attr("eventId");
    var start_date = $("#edit-start-date").datepicker("getDate");
    var end_date = $("#edit-end-date").datepicker("getDate");

    var name = $("#event_name_edit").text();
    console.log($("#event_name_edit").text());

    var hr_min = ($('#start-time').val()).split(':');
    var hour = parseInt(hr_min[0]);
    var min = parseInt(hr_min[1]);
    if (hour) {
      start_date.setHours(parseInt(hr_min[0]));
    }
    if (min) {
      start_date.setMinutes(parseInt(hr_min[1]));
    }

    hr_min = ($('#end-time').val()).split(':');
    hour = parseInt(hr_min[0]);
    min = parseInt(hr_min[1]);
    if (hour) {
      end_date.setHours(parseInt(hr_min[0]));
    }
    if (min) {
      end_date.setMinutes(parseInt(hr_min[1]));
    }

    var location = $("#edit-event-loc").text();
    var budget = $("#edit-event-budget").text();

    var desc = $("#edit-event-desc").text();

    var info = {name:name, start:start_date, end:end_date, location:location, budget:budget, description: desc};
    console.log(info);

    $.ajax({
      url:"/events/"+event_id,
      type: 'PUT',
      data: {information: info}
    }).done(function(response){
      loadTodosPage(event_id);
    }).fail(function(responseObject){
      console.log("failed");
      $("#event_panel").find(".error").text("Invalid input format.");
    });
  })

  $(document).on('click', '.add_todo', function() {

    var parent = $(this).parent();
    $(this).remove();
    var htmlStr = "<div class='new-todo-form'><div class='error'></div><input type='text' id='todo-name' placeholder='Todo'><br><input type='text' placeholder='Deadline' id='deadline'><br><div class='btn btn-default' id='add-todo'>Add To-do</div><br><div class='btn btn-default' id='cancel-add-todo'>Cancel</div></div>";
    $(htmlStr).appendTo(parent);

    $('#deadline').datepicker({
      minDate: new Date()
    });
    //use $.find() to find error div
  });

  $(document).on('click', '.delete-todo', function(){
    var todoId = $(this).parent().parent().attr('todoId');
    var categoryId = $(this).parent().parent().parent().parent().attr('categoryId');
    event_id = $(this).parent().parent().parent().parent().parent().attr('eventId');
    $.ajax({
      url:'events/'+event_id+'/categories/'+categoryId+'/todos/'+todoId,
      type: 'DELETE'
    }).done(function(response){
      loadTodosPage(event_id);
    })
  });

  $(document).on('click', '#add-todo', function(){
    var categoryId = $(this).parent().parent().attr('categoryId');
    event_id = $(this).parent().parent().parent().attr('eventId');
    var error_div = $(this).parent().find('.error');
    var todo_name = $('#todo-name').val();
    var deadline = $('#deadline').datepicker("getDate");
    if (todo_name.length < 1){
      error_div.text('To-Do must have a name and deadline.');
    }else{
      $.post('events/'+event_id+'/categories/'+categoryId+'/todos', {name:todo_name, deadline: deadline}).done(function(response){
        loadTodosPage(event_id);
      }).fail(function(responseObject){
        var response = $.parseJSON(responseObject.responseText);
        error_div.text(response.err);
      })
    }
  });

  $(document).on('click', '#cancel-add-todo', function(){


    var container = $(this).parent().parent();
    $(this).parent().remove(); //remove form
    var htmlStr = '<button class="btn btn-default add_todo">Add a To-Do</button>';
    $(htmlStr).appendTo(container);
  });

  $(document).on('click', '#cancel-category-button', function(){
    $('#new-category-container').remove();
    var htmlStr = '<div class="column btn btn-default" id="new_category"><p>+ Add a new To-Do list</p></div>';
    $(htmlStr).appendTo('#category-container');
  });

  $(document).on('click', '#add-category-button', function() {
    var category_title = $('#category-title').val();
    if (category_title.length < 1){

      $(this).parent().find('.error').text('To-Do List must have a title.');
    }else{
      console.log(event_id);
      event_id = $("#event_panel").attr("eventId");
      $.post('events/' + event_id + '/categories', {name: category_title}).done(function(response){
        console.log("woo, added category");
        console.log(event_id);
        loadTodosPage(event_id);
      }).fail(function(responseObject){
        var response = $.parseJSON(responseObject.responseText);
        console.log(response);
        $(this).parent().find('.error').text(response.err);
      })
    }
  });

  $(document).on('click', '#cancel-planner-button', function() {
    $('#new-planner-container').remove();
    var htmlStr = '<div class="column btn btn-default" id="new_planner"><p>+ Add another planner</p></div>';
    $(htmlStr).appendTo('#category-container');
  });

  $(document).on('click', '#add-planner-button', function() {
    var planner_email = $('#planner-email').val();
    if (planner_email.length < 1) {
      $(this).parent().find('.error').text('Planner must have an email');
    } else {
      event_id = $("#event_panel").attr("eventId");
      $.post('events/' + event_id + '/planners', {planner_email: planner_email}).done(function(response) {
        loadTodosPage(event_id);
      }).fail(function(responseObject) {
        var response = $.parseJSON(responseObject.responseText);
        console.log(response);
        $(this).parent().find('.error').text(response.err);
      });
    }
  });

  $(document).on('click', '.delete-category', function(){
    var category_id = $(this).parent().parent().attr('categoryId');
    event_id = $(this).parent().parent().parent().attr('eventId');
    $.ajax({
      url: 'events/' + event_id + '/categories/' + category_id,
      type: 'DELETE',
    }).done(function(response){
      loadTodosPage(event_id);
    });
  })


})();
