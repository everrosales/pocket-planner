(function () {
  var event_id = undefined;

  $(document).on("click", ".remove-cost", function(){
    event_id = $("#event-panel").attr("eventId");
    var cost_id = $(this).parent().parent().parent().attr("costId");
    $.ajax({
      url: 'events/'+event_id+'/costs/'+cost_id,
      type: 'DELETE'
    }).done(function(response){
      window.location.href = "#event-costs";
      loadTodosPage(event_id);
    }).fail(function(responseObject){
      console.log("failed");
      var response = $.parseJSON(responseObject.responseText);
      Materialize.toast(response.err, 2000);
    });
  });

  $(document).on("click", ".remove-planner", function(){
    event_id = $('#event-panel').attr("eventId");
    var planner_id = $(this).parent().parent().attr("plannerId");
    $.ajax({
      url: 'events/'+event_id+'/planners/'+planner_id,
      type: 'DELETE'
    }).done(function(response){
      window.location.href = "#event-planners";
      loadTodosPage(event_id);
    }).fail(function(responseObject){
      console.log("failed");
      var response = $.parseJSON(responseObject.responseText);
      Materialize.toast(response.err, 2000);
    });
  });

  $(document).on("change", ".check-todo", function(){
    event_id = $("#event-panel").attr("eventId");
    var cat_id=$(this).parent().parent().parent().parent().attr("categoryId");
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

  $(document).on("click", "#add-cost", function(){
    $("#add-cost").hide();
    $("#add-cost-form").show();
  });

  $(document).on("click", "#cancel-cost", function(){
    event_id = $(this).parent().attr("eventId");
    window.location.href = "#event-costs";
    loadTodosPage(event_id);
  });

  $(document).on("click", "#submit-cost", function(){
    event_id = $(this).parent().attr("eventId");
    var name = $("#cost-name").val();
    var amount = $("#cost-amount").val();
    var desc = $("#cost-desc").val();
    $.post("/events/"+event_id+"/costs", {name:name , amount:amount, description:desc}).done(function(response){
      window.location.href = "#event-costs";
      loadTodosPage(event_id);
    }).fail(function(responseObject){
      console.log(responseObject);
      var response = $.parseJSON(responseObject.responseText);
      // $("#add-cost-form").find(".error").text(response.err);
      Materialize.toast(response.err, 2000);
    });
  });

  $(document).on("click", "#add-planner", function(){
    $("#add-planner").hide();
    $("#add-planner-form").show();
  });

  $(document).on("click", "#cancel-planner", function(){
    event_id = $("#event-panel").attr("eventId");
    window.location.href = "#event-planners";
    loadTodosPage(event_id);
  });

  $(document).on("click", "#submit-planner", function(){
    event_id = $("#event-panel").attr("eventId");
    var email = $("#planner-email").val();
    $.post("/events/"+event_id+"/planners", {planner_email:email}).done(function(response){
      window.location.href = "#event-planners";
      loadTodosPage(event_id);
    }).fail(function(responseObject){
      console.log(responseObject);
      var response = $.parseJSON(responseObject.responseText);
      // $("#add-planner-form").find(".error").text(response.err)
      console.log(response);
      Materialize.toast(response.err, 2000);
    });
  });

  $(document).on('click', '#edit-event', function(){
    event_id = $('#event-panel').attr("eventId");
    var event_name = $('#event_name').text();
    console.log($('#start-date').text());
    var start_date = ($('#start-date').text());
    var end_date = ($('#end-date').text());


    //console.log(event_name);
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

  $(document).on('click', '#cancel-edit-event', function(){
    event_id = $("#event-panel").attr("eventId");
    window.location.href = "#";
    loadTodosPage(event_id);
  });

  //when press cancel, loadTodosPage

  $(document).on('click', '#new_category', function() {
    $('#new_category').remove();
    var htmlStr = "<div class='column' id='new-category-container'><div class='event'><div class='error'></div><input id='category-title' type='text' placeholder='To-Do List Title'><br><div class='btn btn-default' id='add-category-button'>Add To-Do List</div><div class='btn btn-default' id='cancel-category-button'>Cancel</div></div>";
    $(htmlStr).appendTo('#category-container');
  });

  $(document).on("click", "#submit-edit-event", function(){
    event_id = $("#event-panel").attr("eventId");
    var start_date = new Date($("#edit-start-date").val());
    var end_date = new Date($("#edit-end-date").val());

    var name = $("#event_name_edit").val();
    console.log($("#event_name_edit").val());

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
      console.log("failed");
      // $("#event-panel").find(".error").text("Invalid input format.");
      Materialize.toast('Invalid input format', 2000);
    });
  });

  $(document).on('click', '.add_todo', function() {

    var parent = $(this).parent();
    $(this).remove();
    var htmlStr = "<div class='new-todo-form'><div class='error'></div><input type='text' id='todo-name' placeholder='Todo'><br><input type='text' placeholder='Deadline' id='deadline'><br><div class='btn btn-default' id='add-todo'>Add To-do</div><br><div class='btn btn-default' id='cancel-add-todo'>Cancel</div></div>";
    $(htmlStr).appendTo(parent);

    $('#deadline').pickadate({
      min: new Date()
    });
    //use $.find() to find error div
  });

  $(document).on('click', '.delete-todo', function(){
    var todoId = $(this).parent().attr('todoId');
    var categoryId = $(this).parent().parent().parent().attr('categoryId');
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

  $(document).on('click', '#add-todo', function(){
    var categoryId = $(this).parent().parent().parent().attr('categoryId');
    event_id = $('#event-panel').attr("eventId");
    // var error_div = $(this).parent().find('.error');
    var todo_name = $('#todo-name').val();
    var deadline = new Date($('#deadline').val());
    if (todo_name.length < 1){
      // error_div.text('To-Do must have a name and deadline.');
      Materialize.toast('To-Do must have a name and deadline.', 2000);
    }else{
      $.post('events/'+event_id+'/categories/'+categoryId+'/todos', {name:todo_name, deadline: deadline}).done(function(response){
        loadTodosPage(event_id);
      }).fail(function(responseObject){
        var response = $.parseJSON(responseObject.responseText);
        Materialize.toast(response.err, 2000);
        // error_div.text(response.err);
      });
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
      event_id = $("#event-panel").attr("eventId");
      $.post('events/' + event_id + '/categories', {name: category_title}).done(function(response){
        console.log("woo, added category");
        console.log(event_id);
        loadTodosPage(event_id);
      }).fail(function(responseObject){
        var response = $.parseJSON(responseObject.responseText);
        console.log(response);
        // $(this).parent().find('.error').text(response.err);
        Materialize.toast(response.err, 2000);
      });
    }
  });

  $(document).on('click', '.delete-category', function(){
    var category_id = $(this).parent().parent().parent().attr('categoryId');
    event_id = $('#event-panel').attr('eventId');
    $.ajax({
      url: 'events/' + event_id + '/categories/' + category_id,
      type: 'DELETE',
    }).done(function(response){
      loadTodosPage(event_id);
    }).fail(function(responseObject) {
      var response = $.parseJSON(responseObject.responseText);
      Materialize.toast(response.err, 2000);
    });
  });

})();
