//wrapped in immediately invoked function expression
(function() {
    $(document).on('submit', '#signin-form', function(evt) {
        evt.preventDefault();
        $.post(
            '/users/login',
            helpers.getFormData(this)
        ).done(function(response) {
            currentUser = response.content.user;
            loadHomePage();
        }).fail(function(responseObject) {
            var response = $.parseJSON(responseObject.responseText);
            $('.error').text(response.err);
        });
    });

    $(document).on('submit', '#register-form', function(evt) {
        evt.preventDefault();
        var formData = helpers.getFormData(this);
        if (formData.password !== formData.confirm) {
            $('.error').text("Password and confirmation do not match!");
            return;
        }
        delete formData.confirm;
        $.post(
            '/users',
            formData
        ).done(function(response) {
            loadHomePage();
        }).fail(function(responseObject) {
            var response = $.parseJSON(responseObject.responseText);
            $('.error').text(response.err);
        });
    });

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
