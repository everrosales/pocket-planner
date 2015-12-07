// Wrapped in an immediately invoked function expression
(function() {

  $(document).on('click', '#new_event', function(){

    $('#new-event-modal').openModal();
    $('#start_date').pickadate({
      min: new Date(),
      max: $('#end_date').val() || new Date(8640000000000000),
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year
      onClose: function(){
        var event_start = new Date($('#start_date').val());
        $('#end_date').pickadate('picker').set('min', $('#start_date').val());
        $('#end_date').pickadate('picker').set('select', [event_start.getFullYear(), event_start.getMonth(), event_start.getDate()]);
      }
    });

    $('#end_date').pickadate({
      selectMonths: true,
      selectYears: 15,
      min: $('#start_date').val() || new Date(),
      onClose: function(){
        $('#start_date').pickadate('picker').set('max', $('#end_date').val());
      }
    });

  });

  $(document).on('click', '#add-event-button', function(e) {
    if (!$('#add-event-button')[0].classList.contains('disabled')) {
      e.preventDefault();
      $('#add-event-button')[0].classList.add('disabled');
      $('#cancel-event-button')[0].classList.add('disabled');
      var formData = helpers.getFormData($('#new-event-form')[0]);
      var event_name = formData.eventname;
      var start_date = new Date(formData.start_date);
      var hr_min = formData.start_time.split(":");
      var hour = parseInt(hr_min[0]);
      var min = parseInt(hr_min[1]);
      var is_private = $('#set_private')[0].checked;
      if (hour) {
        start_date.setHours(parseInt(hr_min[0]));
      }
      if (min) {
        start_date.setMinutes(parseInt(hr_min[1]));
      }

      var end_date = new Date(formData.end_date);
      hr_min = formData.end_time.split(":");
      hour = parseInt(hr_min[0]);
      min = parseInt(hr_min[1]);
      if (hour) {
        end_date.setHours(parseInt(hr_min[0]));
      } else {
        end_date.setHours(23);
      }
      if (min) {
        end_date.setMinutes(parseInt(hr_min[1]));
      } else {
        end_date.setMinutes(59);
      }

      if (end_date < start_date) {
        Materialize.toast("End date/time must be after Start date/time.", 2000);
        $('#add-event-button')[0].classList.remove('disabled');
        $('#cancel-event-button')[0].classList.remove('disabled');
        return;
      } else if (event_name.length > 100) {
        Materialize.toast("Event names can be at most 100 characters long.", 2000);
        $('#add-event-button')[0].classList.remove('disabled');
        $('#cancel-event-button')[0].classList.remove('disabled');
        return;
      }

      var data = {email: currentUser, name: event_name, start_date: start_date, end_date: end_date, is_private:is_private};

      $.post('/events', data).done(function(response){
        $('#add-event-button')[0].classList.remove('disabled');
        $('#cancel-event-button')[0].classList.remove('disabled');
        $('#new-event-modal').closeModal();
        loadEventsPage();
      }).fail(function(responseObject){
        $('#add-event-button')[0].classList.remove('disabled');
        $('#cancel-event-button')[0].classList.remove('disabled');
        var response = $.parseJSON(responseObject.responseText);
        Materialize.toast(response.err, 4000);
      });
    }
  });

  $(document).on('click', '.delete-event', function(e){
    e.stopPropagation();
    var del_id = $(this).parent().parent().attr("eventId");
    $.ajax({
      url: 'events/' + del_id,
      type: 'DELETE',
      data: {event_id: del_id}
    }).done(function(response){
      loadEventsPage();
    }).fail(function(response){
    });
  });

  $(document).on('click', '.event-container', function(){
    event_id = ($(this).attr('eventId'));
    //go to edit that event
    //get that event's info. for now, populated with dummy data.
    //make requests for each of the Todos
    //use date.toLocaleDateString() to get the string date
    $.get('/events/'+ event_id).done(function(response){
      loadTodosPage(event_id);
    }).fail(function(responseObject){
      var response = $.parseJSON(responseObject.responseText);
      Materialize.toast(response.err, 2000);
    });
  });
})();
