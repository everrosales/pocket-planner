$(document).on('click', '.attend-event-container', function(){
  event_id = ($(this).attr('eventId'));
  //go to edit that event
  //get that event's info. for now, populated with dummy data.
  //make requests for each of the Todos
  //use date.toLocaleDateString() to get the string date
  window.location.href = "/events/" + event_id + "/attend";
});
