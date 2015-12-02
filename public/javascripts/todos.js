(function () {
  var event_id = undefined;

  $(document).on("click", ".edit-category", function(){
    $(this).parent().hide();
    $(this).parent().parent().find(".add_todo").hide();
    $(this).parent().parent().find('.edit-category-form').show();
  });

  $(document).on("click", ".cancel-edit-category", function(){
    event_id = $("#event-panel").attr("eventId");
    loadTodosPage(event_id);
  });

  $(document).on("click", ".submit-edit-category", function(){
    event_id = $("#event-panel").attr("eventId");
    var cat_id = $(this).parent().parent().parent().attr("categoryId");
    var new_category_name = $(this).parent().find(".edit-category-name").val();
    if (!new_category_name){
      Materialize.toast("Category must have a name.", 2000);
    }else{
      $.ajax({
        url: "/events/"+event_id+"/categories/"+cat_id,
        type: "PUT",
        data: {new_name:new_category_name}
      }).done(function(response){
        loadTodosPage(event_id);
      }).fail(function(responseObject){
        var response = $.parseJSON(responseObject.responseText);
        Materialize.toast(response.err, 2000);
      });

    }
  });

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

  $(document).on("click", ".cancel-edit-todo", function(){
    event_id = $("#event-panel").attr("eventId");
    loadTodosPage(event_id);
  });

  $(document).on("click", ".submit-edit-todo", function(){
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

      if(todo_priority){
        info.priority = todo_priority
      };
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

  });

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
    var cat_id=$(this).parent().parent().parent().parent().parent().attr("categoryId");
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
    $('#new_category').hide();
    $("#new-category-container").show();
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
    $(this).hide();

    parent.find(".new-todo-form").show();
    $('.deadline').pickadate({
      min: new Date()
    });
    //use $.find() to find error div
  });

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

  $(document).on('click', '#add-todo', function(){
    console.log("adding todo");
    var categoryId = $(this).parent().parent().parent().attr('categoryId');
    event_id = $('#event-panel').attr("eventId");
    // var error_div = $(this).parent().find('.error');
    var form = $(this).parent();
    var todo_name = form.find('.todo-name').val();
    var deadline = new Date(form.find('.deadline').val());
    var priority = form.find(".priority").val();
    if (todo_name.length < 1 || !deadline){

      Materialize.toast('Todo must have a name and deadline.', 2000);


    }else{

      info = {name: todo_name, deadline:deadline};

      if(priority && (priority <= 0 || priority > 10)){
        Materialize.toast("Todo priority must be a number between 1 and 10.", 2000);

      }else{
        if(priority){
          info.priority = priority;
        }
        $.post('events/'+event_id+'/categories/'+categoryId+'/todos', info).done(function(response){
          loadTodosPage(event_id);
        }).fail(function(responseObject){
          var response = $.parseJSON(responseObject.responseText);
          Materialize.toast(response.err, 2000);
          // error_div.text(response.err);
        });
      }

    }
  });

  $(document).on('click', '#cancel-add-todo', function(){


    var container = $(this).parent();
    container.find(".todo-name").val("");
    container.find(".deadline").val("");
    container.find(".priority").val("");
    $(this).parent().hide(); //remove form
    $(this).parent().parent().find(".add_todo").show();
  });

  $(document).on('click', '#cancel-category-button', function(){
    $("#category-title").val("");
    $("#new-category-container").hide();
    $("#new_category").show();
  });

  $(document).on('click', '#add-category-button', function() {
    var category_title = $('#category-title').val();
    if (category_title.length < 1){

      Materialize.toast('To-Do List must have a title.', 2000);
    }else{
      event_id = $("#event-panel").attr("eventId");
      $.post('events/' + event_id + '/categories', {name: category_title}).done(function(response){
        loadTodosPage(event_id);
      }).fail(function(responseObject){
        var response = $.parseJSON(responseObject.responseText);
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
