(function(){
  /*
  Categories UI functions.
    -Open form to add new category
    -Cancel adding category
    -Submit new category
    -Delete category
    -Edit category
  */

  //Open form to add new category.
  $(document).on('click', '#new_category', function() {
    $('#new_category').hide();
    $("#new-category-container").show();
  });

  //Cancel adding category.
  $(document).on('click', '#cancel-category-button', function(){
    $("#category-title").val("");
    $("#new-category-container").hide();
    $("#new_category").show();
  });

  //Submit new category.
  $(document).on('click', '#add-category-button', function() {
    var category_title = $('#category-title').val();
    if (category_title.length < 1) {
      Materialize.toast('To-Do List must have a name.', 2000);
    } else if (category_title.length > 100) {
      Materialize.toast('To-Do List name can be at most 100 characters long.', 2000);
    } else {
      event_id = $("#event-panel").attr("eventId");
      $.post('events/' + event_id + '/categories', {name: category_title}).done(function(response){
        loadTodosPage(event_id);
      }).fail(function(responseObject){
        var response = $.parseJSON(responseObject.responseText);
        Materialize.toast(response.err, 2000);
      });
    }
  });

  //Delete category.
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

  //Editing Category


    //Open edit category form.
    $(document).on("click", ".edit-category", function(){
      $(this).parent().hide();
      $(this).parent().parent().find(".add_todo").hide();
      $(this).parent().parent().find('.edit-category-form').show();
    });

    //Cancel editing category.
    $(document).on("click", ".cancel-edit-category", function(){
      event_id = $("#event-panel").attr("eventId");
      loadTodosPage(event_id);
    });

    //Submit editing category form.
    $(document).on("click", ".submit-edit-category", function(){
      //get all info
      event_id = $("#event-panel").attr("eventId");
      var cat_id = $(this).parent().parent().parent().attr("categoryId");
      var new_category_name = $(this).parent().find(".edit-category-name").val();

      if (!new_category_name) {
        Materialize.toast('To-Do List must have a name.', 2000);
      } else if (new_category_name.length > 100) {
        Materialize.toast('To-Do List name can be at most 100 characters long.');
      } else {
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

})();
