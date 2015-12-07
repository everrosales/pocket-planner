//wrapped in immediately invoked function expression
(function() {
    $(document).on('click', '#login-cancel', function(evt) {
      if (!$('#login-cancel')[0].classList.contains('disabled')) {
        $('#signin-form')[0].reset();
        $('#login-modal').closeModal();
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
            window.location.reload();
        }).fail(function(responseObject) {
            $('#login-submit')[0].classList.remove('disabled');
            $('#login-cancel')[0].classList.remove('disabled');
            var response = $.parseJSON(responseObject.responseText);
            Materialize.toast(response.err, 4000);
        });
      }
    });

    $(document).on('click', '#signup-cancel', function(evt) {
      if (!$('#signup-cancel')[0].classList.contains('disabled')) {
        $('#signup-form')[0].reset();
        $('#signup-modal').closeModal();
      }
    });

    $(document).on('click', '#signup-submit', function(evt) {
      if (!$('#signup-submit')[0].classList.contains('disabled')) {
        evt.preventDefault();
        $('#signup-submit')[0].classList.add('disabled');
        $('#signup-cancel')[0].classList.add('disabled');
        var formData = helpers.getFormData($('#signup-form')[0]);
        if (!validator.isEmail(formData.username)) {
          Materialize.toast('That is not an email address.', 4000);
          $('#signup-submit')[0].classList.remove('disabled');
          $('#signup-cancel')[0].classList.remove('disabled');
          return;
        } else if (formData.username != formData.confirmusername) {
          Materialize.toast('Email addresses must match', 4000);
          $('#signup-submit')[0].classList.remove('disabled');
          $('#signup-cancel')[0].classList.remove('disabled');
          return;
        } else if (formData.password.length < 8 || formData.password.length > 30) {
          Materialize.toast('Password must be 8~30 characters long', 4000);
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
            window.location.reload();
        }).fail(function(responseObject) {
            $('#signup-submit')[0].classList.remove('disabled');
            $('#signup-cancel')[0].classList.remove('disabled');
            var response = $.parseJSON(responseObject.responseText);
            Materialize.toast(response.err, 4000);
        });
      }
    });

    $(document).on('click', '#logout-link', function(evt) {
        evt.preventDefault();
        $.post(
            '/users/logout'
        ).done(function(response) {
            currentUser = undefined;
            window.location.reload();
        }).fail(function(responseObject) {
            var response = $.parseJSON(responseObject.responseText);
            $('.error').text(response.err);
        });
    });
})();
