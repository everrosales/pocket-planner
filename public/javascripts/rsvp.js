var loadRsvpPage = function() {
  
}

$(document).ready(function() {
    $.get('/users/current', function(response) {
        if (response.content.loggedIn) {
            currentUser = response.content.user;
        }
        loadRsvpPage();
    });

});
