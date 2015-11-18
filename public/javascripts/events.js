// Wrapped in an immediately invoked function expression
(function() {

  $(document).on('click', '#new_event', function(){
    $('#new_event').remove();
    var htmlStr = "<div class='column' id='new-event-container'><div class='event'><div class='error'></div><input type='text' id='event-name' placeholder='Event name'><br><input type='text' id='event-date' placeholder='Event date'><br><input type='time' id='event-time' placeholder='Event time'><br><div class='btn btn-default' id='add-event-button'>Add event</div><div class='btn btn-default' id='cancel-event-button'>Cancel</div></div></div>";

    var currentDate = undefined;

    $(htmlStr).appendTo("#events");
    $('#event-date').datepicker({
      minDate: new Date(),
      onSelect: function(dateText, inst){
        currentDate = $('#event-date').datepicker("getDate");
        console.log(currentDate);
      }
    });

  });

  $(document).on('click', '#add-event-button', function() {
    var event_name = $('#event-name').val();
    var event_date = $('#event-date').datepicker("getDate");
    var hr_min = ($('#event-time').val()).split(':');
    var hour = parseInt(hr_min[0]);
    var min = parseInt(hr_min[1]);
    if (hour) {
      event_date.setHours(parseInt(hr_min[0]));
    }
    if (min) {
      event_date.setMinutes(parseInt(hr_min[1]));
    }
    var data = {email: currentUser, name: event_name, time: event_date};
    $.post('/events', data).done(function(response){
      console.log("success!");
      loadHomePage();
    }).fail(function(responseObject){
      console.log("failed");
      var response = $.parseJSON(responseObject.responseText);
      console.log(response);
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
    var del_id = $(this).parent().parent().attr('id');
    $.ajax({
      url: 'events/' + del_id,
      type: 'DELETE',
      data: {event_id: del_id}
    }).done(function(response){
      loadHomePage();
    }).fail(function(response){
      console.log("failed");
    });
  });
})();
