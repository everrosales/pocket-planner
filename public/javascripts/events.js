// Wrapped in an immediately invoked function expression
(function() {

  $(document).on('click', '#new_event', function(){
    $('#new_event').remove();
    // TODO(ajliu): Make the new DOM element using Javascript DOM elements
    var htmlStr = "<div class='column' id='new-event-container'><div class='event'><div class='error'></div><input type='text' id='event-name' placeholder='Event name'><br><input type='text' id='start-date' placeholder='Start date'><br><input type='time' id='start-time' placeholder='Start time'><br><input type='text' id='end-date' placeholder='End date'><br><input type='time' id='end-time' placeholder='End time'><div class='btn btn-default' id='add-event-button'>Add event</div><div class='btn btn-default' id='cancel-event-button'>Cancel</div></div></div>";


    $(htmlStr).appendTo("#events");
    $('#start-date').datepicker({
      minDate: new Date(),
      onClose: function( selectedDate ) {
        $( "#end-date" ).datepicker( "option", "minDate", selectedDate );
      }
    });
    $('#end-date').datepicker({
      onClose: function( selectedDate ) {
        $( "#start-date" ).datepicker( "option", "maxDate", selectedDate );
      }
    });


  });

  $(document).on('click', '#add-event-button', function() {
    var event_name = $('#event-name').val();
    var start_date = $('#start-date').datepicker("getDate");
    var hr_min = ($('#start-time').val()).split(':');
    var hour = parseInt(hr_min[0]);
    var min = parseInt(hr_min[1]);
    if (hour) {
      start_date.setHours(parseInt(hr_min[0]));
    }
    if (min) {
      start_date.setMinutes(parseInt(hr_min[1]));
    }

    var end_date = $('#end-date').datepicker("getDate");
    hr_min = ($('#end-time').val()).split(':');
    hour = parseInt(hr_min[0]);
    min = parseInt(hr_min[1]);
    if (hour) {
      end_date.setHours(parseInt(hr_min[0]));
    }
    if (min) {
      end_date.setMinutes(parseInt(hr_min[1]));
    }
    var data = {email: currentUser, name: event_name, start_date: start_date, end_date: end_date};

    $.post('/events', data).done(function(response){
      console.log("success!");
      loadEventsPage();
    }).fail(function(responseObject){
      console.log("failed");
      var response = $.parseJSON(responseObject.responseText);
      $('.error').text(response.err);
    });
  });

  $(document).on('click', '#cancel-event-button', function(){
    $('#new-event-container').remove();
    var htmlStr = '<div class="column btn btn-default" id="new_event"><p>+ Add a new event</p></div>';
    $(htmlStr).appendTo('#events');
  });

  $(document).on('click', '.delete-event', function(e){
    e.stopPropagation();
    console.log("deleting event");
    var del_id = $(this).parent().parent().parent().attr('id');
    $.ajax({
      url: 'events/' + del_id,
      type: 'DELETE',
      data: {event_id: del_id}
    }).done(function(response){
      loadEventsPage();
    }).fail(function(response){
      console.log("failed");
    });
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
