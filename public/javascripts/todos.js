(function () {
  var event_id = undefined;

  $(document).on('click', '#new_category', function() {
    $('#new_category').remove();
    var htmlStr = "<div class='column' id='new-category-container'><div class='event'><div class='error'></div><input id='category-title' type='text' placeholder='To-Do List Title'><br><div class='btn btn-default' id='add-category-button'>Add To-Do List</div><div class='btn btn-default' id='cancel-category-button'>Cancel</div></div>";
    $(htmlStr).appendTo('#category-container');
  });

  $(document).on('click', '#cancel-category-button', function(){
    $('#new-category-container').remove();
    var htmlStr = '<div class="column btn btn-default" id="new_category"><p>+ Add a new To-Do list</p></div>';
    $(htmlStr).appendTo('#category-container');
  });

  $(document).on('click', '#add-category-button', function() {
    var category_title = $('#category-title').val();
    if (category_title.length < 1){
      $('.error').text('To-Do List must have a title.');
    }else{
      console.log(event_id);
      $.post('events/' + event_id + '/addcategory', {name: category_title}).done(function(response){
        console.log("woo, added category");
        console.log(event_id);
        loadTodosPage(event_id);
      }).fail(function(responseObject){
        var response = $.parseJSON(responseObject.responseText);
        console.log(response);
        $('.error').text(response.err);
      })
    }
  });

  $(document).on('click', '.event-container', function(){
    event_id = ($(this).attr('id'));
    //go to edit that event
    //get that event's info. for now, populated with dummy data.
    //make requests for each of the Todos
    //use date.toLocaleDateString() to get the string date
    //$.get()
    $.get('/events/'+ event_id).done(function(response){
      console.log("success!");
      console.log(response.content);
      loadTodosPage(event_id);
    }).fail(function(responseObject){
      console.log("failed");
      var response = $.parseJSON(responseObject.responseText);
      console.log(response);
      $('.error').text(response.err);
    });
  });


})();
