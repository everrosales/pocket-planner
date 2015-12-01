// Wrapped in an immediately invoked function expression
(function() {

  $(document).on('click', '#new_event', function(){

    $('#new-event-modal').openModal();
    $('#end_date').pickadate({
      closeOnSelect: true,
      onSet: function(){
        console.log("end date");
        $('#start_date').set("max", $('#end_date').get());
      }
    })
    $('#start_date').pickadate({
      closeOnSelect: true,
      onSet: function(){
        console.log("start date");
        $('#end_date').set("min", $('#start_date').get());
      }
    });

  });

  $(document).on('click', '#add-event-button', function(e) {
    if (!$('#add-event-button')[0].classList.contains('disabled')) {
      e.preventDefault();
      $('#add-event-button')[0].classList.add('disabled');
      $('#cancel-event-button')[0].classList.add('disabled');
      var formData = helpers.getFormData($('#new-event-form')[0]);
      var event_name = formData.eventname;//$('.eventname').val();
      console.log(event_name);
      var start_date = new Date(formData.start_date);//$('.start_date').value;
      var hr_min = formData.start_time.split(":");//($('.start_time').val()).split(':');
      var hour = parseInt(hr_min[0]);
      var min = parseInt(hr_min[1]);
      if (hour) {
        start_date.setHours(parseInt(hr_min[0]));
      }
      if (min) {
        start_date.setMinutes(parseInt(hr_min[1]));
      }

      var end_date = new Date(formData.end_date);//$('.end_date').value;
      hr_min = formData.end_time.split(":");//($('.end_time').val()).split(':');
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
        $('#add-event-button')[0].classList.remove('disabled');
        $('#cancel-event-button')[0].classList.remove('disabled');
        $('#new-event-modal').closeModal();
        loadEventsPage();
      }).fail(function(responseObject){
        console.log("failed");
        $('#add-event-button')[0].classList.remove('disabled');
        $('#cancel-event-button')[0].classList.remove('disabled');
        var response = $.parseJSON(responseObject.responseText);
        Materialize.toast(response.err, 4000);
        // $('.error').text(response.err);
      });
    }
  });

  // $(document).on('click', '#cancel-event-button', function(){
  //   // $('#new-event-container').remove();
  //   // var htmlStr = '<div class="column btn btn-default" id="new_event"><p>+ Add a new event</p></div>';
  //   // $(htmlStr).appendTo('#events');
  // });

  $(document).on('click', '.delete-event', function(e){
    e.stopPropagation();
    console.log("deleting event");
    var del_id = $(this).parent().parent().attr("eventId");
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
