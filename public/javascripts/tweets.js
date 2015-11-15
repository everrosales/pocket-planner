// Wrapped in an immediately invoked function expression
(function() {
    $(document).on('click', '#submit-new-tweet', function(evt) {
        var content = $('#new-tweet-input').val();
        if (content.trim().length === 0) {
            alert('Input must not be empty');
            return;
        }
        var tags = $('#new-tweet-tags').val().split(", ");
        $.post(
            '/tweets',
            { content: content, tags: tags }
        ).done(function(response) {
            loadHomePage();
        }).fail(function(responseObject) {
            var response = $.parseJSON(responseObject.responseText);
            $('.error').text(response.err);
        });
    });

    $(document).on('click', '.delete-tweet', function(evt) {
        var item = $(this).parent();
        var id = item.data('tweet-id');
        $.ajax({
            url: '/tweets/' + id,
            type: 'DELETE'
        }).done(function(response) {
            item.remove();
        }).fail(function(responseObject) {
            var response = $.parseJSON(responseObject.responseText);
            $('.error').text(response.err);
        });
        matching_tweets = $("[data-tweet-id=" + id + "]");
        matching_tweets.toArray().forEach(function(x) { x.remove(); });

    });

    $(document).on('click', '.retweet-tweet', function(evt) {
        var tweet_id = $(this).parent().data('tweet-id');
        $.post('/tweets/' + tweet_id).done(function(response) {
            loadHomePage();
        }).fail(function(responseObject) {
            var response = $.parseJSON(responseObject.responseText);
            $('.error').text(response.err);
        });
    });
})();
