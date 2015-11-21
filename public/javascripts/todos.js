(function () {
  var event_id = undefined;


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
      url:'events/'+event_id+'/category/'+categoryId+'/todo/'+todoId,
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
      $.post('events/'+event_id+'/category/'+categoryId+'/addtodo', {name:todo_name, deadline: deadline}).done(function(response){
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
      $.post('events/' + event_id + '/addcategory', {name: category_title}).done(function(response){
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

  $(document).on('click', '.delete-category', function(){
    var category_id = $(this).parent().parent().attr('categoryId');
    event_id = $(this).parent().parent().parent().attr('eventId');
    $.ajax({
      url: 'events/' + event_id + '/category/' + category_id,
      type: 'DELETE',
    }).done(function(response){
      loadTodosPage(event_id);
    });
  })


})();
