(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['attendeventsummary'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.location || (depth0 != null ? depth0.location : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"location","hash":{},"data":data}) : helper)));
},"3":function(container,depth0,helpers,partials,data) {
    return "TBD";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return "      <p class=\"event_desc\">"
    + container.escapeExpression(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<!-- store event ID info in the event-container -->\n<div class=\"column attend-event-container\" id="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n  <div class=\"event\">\n    <p class=\"event_name\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span></p>\n    <hr>\n    <p class=\"host-email\">Host: "
    + alias4(((helper = (helper = helpers.hostEmail || (depth0 != null ? depth0.hostEmail : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"hostEmail","hash":{},"data":data}) : helper)))
    + "</p>\n    <p class=\"start_date\">Start: "
    + alias4(((helper = (helper = helpers.start || (depth0 != null ? depth0.start : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"start","hash":{},"data":data}) : helper)))
    + " @ "
    + alias4(((helper = (helper = helpers.start_time || (depth0 != null ? depth0.start_time : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"start_time","hash":{},"data":data}) : helper)))
    + "</p>\n    <p class=\"end_date\">End: "
    + alias4(((helper = (helper = helpers.end || (depth0 != null ? depth0.end : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"end","hash":{},"data":data}) : helper)))
    + " @ "
    + alias4(((helper = (helper = helpers.end_time || (depth0 != null ? depth0.end_time : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"end_time","hash":{},"data":data}) : helper)))
    + "</p>\n    <p class=\"event_loc\">Location: "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.location : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</p>\n\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.description : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\n</div>\n";
},"useData":true});
templates['attendfeed'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.attendeventsummary,depth0,{"name":"attendeventsummary","data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    return "    <p><em>No events yet!</em></p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.header,depth0,{"name":"header","hash":{"title":(depth0 != null ? depth0.title : depth0),"currentUser":(depth0 != null ? depth0.currentUser : depth0)},"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<br><br> <!-- Remove these after you do all of the css -->\n<div id=\"attendfeed\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.my_events : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\n</div>\n";
},"usePartial":true,"useData":true});
templates['event'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.location || (depth0 != null ? depth0.location : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"location","hash":{},"data":data}) : helper)));
},"3":function(container,depth0,helpers,partials,data) {
    return "TBD";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return "      <p class=\"event_desc\">"
    + container.escapeExpression(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<!-- store event ID info in the event-container -->\n<div class=\"column event-container\" id="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n  <div class=\"event\">\n    <p class=\"event_name\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "<span class=\"glyphicon glyphicon-remove delete-event\"></span></p>\n    <hr>\n    <p class=\"host-email\">Host: "
    + alias4(((helper = (helper = helpers.hostEmail || (depth0 != null ? depth0.hostEmail : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"hostEmail","hash":{},"data":data}) : helper)))
    + "</p>\n    <p class=\"start_date\">Start: "
    + alias4(((helper = (helper = helpers.start || (depth0 != null ? depth0.start : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"start","hash":{},"data":data}) : helper)))
    + " @ "
    + alias4(((helper = (helper = helpers.start_time || (depth0 != null ? depth0.start_time : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"start_time","hash":{},"data":data}) : helper)))
    + "</p>\n    <p class=\"end_date\">End: "
    + alias4(((helper = (helper = helpers.end || (depth0 != null ? depth0.end : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"end","hash":{},"data":data}) : helper)))
    + " @ "
    + alias4(((helper = (helper = helpers.end_time || (depth0 != null ? depth0.end_time : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"end_time","hash":{},"data":data}) : helper)))
    + "</p>\n    <p class=\"event_loc\">Location: "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.location : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</p>\n\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.description : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\n</div>\n";
},"useData":true});
templates['events'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.event,depth0,{"name":"event","data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    return "    <p><em>No events yet!</em></p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.header,depth0,{"name":"header","hash":{"title":(depth0 != null ? depth0.title : depth0),"currentUser":(depth0 != null ? depth0.currentUser : depth0)},"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "\n<div id=\"events\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.my_events : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\n\n    <div class=\"column btn btn-default\" id=\"new_event\">\n      <p>+ Add a new event</p>\n    </div>\n\n\n</div>\n";
},"usePartial":true,"useData":true});
templates['header'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        <button class=\"currentUser\" id=\"logout-link\">Log out</button>\n        <p class=\"currentUser\">Welcome, "
    + container.escapeExpression(((helper = (helper = helpers.currentUser || (depth0 != null ? depth0.currentUser : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"currentUser","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "        <button class=\"currentUser\" id=\"signin-btn\">Sign in</button>\n        <button class=\"currentUser\" id=\"register-btn\">Register</button>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<div id=\"header\">\n    <p> Pocket Planner</p>\n    <button id=\"home-link\">Home</button>\n    <p id=\"title\">"
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</p>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.currentUser : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true});
templates['index'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.header,depth0,{"name":"header","hash":{"currentUser":(depth0 != null ? depth0.currentUser : depth0)},"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "\n<div id=\"homepage\">\n    <h1>Pocket Planner</h1>\n    <p>To create an event login</p>\n    <button id=\"organize-events\">Organize</button>\n    <button id=\"attend-events\" name=\"attend\">Attend</button>\n</div>\n";
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
templates['rsvp'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.locals : depth0)) != null ? stack1.location : stack1), depth0));
},"3":function(container,depth0,helpers,partials,data) {
    return "TBD";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "        <p class=\"event_desc\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.locals : depth0)) != null ? stack1.description : stack1), depth0))
    + "</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {};

  return "<div class=\"rsvp-container\" id="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.locals : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n  <div class=\"column attend-event-container\" id="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.locals : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n    <div class=\"event\">\n      <p class=\"event_name\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.locals : depth0)) != null ? stack1.name : stack1), depth0))
    + "</span></p>\n      <hr>\n      <p class=\"host-email\">Host: "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.locals : depth0)) != null ? stack1.hostEmail : stack1), depth0))
    + "</p>\n      <p class=\"start_date\">Start: "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.locals : depth0)) != null ? stack1.start : stack1), depth0))
    + " @ "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.locals : depth0)) != null ? stack1.start_time : stack1), depth0))
    + "</p>\n      <p class=\"end_date\">End: "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.locals : depth0)) != null ? stack1.end : stack1), depth0))
    + " @ "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.locals : depth0)) != null ? stack1.end_time : stack1), depth0))
    + "</p>\n      <p class=\"event_loc\">Location: "
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.locals : depth0)) != null ? stack1.location : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</p>\n\n"
    + ((stack1 = helpers["if"].call(alias3,(depth0 != null ? depth0.description : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n  </div>\n  <div>\n    <form name=\"attendee-status\">\n      <input name=\"email\" placeholder=\"Email [required]\">\n      <input name=\"name\" placeholder=\"Your name [required]\">\n      <textarea name=\"note\" placeholder=\"Comments\"></textarea>\n      <button type=\"submit\" name=\"attending\" value=\"1\">Yes</button>\n      <button type=\"submit\" name=\"attending\" value=\"0\">No</button>\n    </form>\n  </div>\n</div>\n";
},"useData":true});
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
templates['todo'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "  <div class=\"todo\">\n    <div class=\"checkbox-container\">\n      <input type=\"checkbox\" "
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias2).call(alias1,(depth0 != null ? depth0.status : depth0),1,{"name":"equal","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " class=\"check-todo\" todoId="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n    </div>\n    <div class=\"todo-content\" todoId="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n      <p>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "<span class=\"glyphicon glyphicon-remove delete-todo\"></span></p>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.deadline : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.priority : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n    <br>\n\n  </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return " checked=\"true\"";
},"4":function(container,depth0,helpers,partials,data) {
    var helper;

  return "      <p><small>Deadline: "
    + container.escapeExpression(((helper = (helper = helpers.deadline || (depth0 != null ? depth0.deadline : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"deadline","hash":{},"data":data}) : helper)))
    + "</small></p>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var helper;

  return "      <p><small>Priority: "
    + container.escapeExpression(((helper = (helper = helpers.priority || (depth0 != null ? depth0.priority : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"priority","hash":{},"data":data}) : helper)))
    + "</small></p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.todos : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  <button class=\"btn btn-default add_todo\">Add a To-Do</button>\n";
},"useData":true});
templates['todos'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <div class=\"column todo-container\" categoryId="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n      <p class=\"category\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "<span class=\"glyphicon glyphicon-remove delete-category\"></span></p>\n      <hr>\n"
    + ((stack1 = container.invokePartial(partials.todo,depth0,{"name":"todo","data":data,"indent":"      ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "    </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "    <p><em>No todo lists yet!</em></p>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <li costId="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n          <p><span class=\"bold\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span><span class=\"glyphicon glyphicon-remove remove-cost\"></span></p>\n          <p>Amount: $"
    + alias4(((helper = (helper = helpers.amount || (depth0 != null ? depth0.amount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"amount","hash":{},"data":data}) : helper)))
    + "</p>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.description : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </li>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var helper;

  return "            <p>Description: "
    + container.escapeExpression(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "        <p>No costs yet.</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {};

  return ((stack1 = container.invokePartial(partials.header,depth0,{"name":"header","hash":{"title":(depth0 != null ? depth0.title : depth0),"currentUser":(depth0 != null ? depth0.currentUser : depth0)},"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<div id=\"category-container\" eventId="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n"
    + ((stack1 = helpers.each.call(alias3,((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.categories : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\n  <div class=\"column btn btn-default\" id=\"new_category\">\n    <p>+ Add a new To-Do list</p>\n  </div>\n  <div id=\"event_panel\" eventId="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n    <div class=\"error\"></div>\n    <div id=\"event_editable\">\n      <h3 id=\"event_name\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.name : stack1), depth0))
    + "<span class=\"glyphicon glyphicon-pencil\" id=\"edit-event\"></span></h3>\n      <hr>\n      <p id=\"event-start\"><span class=\"bold\">Start:</span> <span id=\"start-date\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.start : stack1), depth0))
    + "</span> @ <span id=\"start-time\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.start_time : stack1), depth0))
    + "</span></p>\n      <p id=\"event-end\"><span class=\"bold\">End:</span> <span id=\"end-date\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.end : stack1), depth0))
    + "</span> @ <span id=\"end-time\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.end_time : stack1), depth0))
    + "</span></p>\n      <p id=\"event-loc\"><span class=\"bold\">Location:</span> "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.location : stack1), depth0))
    + "</p>\n      <p id=\"event-desc\"><span class=\"bold\">Description:</span>  "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.description : stack1), depth0))
    + "</p>\n      <p id=\"event-budget\"><span class=\"bold\">Budget:</span> "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.budget : stack1), depth0))
    + "</p>\n    </div>\n\n    <div id=\"event-edit-form\" style=\"display:none\">\n\n      <h3 id=\"event_name_edit\" class=\"edit\"  contenteditable=\"true\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.name : stack1), depth0))
    + "</h3>\n      <hr>\n      <p id=\"event-start\"><span class=\"bold\">Start:</span></p><input type=\"text\" id=\"edit-start-date\" placeholder="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.start : stack1), depth0))
    + "> @ <input type=\"time\" id=\"edit-start-time\" value="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.start_time_24 : stack1), depth0))
    + ">\n      <br>\n      <br>\n      <p id=\"event-end\"><span class=\"bold\">End:</span></p><input type=\"text\" id=\"edit-end-date\" placeholder="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.end : stack1), depth0))
    + "> @ <input type=\"time\" id=\"edit-end-time\" value="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.end_time_24 : stack1), depth0))
    + ">\n      <br>\n      <br>\n      <span class=\"bold\">Location:</span><p id=\"edit-event-loc\" class=\"edit\" contenteditable=\"true\"> "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.location : stack1), depth0))
    + "</p>\n      <br>\n      <span class=\"bold\">Description:</span> <p id=\"edit-event-desc\" class=\"edit\" contenteditable=\"true\"> "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.description : stack1), depth0))
    + "</p>\n      <br>\n      <span class=\"bold\">Budget:</span><p id=\"edit-event-budget\" class=\"edit\" contenteditable=\"true\"> "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.budget : stack1), depth0))
    + "</p>\n\n      <button class=\"btn btn-default\" id=\"submit-edit-event\">Submit</button>\n      <button class=\"btn btn-default\" id=\"cancel-edit-event\">Cancel</button>\n    </div>\n    <hr>\n    <div>\n      <p class=\"bold\">Invite link:</p><a href=/attend/"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1._id : stack1), depth0))
    + ">pocketplanner.herokuapp.com/attend/"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1._id : stack1), depth0))
    + "</a>\n      <p><span class=\"bold\">Number attendees:</span>  "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.attendees : stack1)) != null ? stack1.length : stack1), depth0))
    + "</p>\n      <hr>\n    </div>\n    <div id=\"cost-list\" eventId="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n      <p class=\"bold\">Costs</p>\n      <ul>\n"
    + ((stack1 = helpers.each.call(alias3,((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.cost : stack1),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(8, data, 0),"data":data})) != null ? stack1 : "")
    + "      </ul>\n      <button class=\"btn btn-default\" id=\"add-cost\">Add Cost</button>\n    </div>\n    <div id=\"add-cost-form\" style=\"display:none\" eventId="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n      <div class=\"error\"></div>\n      <br>\n      <input id=\"cost-name\" placeholder=\"Name of cost [required]\">\n      <br>\n      <input id=\"cost-amount\" placeholder=\"Amount (in $) [required]\">\n      <br>\n      <input id=\"cost-desc\" placeholder=\"Description\">\n      <br>\n\n      <button class=\"btn btn-default\"  id=\"submit-cost\">Submit Cost</button>\n      <br>\n      <button class=\"btn btn-default\" id=\"cancel-cost\">Cancel</button>\n    </div>\n  </div>\n\n</div>\n";
},"usePartial":true,"useData":true});
})();