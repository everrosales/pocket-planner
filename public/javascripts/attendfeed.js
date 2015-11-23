var loadAttendDialogue = function(event_id) {
  console.log(event_id);
}

$(document).on('click', '.attend-event-container', function(){
  event_id = ($(this).attr('id'));
  console.log(event_id);
  //go to edit that event
  //get that event's info. for now, populated with dummy data.
  //make requests for each of the Todos
  //use date.toLocaleDateString() to get the string date
  //$.get()
  window.location.href = "/attend/" + event_id;
  // $.get('/attend/'+ event_id).done(function(response){
  //   console.log("success!");
  //   console.log(response.content);
  //   loadAttendDialogue(event_id);
  // }).fail(function(responseObject){
  //   console.log("failed");
  //   var response = $.parseJSON(responseObject.responseText);
  //   console.log(response);
  //   $('.error').text(response.err);
  // });
});
