(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['header'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        <button class=\"currentUser\" id=\"logout-link\">Log out</button>\n        <p class=\"currentUser\">Welcome, "
    + container.escapeExpression(((helper = (helper = helpers.currentUser || (depth0 != null ? depth0.currentUser : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"currentUser","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "        <button class=\"currentUser\" id=\"signin-btn\">Sign in</button>\n        <button class=\"currentUser\" id=\"register-btn\">Register</button>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"header\">\n    <p> 6.170 Fritter</p>\n    <button id=\"signin-btn\">Home</button>\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.currentUser : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true});
templates['index'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.header,(depth0 != null ? depth0.currentUser : depth0),{"name":"header","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "\n<div id=\"homepage\">\n    <h1>Welcome to Fritter!</h1>\n    <p>In order to post and see tweets, you must be signed in.</p>\n</div>\n";
},"usePartial":true,"useData":true});
templates['register'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        "
    + container.escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"error","hash":{},"data":data}) : helper)))
    + "\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.header,(depth0 != null ? depth0.currentUser : depth0),{"name":"header","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "\n<div id=\"register\">\n  <h1>Register</h1>\n  <div class=\"error\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\n  <form id=\"register-form\">\n    <div>Username: <input type=\"text\" name=\"username\" required /></div>\n    <div>Password: <input type=\"password\" name=\"password\" required /></div>\n    <div>Confirm Password: <input type=\"password\" name=\"confirm\" required /></div>\n    <input type=\"submit\" />\n  </form>\n</div>\n";
},"usePartial":true,"useData":true});
templates['signin'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        "
    + container.escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"error","hash":{},"data":data}) : helper)))
    + "\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.header,(depth0 != null ? depth0.currentUser : depth0),{"name":"header","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "\n<div id=\"signin\">\n  <h1>Sign in</h1>\n  <div class=\"error\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\n  <form id=\"signin-form\">\n    <div>Username: <input type=\"text\" name=\"username\" required /></div>\n    <div>Password: <input type=\"password\" name=\"password\" required /></div>\n    <input type=\"submit\" />\n  </form>\n</div>\n";
},"usePartial":true,"useData":true});
templates['subscribe'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class=\"subscribe\" data-subscribe-id=\""
    + alias2(alias1(depth0, depth0))
    + "\">\n  <p>"
    + alias2(alias1(depth0, depth0))
    + " (<a href=\"#\" class=\"remove-subscribe\">Remove</a>)</p>\n</div>\n";
},"useData":true});
templates['tweet'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <p class=\"author\"><em>~"
    + alias4(((helper = (helper = helpers.author || (depth0 != null ? depth0.author : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"author","hash":{},"data":data}) : helper)))
    + " (orig. "
    + alias4(((helper = (helper = helpers.old_author || (depth0 != null ? depth0.old_author : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"old_author","hash":{},"data":data}) : helper)))
    + ")</em></p>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return "    <p class=\"author\"><em>~"
    + container.escapeExpression(((helper = (helper = helpers.author || (depth0 != null ? depth0.author : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"author","hash":{},"data":data}) : helper)))
    + "</em></p>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "    <a href=\"#\" class=\"delete-tweet\">Delete</a>\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "    <a href=\"#\" class=\"retweet-tweet\">Retweet</a>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"tweet\" data-tweet-id="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + " data-author-id=\""
    + alias4(((helper = (helper = helpers.author || (depth0 != null ? depth0.author : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"author","hash":{},"data":data}) : helper)))
    + "\">\n  <p>"
    + alias4(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper)))
    + "</p>\n  <p class=\"tweet_tags\">"
    + alias4(((helper = (helper = helpers.tags || (depth0 != null ? depth0.tags : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tags","hash":{},"data":data}) : helper)))
    + "</p>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.old_author : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.is_mine : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true});
templates['tweets'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.subscribe,depth0,{"name":"subscribe","data":data,"indent":"                    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    return "                    <p><em>No subscribes yet!</em></p>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.tweet,depth0,{"name":"tweet","data":data,"indent":"            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"7":function(container,depth0,helpers,partials,data) {
    return "            <p><em>No tweets yet!</em></p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return ((stack1 = container.invokePartial(partials.header,depth0,{"name":"header","hash":{"currentUser":(depth0 != null ? depth0.currentUser : depth0)},"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "\n<div id=\"tweets\">\n    <div class=\"column\" id=\"input-new-tweet\">\n        <div class=\"error\"></div>\n        <label for=\"new-tweet-input\">Post a tweet:</label>\n        <textarea type=\"text\" id=\"new-tweet-input\" placeholder=\"Write stuff here!\"/>\n        <textarea type=\"text\" id=\"new-tweet-tags\" placeholder=\"Put your tags here!\"/>\n        <button id=\"submit-new-tweet\">Post</button>\n\n        <div class=\"subscribees\" id=\"my_subscribers\">\n            <span id=\"new_subscribe\">\n                <label for=\"subscribe_to\">Subscribe to a user:</label>\n                <input type=\"text\" id=\"subscribe_to\" placeholder=\"Username\"/>\n                <button id=\"subscribe\">Subscribe</button>\n            </span>\n            <div class=\"subscribees\" id=\"followed_users\">\n                <h2>Users I'm following:</h2>\n\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.my_subscribes : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "            </div>\n        </div>\n    </div>\n\n    <div class=\"column\">\n        <h2>My Tweets</h2>\n\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.my_tweets : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + "    </div>\n\n    <div class=\"column\">\n        <h2>All Tweets</h2>\n\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.all_tweets : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + "    </div>\n\n    <div class=\"column\" id=\"my_subscribed_tweets\">\n        <h2>My Subscribed Tweets</h2>\n\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.subscribed_tweets : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + "    </div>\n\n\n</div>\n";
},"usePartial":true,"useData":true});
})();