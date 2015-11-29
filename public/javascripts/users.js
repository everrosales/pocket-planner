//wrapped in immediately invoked function expression
(function() {
    // $(document).on('submit', '#signin-form', function(evt) {
    //     evt.preventDefault();
    //     $.post(
    //         '/users/login',
    //         helpers.getFormData(this)
    //     ).done(function(response) {
    //         currentUser = response.content.user;
    //         loadHomePage();
    //     }).fail(function(responseObject) {
    //         var response = $.parseJSON(responseObject.responseText);
    //         $('.error').text(response.err);
    //     });
    // });

    $(document).on('click', '#login-cancel', function(evt) {
      if (!$('#login-cancel')[0].classList.contains('disabled')) {
        $('#signin-form')[0].reset();
      }
    });

    $(document).on('click', '#login-submit', function(evt) {
      if (!$('#login-submit')[0].classList.contains('disabled')) {
        evt.preventDefault();
        $('#login-submit')[0].classList.add('disabled');
        $('#login-cancel')[0].classList.add('disabled');
        var formData = helpers.getFormData($("#signin-form")[0]);
        $.post(
            '/users/login',
            formData
        ).done(function(response) {
            currentUser = response.content.user;
            $('#login-submit')[0].classList.remove('disabled');
            $('#login-cancel')[0].classList.remove('disabled');
            $('#login-modal').closeModal();
            Materialize.toast('Logged in as ' + currentUser, 4000);
            loadHomePage();
        }).fail(function(responseObject) {
            $('#login-submit')[0].classList.remove('disabled');
            $('#login-cancel')[0].classList.remove('disabled');
            var response = $.parseJSON(responseObject.responseText);
            Materialize.toast(response.err, 4000);
            // $('.error').text(response.err);
        });
      }
    });

    $(document).on('click', '#signup-cancel', function(evt) {
      if (!$('#signup-cancel')[0].classList.contains('disabled')) {
        $('#signup-form')[0].reset();
      }
    });

    $(document).on('click', '#signup-submit', function(evt) {
      if (!$('#signup-submit')[0].classList.contains('disabled')) {
        evt.preventDefault();
        $('#signup-submit')[0].classList.add('disabled');
        $('#signup-cancel')[0].classList.add('disabled');
        var formData = helpers.getFormData($('#signup-form')[0]);
        if (formData.username != formData.confirmusername) {
          Materialize.toast('Usernames must match', 4000);
          $('#signup-submit')[0].classList.remove('disabled');
          $('#signup-cancel')[0].classList.remove('disabled');
          return;
        } else if (formData.password != formData.confirmpassword) {
          Materialize.toast('Passwords must match', 4000);
          $('#signup-submit')[0].classList.remove('disabled');
          $('#signup-cancel')[0].classList.remove('disabled');
          return;
        }
        delete formData.confirmusername;
        delete formData.confirmpassword;
        $.post(
            '/users',
            formData
        ).done(function(response) {
            $('#signup-submit')[0].classList.remove('disabled');
            $('#signup-cancel')[0].classList.remove('disabled');
            currentUser = response.content.user;
            $('#signup-modal').closeModal();
            Materialize.toast('Logged in as ' + currentUser, 4000);
            loadHomePage();
        }).fail(function(responseObject) {
            $('#signup-submit')[0].classList.remove('disabled');
            $('#signup-cancel')[0].classList.remove('disabled');
            var response = $.parseJSON(responseObject.responseText);
            Materialize.toast(response.err, 4000);
        });
      }
    });

    // $(document).on('submit', '#register-form', function(evt) {
    //     evt.preventDefault();
    //     var formData = helpers.getFormData(this);
    //     if (formData.password !== formData.confirm) {
    //         $('.error').text("Password and confirmation do not match!");
    //         return;
    //     }
    //     delete formData.confirm;
    //     $.post(
    //         '/users',
    //         formData
    //     ).done(function(response) {
    //         loadHomePage();
    //     }).fail(function(responseObject) {
    //         var response = $.parseJSON(responseObject.responseText);
    //         $('.error').text(response.err);
    //     });
    // });

    $(document).on('click', '#logout-link', function(evt) {
        evt.preventDefault();
        $.post(
            '/users/logout'
        ).done(function(response) {
            currentUser = undefined;
            loadHomePage();
        }).fail(function(responseObject) {
            var response = $.parseJSON(responseObject.responseText);
            $('.error').text(response.err);
        });
    });

    $(document).on('click', '#subscribe', function(evt) {
        var username = $('#subscribe_to').val();
        if (username.trim().length === 0) {
            alert('Must subscribe to a current user');
            return;
        }
        $.post(
            '/users/subscribe',
            { username : username }
        ).done(function(response) {
            loadHomePage();
        }).fail(function(responseObject) {
            var response = $.parseJSON(responseObject.responseText);
            $('.error').text(response.err);
        });
    });

    $(document).on('click', '.remove-subscribe', function(evt) {
        var item = $(this).parent().parent();
        var subscribee = item.data('subscribe-id');
        $.ajax({
            url: '/users/subscribe/' + subscribee,
            type: 'DELETE',
        }).done(function(response) {
            item.remove();
        }).fail(function(responseObject) {
            var response = $.parseJSON(responseObject.responseText);
            $('.error').text(response.err);
        });
        matching_tweets = $("#my_subscribed_tweets > [data-author-id=" + subscribee + "]");
        console.log(matching_tweets.toArray());
        matching_tweets.toArray().forEach(function(x) { x.remove(); });
    });
})();
