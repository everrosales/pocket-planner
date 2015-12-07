(function(){
  /*document.getElementById('edit-event-loc').addEventListener('click', function(){
    document.getElementById('location-map').openModal();
    initAutocomplete();
  });*/
  $(document).on("click","#edit-event-loc", function(){
    $("#map-container").show();
    var map = document.getElementById("map_canvas");
    google.maps.event.trigger(map, 'resize');
  });
})();
