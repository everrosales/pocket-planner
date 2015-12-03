(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['attendeventsummary'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "<i class=\"material-icons right delete-event\">star</i>";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.location || (depth0 != null ? depth0.location : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"location","hash":{},"data":data}) : helper)));
},"5":function(container,depth0,helpers,partials,data) {
    return "TBD";
},"7":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        <p class=\"event_desc\">"
    + container.escapeExpression(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<!-- store event ID info in the event-container -->\n<div class=\"col m3 s12\">\n  <div class=\"card attend-event-container\" eventId="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n    <div class=\"card-content event\">\n      "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.is_mine : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n      <p><span class=\"card-title\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span></p>\n      <hr>\n      <p class=\"host-email\">Host: "
    + alias4(((helper = (helper = helpers.hostEmail || (depth0 != null ? depth0.hostEmail : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"hostEmail","hash":{},"data":data}) : helper)))
    + "</p>\n      <p>Start: "
    + alias4(((helper = (helper = helpers.start || (depth0 != null ? depth0.start : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"start","hash":{},"data":data}) : helper)))
    + " @ "
    + alias4(((helper = (helper = helpers.start_time || (depth0 != null ? depth0.start_time : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"start_time","hash":{},"data":data}) : helper)))
    + "</p>\n      <p>End: "
    + alias4(((helper = (helper = helpers.end || (depth0 != null ? depth0.end : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"end","hash":{},"data":data}) : helper)))
    + " @ "
    + alias4(((helper = (helper = helpers.end_time || (depth0 != null ? depth0.end_time : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"end_time","hash":{},"data":data}) : helper)))
    + "</p>\n      <p class=\"event_loc\">Location: "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.location : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "</p>\n\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.description : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n  </div>\n</div>\n";
},"useData":true});
templates['attendfeed'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.attendeventsummary,depth0,{"name":"attendeventsummary","data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    return "        <p><em>No events yet!</em></p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.header,depth0,{"name":"header","hash":{"title":(depth0 != null ? depth0.title : depth0),"currentUser":(depth0 != null ? depth0.currentUser : depth0)},"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<!-- <br><br>  Remove these after you do all of the css -->\n<div id=\"attendfeed\">\n  <div class=\"container\">\n    <h1>Upcoming Events</h1>\n    <div class=\"row\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.my_events : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "    </div>\n  </div>\n</div>\n";
},"usePartial":true,"useData":true});
templates['event'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "<i class=\"material-icons right delete-event\">clear</i>";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.location || (depth0 != null ? depth0.location : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"location","hash":{},"data":data}) : helper)));
},"5":function(container,depth0,helpers,partials,data) {
    return "TBD";
},"7":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        <p class=\"event_desc\">Description: "
    + container.escapeExpression(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<!-- store event ID info in the event-container -->\n<div class=\"col m3 s12\">\n  <div class=\"card event-container\" eventId="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n    <div class=\"card-content event\">\n      "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.is_mine : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n      <p><span class=\"card-title\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span></p>\n      <hr>\n      <p class=\"host-email\">Host: "
    + alias4(((helper = (helper = helpers.hostEmail || (depth0 != null ? depth0.hostEmail : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"hostEmail","hash":{},"data":data}) : helper)))
    + "</p>\n      <p>Start: "
    + alias4(((helper = (helper = helpers.start || (depth0 != null ? depth0.start : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"start","hash":{},"data":data}) : helper)))
    + " @ "
    + alias4(((helper = (helper = helpers.start_time || (depth0 != null ? depth0.start_time : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"start_time","hash":{},"data":data}) : helper)))
    + "</p>\n      <p>End: "
    + alias4(((helper = (helper = helpers.end || (depth0 != null ? depth0.end : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"end","hash":{},"data":data}) : helper)))
    + " @ "
    + alias4(((helper = (helper = helpers.end_time || (depth0 != null ? depth0.end_time : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"end_time","hash":{},"data":data}) : helper)))
    + "</p>\n      <p class=\"event_loc\">Location: "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.location : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "</p>\n\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.description : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n  </div>\n</div>\n";
},"useData":true});
templates['events'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.event,depth0,{"name":"event","data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    return "        <p><em>No events yet!</em></p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.header,depth0,{"name":"header","hash":{"title":(depth0 != null ? depth0.title : depth0),"currentUser":(depth0 != null ? depth0.currentUser : depth0)},"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "\n<div id=\"events\">\n  <div class=\"container\">\n    <div class=\"row\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.my_events : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\n      <div class=\"col m3 s12\" id=\"new_event\">\n        <div class=\"card\">\n          <div class=\"card-content\">\n            <span class=\"card-title\">Create</span>\n            <p>\n              Create and start planning a new event\n            </p>\n          </div>\n          <div class=\"card-action\">\n            <a class=\"waves-effect waves-light white-text btn\">New Event</a>\n          </div>\n        </div>\n        <!-- <p>+ Add a new event</p> -->\n      </div>\n    </div>\n  </div>\n\n  <div id=\"new-event-modal\" class=\"modal\">\n    <div class=\"modal-content\">\n      <h2>Create New Event</h2>\n      <div class=\"row\">\n        <form id=\"new-event-form\">\n          <div class=\"row\">\n            <div class=\"input-field col s12\">\n              <input name='eventname' type=\"text\" class=\"validate\" required>\n              <label for='eventname'>Event Name</label>\n            </div>\n          </div>\n          <div class=\"row\">\n            <div class=\"input-field col s6\">\n              <input name='start_date' type=\"date\" id='start_date' class=\"datepicker start_date\" required>\n              <label for='start_date'>Start Date</label>\n            </div>\n            <div class=\"input-field col s6\">\n              <input name='end_date' type=\"date\" id='end_date' class=\"datepicker end_date\" required>\n              <label for='end_date'>End Date</label>\n            </div>\n          </div>\n          <div class=\"row\">\n            <div class=\"input-field col s6\">\n              <input name='start_time' type=\"time\">\n              <!--<label for='start_time'>Start Time</label>-->\n            </div>\n            <div class=\"input-field col s6\">\n              <input name=\"end_time\" type=\"time\">\n              <!--<label for=\"end_time\">End Time</label>-->\n            </div>\n          </div>\n        </form>\n      </div>\n    </div>\n    <div class=\"modal-footer\">\n      <a href=\"#!\" class='waves-effect waves-light btn-flat btn' id='add-event-button'>Add event</a>\n      <a href=\"#!\" class='modal-action modal-close waves-effect waves-light btn-flat btn' id='cancel-event-button'>Cancel</a>\n    </div>\n  </div>\n  <!-- <div class='column' id='new-event-container'>\n    <div class='event'>\n      <div class='error'></div>\n      <input type='text' id='event-name' placeholder='Event name'>\n      <br>\n      <input type='text' id='start-date' placeholder='Start date'>\n      <br>\n      <input type='time' id='start-time' placeholder='Start time'>\n      <br>\n      <input type='text' id='end-date' placeholder='End date'>\n      <br>\n      <input type='time' id='end-time' placeholder='End time'>\n      <div class='btn btn-default' id='add-event-button'>Add event</div>\n      <div class='btn btn-default' id='cancel-event-button'>Cancel</div>\n    </div>\n  </div> -->\n\n</div>\n";
},"usePartial":true,"useData":true});
templates['header'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "            <li>"
    + container.escapeExpression(((helper = (helper = helpers.currentUser || (depth0 != null ? depth0.currentUser : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"currentUser","hash":{},"data":data}) : helper)))
    + "</li>\n            <li><a id=\"logout-link\" class=\"waves-effect waves-light\" href=\"#\">Logout </a></li>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "            <li><a id=\"signin-btn\" class=\"waves-effect waves-light\" href=\"#\">Sign in </a></li>\n            <li><a id=\"register-btn\" class=\"waves-effect waves-light\" href=\"#\">Sign up</a></li>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "            <li><a id=\"logout-link\" class=\"waves-effect waves-light currentUser\" href=\"#\">Logout</a></li>\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "            <li><a id=\"signin-btn\" class=\"waves-effect waves-light currentUser\" href=\"#\">Sign in</a></li>\n            <li><a id=\"register-btn\" class=\"waves-effect waves-light currentUser\" href=\"#\">Sign up</a></li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "<div id=\"header\">\n  <div class=\"navbar-fixed\">\n    <nav>\n      <div class=\"nav-wrapper blue-grey\">\n        <a href=\"/\" class=\"brand-logo\">Pocket Planner</a>\n        <a href=\"#\" data-activates=\"mobile-header\" class=\"button-collapse\"><i class=\"material-icons\">menu</i></a>\n        <ul class=\"right hide-on-small-only\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.currentUser : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "        </ul>\n        <ul class=\"side-nav\" id=\"mobile-header\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.currentUser : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + "        </ul>\n      </div>\n    </nav>\n  </div>\n  <script>\n    // Used for simple window collapse for mobile and small screens\n    $(document).ready(function() {\n      $(\".button-collapse\").sideNav();\n    });\n  </script>\n\n  <div id=\"login-modal\" class=\"modal\">\n    <div class=\"modal-content\">\n      <h2>Sign in</h2>\n      <div class=\"row\">\n        <form id=\"signin-form\" class=\"col s12\">\n          <div class=\"row\">\n            <div class=\"input-field col s12\">\n              <input name=\"username\" type=\"email\" class=\"validate\" required>\n              <label for=\"username\">Email</label>\n            </div>\n          </div>\n          <div class=\"row\">\n            <div class=\"input-field col s12\">\n              <input name=\"password\" type=\"password\" class=\"validate\" required>\n              <label for=\"password\">Password</label>\n            </div>\n          </div>\n        </form>\n      </div>\n    </div>\n    <div class=\"modal-footer\">\n      <a href=\"#!\" id=\"login-cancel\" class=\"modal-action modal-close waves-effect waves-green btn-flat btn\">Cancel</a>\n      <a href=\"#!\" id=\"login-submit\" type=\"submit\" class=\"waves-effect waves-green btn-flat btn\">Submit</a>\n    </div>\n  </div>\n\n  <div id=\"signup-modal\" class=\"modal\">\n    <div class=\"modal-content\">\n      <h2>Sign up</h2>\n      <div class=\"row\">\n        <form id=\"signup-form\" class=\"col s12\">\n          <div class=\"row\">\n            <div class=\"input-field col s6\">\n              <input name=\"username\" type=\"email\" class=\"validate\" required>\n              <label for=\"username\">Email</label>\n            </div>\n\n            <div class=\"input-field col s6\">\n              <input name=\"confirmusername\" type=\"email\" class=\"validate\" required>\n              <label for=\"confirmusername\">Confirm Email</label>\n            </div>\n          </div>\n          <div class=\"row\">\n            <div class=\"input-field col s6\">\n              <input name=\"password\" type=\"password\" class=\"validate\" required>\n              <label for=\"password\">Password</label>\n            </div>\n            <div class=\"input-field col s6\">\n              <input name=\"confirmpassword\" type=\"password\" class=\"validate\" required>\n              <label for=\"confirmpassword\">Confirm Password</label>\n            </div>\n          </div>\n        </form>\n      </div>\n    </div>\n    <div class=\"modal-footer\">\n      <a href=\"#!\" id=\"signup-cancel\" class=\"modal-action modal-close waves-effect waves-green btn-flat btn\">Cancel</a>\n      <a href=\"#!\" id=\"signup-submit\" type=\"submit\" class=\"waves-effect waves-green btn-flat btn\">Submit</a>\n    </div>\n  </div>\n</div>\n";
},"useData":true});
templates['index'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "      <div class=\"navbar\">\n        <nav class=\"nav-error white red-text accent-1-text\">\n          <div class=\"nav-error center\">\n            You need to be logged in to create an event\n          </div>\n        </nav>\n      </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"homepage\">\n"
    + ((stack1 = container.invokePartial(partials.header,depth0,{"name":"header","hash":{"currentUser":(depth0 != null ? depth0.currentUser : depth0)},"data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "    <div>\n"
    + ((stack1 = helpers.unless.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.currentUser : depth0),{"name":"unless","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      <div class=\"slider background-slider hide-on-small-only\">\n        <ul class=\"slides\">\n          <li>\n            <img class=\"responsive-img\" src=\"/imgs/concert.jpg\">\n          </li>\n          <li>\n            <img class=\"responsive-img\" src=\"/imgs/fight.jpg\">\n          </li>\n          <li>\n            <img class=\"responsive-img\" src=\"/imgs/fireworks.jpg\">\n          </li>\n          <li>\n            <img class=\"responsive-img\" src=\"/imgs/timessquare.jpg\">\n          </li>\n        </ul>\n      </div>\n      <script>\n        // Used to intialize the slider\n        $(document).ready(function(){\n          $('.slider').slider({\n            full_width: true,\n            indicators: false,\n            interval: 3000,\n            height: 300\n          });\n        });\n      </script>\n      <div class=\"container\">\n        <h1 class=\"center\">Pocket Planner</h1>\n        <!-- <p>To create an event login</p> -->\n        <div class=\"section\">\n          <div class=\"row\">\n            <div class=\"col s12 m6\">\n              <div class=\"card white hoverable\">\n                <div class=\"card-content\">\n                  <span class=\"card-title\">Organize <i class=\"material-icons\">edit</i></span>\n                  <p> Create a new event! <br>\n                    We'll help you keep track of your progress and remind you of different\n                    things you need to get done. We can also help you keep track of who's coming.</p>\n                </div>\n                <div class=\"card-action\">\n                  <a id=\"organize-events\" class=\" waves-effect waves-light center white-text btn\">Organize</a>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"col s12 m6\">\n              <div class=\"card white hoverable\">\n                <div class=\"card-content\">\n                  <span class=\"card-title\">Attend <i class=\"material-icons\">group</i></span>\n                  <p>Attend an event! <br>\n                    Find an awesome event you can attend and let the organizers you are going.\n                    We'll keep you posted and let you know if their plans change. </p>\n                </div>\n                <div class=\"card-action\">\n                  <a id=\"attend-events\" name=\"attend\" class=\" waves-effect waves-light white-text btn\">Attend</a>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n\n</div>\n";
},"usePartial":true,"useData":true});
templates['register'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        "
    + container.escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"error","hash":{},"data":data}) : helper)))
    + "\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.header,(depth0 != null ? depth0.currentUser : depth0),{"name":"header","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<!-- DEPRECATED: Use signup-modal instead -->\n<div id=\"register\">\n  <h1>Register</h1>\n  <div class=\"error\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\n  <form id=\"register-form\">\n    <div>Username: <input type=\"text\" name=\"username\" required /></div>\n    <div>Password: <input type=\"password\" name=\"password\" required /></div>\n    <div>Confirm Password: <input type=\"password\" name=\"confirm\" required /></div>\n    <input type=\"submit\" />\n  </form>\n</div>\n";
},"usePartial":true,"useData":true});
templates['rsvp'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.location || (depth0 != null ? depth0.location : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"location","hash":{},"data":data}) : helper)));
},"3":function(container,depth0,helpers,partials,data) {
    return "TBD";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return "            <div class=\"row\">\n              "
    + container.escapeExpression(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"description","hash":{},"data":data}) : helper)))
    + "\n            </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"rsvp\">\n"
    + ((stack1 = container.invokePartial(partials.header,depth0,{"name":"header","hash":{"currentUser":(depth0 != null ? depth0.currentUser : depth0)},"data":data,"indent":"  ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "  <div class=\"container grey lighten-3\">\n    <div id=\"rsvp-summary-card\" class=\"card large\">\n      <div id=\"rsvp-summary-image\" class=\"card-image teal\">\n        <span class=\"card-title\">event details</span>\n      </div>\n      <div id=\"rsvp-summary-content\" class=\"card-content\">\n          <div class=\"row\">\n            <h2>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</h2>\n            <blockquote id=\"rsvp-summary-details\">\n              Host: "
    + alias4(((helper = (helper = helpers.hostEmail || (depth0 != null ? depth0.hostEmail : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"hostEmail","hash":{},"data":data}) : helper)))
    + " <br>\n              Start: "
    + alias4(((helper = (helper = helpers.start || (depth0 != null ? depth0.start : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"start","hash":{},"data":data}) : helper)))
    + " @ "
    + alias4(((helper = (helper = helpers.start_time || (depth0 != null ? depth0.start_time : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"start_time","hash":{},"data":data}) : helper)))
    + " <br>\n              End: "
    + alias4(((helper = (helper = helpers.end || (depth0 != null ? depth0.end : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"end","hash":{},"data":data}) : helper)))
    + " @ "
    + alias4(((helper = (helper = helpers.end_time || (depth0 != null ? depth0.end_time : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"end_time","hash":{},"data":data}) : helper)))
    + " <br>\n              Location: "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.location : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\n            </blockquote>\n          </div>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.description : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        <form id=\"attendee-status\" action=\"#\">\n          <h3>Are you going?</h3>\n          <div class=\"row\">\n            <div class=\"input-field col s6\">\n              <input name=\"email\" type=\"email\" class=\"validate\">\n              <label for=\"email\">Email</label>\n            </div>\n            <div class=\"input-field col s6\">\n              <input name=\"name\" type=\"text\" class=\"validate\">\n              <label for=\"name\">Name</label>\n            </div>\n            <div class=\"input-field col s12\">\n              <textarea id=\"rsvp-comments\" name=\"note\" class=\"materialize-textarea\"></textarea>\n              <label for=\"note\">Comments</label>\n            </div>\n          </div>\n        </form>\n      </div>\n      <div class=\"card-action\">\n        <button eventId = \""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" class=\"rsvp-attend waves-effect waves-light btn-flat\" name=\"attending\" value=\"1\">Yes</button>\n        <button eventId = \""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" class=\"rsvp-attend waves-effect waves-light btn-flat\" name=\"attending\" value=\"0\">No</button>\n      </div>\n\n    </div>\n  </div>\n  <div>\n\n  </div>\n</div>\n";
},"usePartial":true,"useData":true});
templates['signin'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        "
    + container.escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"error","hash":{},"data":data}) : helper)))
    + "\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.header,(depth0 != null ? depth0.currentUser : depth0),{"name":"header","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<!-- DEPRECATED: Use login-modal instead -->\n<div id=\"signin\">\n  <h1>Sign in</h1>\n  <div class=\"error\">\n"
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

  return "  <div class=\"todo\" todoId="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n\n    <div class=\"todo-info\">\n      <i class=\"material-icons right delete-todo\">clear</i><i class=\"material-icons right edit-todo\">edit</i>\n      <p>\n        <input class=\"check-todo\" type=\"checkbox\" "
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias2).call(alias1,(depth0 != null ? depth0.status : depth0),1,{"name":"equal","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " todoId="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + " id=\"todo-name-"
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" >\n        <label for=\"todo-name-"
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</label>\n      </p>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.deadline : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.priority : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n    <div class=\"edit-todo-form\" style=\"display:none\">\n\n      <label class=\"active\" for=\"edit-todo-name\">Todo Name</label>\n      <input class=\"edit-todo-name\" name=\"edit-todo-name\" value="
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + " type=\"text\">\n\n      <label class=\"active\" for=\"edit-todo-deadline\">Deadline</label>\n      <input class=\"edit-todo-deadline\" type=\"text\" name=\"edit-todo-deadline\" value="
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.deadline : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n\n      <label class=\"active\" for=\"edit-todo-priority\">Priority (1-10)</label>\n      <input class=\"edit-todo-priority\" type=\"number\" max=\"10\" min=\"1\" value="
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.priority : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n\n      <br>\n      <button class=\"waves-effect waves-light btn btn-default submit-edit-todo\">Submit</button>\n      <button class=\"waves-effect waves-light btn btn-default cancel-edit-todo\">Cancel</button>\n\n    </div>\n  </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return " checked=\"true\"";
},"4":function(container,depth0,helpers,partials,data) {
    var helper;

  return "      <small>Deadline: "
    + container.escapeExpression(((helper = (helper = helpers.deadline || (depth0 != null ? depth0.deadline : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"deadline","hash":{},"data":data}) : helper)))
    + "</small>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var helper;

  return "      <br><small>Priority (1-10): "
    + container.escapeExpression(((helper = (helper = helpers.priority || (depth0 != null ? depth0.priority : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"priority","hash":{},"data":data}) : helper)))
    + "</small>\n";
},"8":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.deadline || (depth0 != null ? depth0.deadline : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"deadline","hash":{},"data":data}) : helper)));
},"10":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.priority || (depth0 != null ? depth0.priority : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"priority","hash":{},"data":data}) : helper)));
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.todos : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n\n<!-- Using this to temporarily hold state -->\n<!-- DEPRECATED -->\n<!-- <div id='new-category-container'>\n  <div class='event'>\n    <div class='input-field col s3'>\n      <input id='category-title' type='text' placeholder='To-Do List Title'>\n      <label for='category-title'>New Category Title</label>\n    </div>\n    <div class='btn btn-default' id='add-category-button'>Add To-Do List</div>\n    <div class='btn btn-default' id='cancel-category-button'>Cancel</div>\n    </div>\n  </div>\n</div> -->\n\n<!-- Using this to temporarily hold state -->\n<!-- DEPRECATED -->\n<!-- var htmlStr =\n  \"<div class='new-todo-form'>\" +\n  \"<div class='input-field col s12'>\" +\n  \"  <input type='text' id='todo-name'> \" +\n  \"  <label for='todo-name'>Name</label> \" +\n  \"</div>\" +\n  \"<div class='input-field col s12'> \" +\n  \"  <input type='text' id='deadline'> \" +\n  \"  <label for='deadline'>Deadline</label> \" +\n  \"</div>\" +\n  \"<div class='btn btn-default' id='add-todo'>Add To-do</div> \" +\n  \"<div class='btn btn-default' id='cancel-add-todo'>Cancel</div></div>\" -->\n";
},"useData":true});
templates['todos'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <div class=\"todo-container card-panel col s12 m6 l3\" categoryId="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n      <div class=\"inner-todo-container\">\n\n        <p class=\"category\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "<i class=\"material-icons right delete-category\">clear</i><i class=\"material-icons right edit-category\">edit</i></p>\n\n        <div class=\"edit-category-form\" style=\"display:none\">\n          <label for=\"edit-category-name\" class=\"active\">Todo List Name<input class=\"edit-category-name\" value=\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\" name=\"edit-category-name\" type=\"text\"></label>\n\n\n          <button class=\"waves-effect waves-light btn btn-default submit-edit-category\">Submit</button>\n          <button class=\"waves-effect waves-light btn btn-default cancel-edit-category\">Cancel</button>\n        </div>\n\n        <hr>\n"
    + ((stack1 = container.invokePartial(partials.todo,depth0,{"name":"todo","data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "        <br>\n        <br>\n        <div class=\"new-todo-form\" style=\"display:none\">\n          <div class=\"input-field col s12\">\n            <input type=\"text\" name=\"todo-name\" class=\"todo-name\">\n            <label for=\"todo-name\">Todo name</label>\n          </div>\n          <div class=\"input-field col s12\">\n            <input type=\"text\" class=\"deadline\">\n            <label for=\"deadline\">Deadline</label>\n          </div>\n          <div class=\"input-field col s12\">\n            <input type=\"number\" min=\"1\" max=\"10\" class=\"priority\">\n            <label for=\"priority\">Priority (1-10)</label>\n          </div>\n          <button class=\"btn btn-default\" id=\"add-todo\">Add Todo</button>\n          <button class=\"btn btn-default\" id=\"cancel-add-todo\">Cancel</button>\n        </div>\n        <button class=\"waves-effect waves-light btn btn-default add_todo\">Add a To-Do</button>\n      </div>\n    </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "    <p><em>No todo lists yet!</em></p>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <li costId=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\">\n              <div class=\"collapsible-header\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + " - $"
    + alias4(((helper = (helper = helpers.amount || (depth0 != null ? depth0.amount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"amount","hash":{},"data":data}) : helper)))
    + "<span class=\"badge\"><i class=\"material-icons remove-cost\">clear</i></span></div>\n              <div class=\"collapsible-body\">\n                <p>Amount: $"
    + alias4(((helper = (helper = helpers.amount || (depth0 != null ? depth0.amount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"amount","hash":{},"data":data}) : helper)))
    + "\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.description : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </p>\n              </div>\n            </li>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                  <br>Description: "
    + container.escapeExpression(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"description","hash":{},"data":data}) : helper)))
    + "\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "          <p>No costs yet.</p>\n";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias2).call(alias1,(depth0 != null ? depth0.attending : depth0),1,{"name":"equal","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias2).call(alias1,(depth0 != null ? depth0.attending : depth0),2,{"name":"equal","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias2).call(alias1,(depth0 != null ? depth0.attending : depth0),0,{"name":"equal","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"11":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "              <li>\n                <p><span class=\"bold green-text lighten-1\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + " "
    + alias4(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"email","hash":{},"data":data}) : helper)))
    + " <i class=\"material-icons green-text lighten-1 right\">check</i></span></p>\n              </li>\n";
},"13":function(container,depth0,helpers,partials,data) {
    var helper;

  return "              <li>\n                <p><span class=\"bold red-text lighten-1\">"
    + container.escapeExpression(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"email","hash":{},"data":data}) : helper)))
    + " <i class=\"material-icons red-text lighten-1 right\">close</i></span></p>\n              </li-\n";
},"15":function(container,depth0,helpers,partials,data) {
    var helper;

  return "              <li>\n                <p><span class=\"bold\">"
    + container.escapeExpression(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"email","hash":{},"data":data}) : helper)))
    + " <i class=\"material-icons right\">more_horiz</i></span></p>\n              </li>\n";
},"17":function(container,depth0,helpers,partials,data) {
    return "            <p>No invitees yet.</p>\n";
},"19":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "            <li plannerId="
    + container.escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n              <p><span class=\"bold\">"
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias2).call(alias1,(depth0 != null ? depth0.username : depth0),(depth0 != null ? depth0.email : depth0),{"name":"equal","hash":{},"fn":container.program(20, data, 0),"inverse":container.program(22, data, 0),"data":data})) != null ? stack1 : "")
    + "</span><span class=\"badge\"><i class=\"material-icons remove-planner\">clear</i></span></p>\n            </li>\n";
},"20":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"email","hash":{},"data":data}) : helper)));
},"22":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return alias4(((helper = (helper = helpers.username || (depth0 != null ? depth0.username : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data}) : helper)))
    + " "
    + alias4(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"email","hash":{},"data":data}) : helper)));
},"24":function(container,depth0,helpers,partials,data) {
    return "            <p>No other planners yet.</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {};

  return ((stack1 = container.invokePartial(partials.header,depth0,{"name":"header","hash":{"title":(depth0 != null ? depth0.title : depth0),"currentUser":(depth0 != null ? depth0.currentUser : depth0)},"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<div id=\"event-row-container\" class=\"row\">\n<div id=\"category-container\" class=\"col m9\" eventId="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n"
    + ((stack1 = helpers.each.call(alias3,((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.categories : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\n  <button class=\"btn btn-default\" id=\"new_category\">+ New To-Do List</button>\n  <div id='new-category-container' style=\"display:none\">\n    <div>\n      <input id='category-title' type='text' placeholder='To-Do List Title'>\n      <br>\n      <div class='btn btn-default' id='add-category-button'>Add To-Do List</div>\n      <div class='btn btn-default' id='cancel-category-button'>Cancel</div>\n    </div>\n  </div>\n\n</div>\n<div id=\"event-panel\" class=\"col m3 s12 z-depth-2\" eventId="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n  <div class=\"row\">\n    <div class=\"col s12\">\n      <!-- <div class=\"error\"></div> -->\n      <ul class=\"tabs\">\n        <li class=\"tab col s4 tab-accent-cyan\">\n          <a class=\"active teal-text\" href=\"#event-details\">Details</a>\n        </li>\n        <li class=\"tab col s4 tab-accent-cyan\">\n          <a class=\"teal-text\" href=\"#event-costs\">Costs</a>\n        </li>\n        <li class=\"tab col s4 tab-accent-cyan\">\n          <a class=\"teal-text\" href=\"#event-invitees\">Invitees</a>\n        </li>\n        <li class=\"tab col s4 tab-accent-cyan\">\n          <a class=\"teal-text\" href=\"#event-planners\">Planners</a>\n        </li>\n      </ul>\n    </div>\n    <div id=\"event-details\" class=\"col s12\">\n      <div id=\"event_editable\">\n        <i class=\"material-icons right\" id=\"edit-event\">edit</i>\n        <!-- Event Summary Info (not editable) -->\n        <h3 id=\"event_name\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.name : stack1), depth0))
    + "</h3>\n        <hr>\n        <span id=\"event-start\">Start: <span id=\"start-date\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.start : stack1), depth0))
    + "</span> @ <span id=\"start-time\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.start_time : stack1), depth0))
    + "</span></span><br>\n        <span id=\"event-end\">End: <span id=\"end-date\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.end : stack1), depth0))
    + "</span> @ <span id=\"end-time\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.end_time : stack1), depth0))
    + "</span></span><br>\n        <span id=\"event-loc\">Location: "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.location : stack1), depth0))
    + "</span><br>\n        <span id=\"event-desc\">Description: "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.description : stack1), depth0))
    + "</span><br>\n        <span id=\"event-budget\">Budget: $"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.budget : stack1), depth0))
    + "</span><br>\n      </div>\n\n      <!-- Input form to update the Event description and information -->\n      <div id=\"event-edit-form\" style=\"display:none\">\n        <div class=\"input-field col s12\">\n          <input id=\"event_name_edit\" name=\"event_name_edit\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.name : stack1), depth0))
    + "\" class=\"validate\" type=\"text\">\n          <label class=\"active\" for=\"event_name_edit\">Event Name</label>\n        </div>\n        <div class=\"input-field col s6\">\n          <input type=\"text\" name=\"edit-start-date\" id=\"edit-start-date\" class=\"datepicker\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.start : stack1), depth0))
    + "\">\n          <label class=\"active\" for=\"edit-start-date\">Start Date</label>\n        </div>\n        <div class=\"input-field col s6\">\n          <input type=\"time\" name=\"edit-start-time\" id=\"edit-start-time\" class=\"validate\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.start_time_24 : stack1), depth0))
    + "\">\n          <label class=\"active\" for=\"edit-start-time\">Start Time</label>\n        </div>\n        <div class=\"input-field col s6\">\n          <input type=\"text\" name=\"edit-end-date\" id=\"edit-end-date\" class=\"datepicker\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.end : stack1), depth0))
    + "\">\n          <label class=\"active\" for=\"edit-end-date\">End Date</label>\n        </div>\n        <div class=\"input-field col s6\">\n          <input type=\"time\" name=\"edit-end-time\" id=\"edit-end-time\" class=\"validate\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.end_time_24 : stack1), depth0))
    + "\">\n          <label class=\"active\" for=\"edit-end-time\">End Time</label>\n        </div>\n        <div class=\"input-field col s12\">\n          <input type=\"text\" name=\"edit-event-loc\" id=\"edit-event-loc\" class=\"validate\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.location : stack1), depth0))
    + "\">\n          <label class=\"active\" for=\"edit-event-loc\">Location</label>\n        </div>\n        <div class=\"input-field col s12\">\n          <textarea id=\"edit-event-desc\" class=\"materialize-textarea\" length=\"50\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.description : stack1), depth0))
    + "</textarea>\n          <label class=\"active\" for=\"edit-event-desc\">Description</label>\n        </div>\n        <div class=\"input-field col s12\">\n          <input type=\"number\" id=\"edit-event-budget\" class=\"validate\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.budget : stack1), depth0))
    + "\">\n          <label class=\"active\" for=\"edit-event-budget\">Budget</label>\n        </div>\n        <button class=\"waves-effect waves-light btn btn-default\" id=\"submit-edit-event\">Submit</button>\n        <button class=\"waves-effect waves-light btn btn-default\" id=\"cancel-edit-event\">Cancel</button>\n      </div>\n      <hr>\n      <div>\n        <p class=\"bold\">Invite link: <br>\n          <a class=\"invite-link\" href=/events/"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1._id : stack1), depth0))
    + "/attend>pocketplanner.herokuapp.com/events/"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1._id : stack1), depth0))
    + "/attend</a>\n        </p>\n        <p><span class=\"bold\">Number attendees:</span>  "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.attendees : stack1)) != null ? stack1.length : stack1), depth0))
    + "</p>\n      </div>\n    </div>\n\n    <div id=\"event-costs\" class=\"col s12\">\n      <!-- Costs for the event -->\n      <div id=\"cost-list\" eventId="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n        <h3>Costs</h3>\n        Budget: $"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.budget : stack1), depth0))
    + "\n        <ul class=\"collapsible\" data-collapsible=\"accordion\">\n"
    + ((stack1 = helpers.each.call(alias3,((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.cost : stack1),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(8, data, 0),"data":data})) != null ? stack1 : "")
    + "        </ul>\n        <script>\n          $(document).ready(function(){\n            $('.collapsible').collapsible({\n              // accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style\n            });\n          });\n          </script>\n        <button class=\"btn btn-default\" id=\"add-cost\">Add Cost</button>\n      </div>\n      <div id=\"add-cost-form\" style=\"display:none\" eventId="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n        <h4>New Cost</h4>\n        <div class=\"input-field col s6\">\n          <input id=\"cost-name\" type=\"text\" class=\"validate\">\n          <label for=\"cost-name\">Name</label>\n        </div>\n        <div class=\"input-field col s6\">\n          <input id=\"cost-amount\" type=\"number\" class=\"validate\">\n          <label for=\"cost-amount\">Amount (in $)</label>\n        </div>\n        <div class=\"input-field col s12\">\n          <input id=\"cost-desc\" type=\"text\" class=\"validate\">\n          <label for=\"cost-desc\">Description</label>\n        </div>\n        <button class=\"waves-effect waves-light btn btn-default\"  id=\"submit-cost\">Submit Cost</button>\n        <button class=\" waves-effect waves-light btn btn-default\" id=\"cancel-cost\">Cancel</button>\n      </div>\n    </div>\n    <div id=\"event-invitees\" class=\"col s12\">\n      <!-- invitee administration -->\n      <div id=\"invitee-list\" eventId= "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n        <h3>Invitees</h3>\n        <ul>\n"
    + ((stack1 = helpers.each.call(alias3,((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.attendees : stack1),{"name":"each","hash":{},"fn":container.program(10, data, 0),"inverse":container.program(17, data, 0),"data":data})) != null ? stack1 : "")
    + "        </ul>\n        <button class=\"btn btn-default\" id=\"add-invitee\">Add Invitee</button>\n      </div>\n      <div id=\"add-invitee-form\" style=\"display:none\" eventId="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n        <h4>New Invitee</h4>\n        <div class=\"input-field col s6\">\n          <input id=\"invitee-email\" type=\"email\" class=\"validate\">\n          <label for=\"invitee-email\">Email</label>\n        </div>\n        <div class=\"input-field col s6\">\n          <input id=\"invitee-email-confirm\" type=\"email\" class=\"validate\">\n          <label for=\"invitee-email-confirm\">Confirm Email</label>\n        </div>\n        <button class=\"waves-effect waves-light btn btn-default\" id=\"submit-invitee\">Invite</button>\n        <button class=\"waves-effect waves-light btn btn-default\" id=\"cancel-planner\">Cancel</button>\n      </div>\n    </div>\n    <div id=\"event-planners\" class=\"col s12\">\n      <!-- Planner adminstration -->\n      <div id=\"planner-list\" eventId = "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n        <h3>Planners</h3>\n        <p> Host: "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.hostEmail : stack1), depth0))
    + " </p>\n        <ul>\n"
    + ((stack1 = helpers.each.call(alias3,((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.planners : stack1),{"name":"each","hash":{},"fn":container.program(19, data, 0),"inverse":container.program(24, data, 0),"data":data})) != null ? stack1 : "")
    + "        </ul>\n        <button class=\"btn btn-default\" id=\"add-planner\">Add Planner</button>\n      </div>\n      <div id=\"add-planner-form\" style=\"display:none\" eventId="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n        <h4>New Planner</h4>\n        <div class=\"input-field col s6\">\n          <input id=\"planner-email\" type=\"email\" class=\"validate\">\n          <label for=\"planner-email\">Email</label>\n        </div>\n        <div class=\"input-field col s6\">\n          <input id=\"planner-email-confirm\" type=\"email\" class=\"validate\">\n          <label for=\"planner-email-confirm\">Confirm Email</label>\n        </div>\n        <!-- <input id=\"planner-email\" placeholder=\"Email of planner [required]\"> -->\n        <!-- <br> -->\n        <button class=\"waves-effect waves-light btn btn-default\"  id=\"submit-planner\">Submit Planner</button>\n        <!-- <br> -->\n        <button class=\"waves-effect waves-light btn btn-default\" id=\"cancel-planner\">Cancel</button>\n      </div>\n    </div>\n    <script>\n      // Initialize the tabs\n      $(document).ready(function(){\n        $('ul.tabs').tabs();\n      });\n    </script>\n  </div>\n</div>\n</div>\n";
},"usePartial":true,"useData":true});
templates['templates/attendeventsummary'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "<i class=\"material-icons right delete-event\">star</i>";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.location || (depth0 != null ? depth0.location : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"location","hash":{},"data":data}) : helper)));
},"5":function(container,depth0,helpers,partials,data) {
    return "TBD";
},"7":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        <p class=\"event_desc\">"
    + container.escapeExpression(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<!-- store event ID info in the event-container -->\n<div class=\"col m3 s12\">\n  <div class=\"card attend-event-container\" eventId="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n    <div class=\"card-content event\">\n      "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.is_mine : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n      <p><span class=\"card-title\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span></p>\n      <hr>\n      <p class=\"host-email\">Host: "
    + alias4(((helper = (helper = helpers.hostEmail || (depth0 != null ? depth0.hostEmail : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"hostEmail","hash":{},"data":data}) : helper)))
    + "</p>\n      <p>Start: "
    + alias4(((helper = (helper = helpers.start || (depth0 != null ? depth0.start : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"start","hash":{},"data":data}) : helper)))
    + " @ "
    + alias4(((helper = (helper = helpers.start_time || (depth0 != null ? depth0.start_time : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"start_time","hash":{},"data":data}) : helper)))
    + "</p>\n      <p>End: "
    + alias4(((helper = (helper = helpers.end || (depth0 != null ? depth0.end : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"end","hash":{},"data":data}) : helper)))
    + " @ "
    + alias4(((helper = (helper = helpers.end_time || (depth0 != null ? depth0.end_time : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"end_time","hash":{},"data":data}) : helper)))
    + "</p>\n      <p class=\"event_loc\">Location: "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.location : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "</p>\n\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.description : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n  </div>\n</div>\n";
},"useData":true});
templates['templates/attendfeed'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.attendeventsummary,depth0,{"name":"attendeventsummary","data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    return "        <p><em>No events yet!</em></p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.header,depth0,{"name":"header","hash":{"title":(depth0 != null ? depth0.title : depth0),"currentUser":(depth0 != null ? depth0.currentUser : depth0)},"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<!-- <br><br>  Remove these after you do all of the css -->\n<div id=\"attendfeed\">\n  <div class=\"container\">\n    <h1>Upcoming Events</h1>\n    <div class=\"row\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.my_events : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "    </div>\n  </div>\n</div>\n";
},"usePartial":true,"useData":true});
templates['templates/event'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "<i class=\"material-icons right delete-event\">clear</i>";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.location || (depth0 != null ? depth0.location : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"location","hash":{},"data":data}) : helper)));
},"5":function(container,depth0,helpers,partials,data) {
    return "TBD";
},"7":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        <p class=\"event_desc\">Description: "
    + container.escapeExpression(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<!-- store event ID info in the event-container -->\n<div class=\"col m3 s12\">\n  <div class=\"card event-container\" eventId="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n    <div class=\"card-content event\">\n      "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.is_mine : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n      <p><span class=\"card-title\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span></p>\n      <hr>\n      <p class=\"host-email\">Host: "
    + alias4(((helper = (helper = helpers.hostEmail || (depth0 != null ? depth0.hostEmail : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"hostEmail","hash":{},"data":data}) : helper)))
    + "</p>\n      <p>Start: "
    + alias4(((helper = (helper = helpers.start || (depth0 != null ? depth0.start : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"start","hash":{},"data":data}) : helper)))
    + " @ "
    + alias4(((helper = (helper = helpers.start_time || (depth0 != null ? depth0.start_time : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"start_time","hash":{},"data":data}) : helper)))
    + "</p>\n      <p>End: "
    + alias4(((helper = (helper = helpers.end || (depth0 != null ? depth0.end : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"end","hash":{},"data":data}) : helper)))
    + " @ "
    + alias4(((helper = (helper = helpers.end_time || (depth0 != null ? depth0.end_time : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"end_time","hash":{},"data":data}) : helper)))
    + "</p>\n      <p class=\"event_loc\">Location: "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.location : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "</p>\n\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.description : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n  </div>\n</div>\n";
},"useData":true});
templates['templates/events'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.event,depth0,{"name":"event","data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    return "        <p><em>No events yet!</em></p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.header,depth0,{"name":"header","hash":{"title":(depth0 != null ? depth0.title : depth0),"currentUser":(depth0 != null ? depth0.currentUser : depth0)},"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "\n<div id=\"events\">\n  <div class=\"container\">\n    <div class=\"row\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.my_events : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\n      <div class=\"col m3 s12\" id=\"new_event\">\n        <div class=\"card\">\n          <div class=\"card-content\">\n            <span class=\"card-title\">Create</span>\n            <p>\n              Create and start planning a new event\n            </p>\n          </div>\n          <div class=\"card-action\">\n            <a class=\"waves-effect waves-light white-text btn\">New Event</a>\n          </div>\n        </div>\n        <!-- <p>+ Add a new event</p> -->\n      </div>\n    </div>\n  </div>\n\n  <div id=\"new-event-modal\" class=\"modal\">\n    <div class=\"modal-content\">\n      <h2>Create New Event</h2>\n      <div class=\"row\">\n        <form id=\"new-event-form\">\n          <div class=\"row\">\n            <div class=\"input-field col s12\">\n              <input name='eventname' type=\"text\" class=\"validate\" required>\n              <label for='eventname'>Event Name</label>\n            </div>\n          </div>\n          <div class=\"row\">\n            <div class=\"input-field col s6\">\n              <input name='start_date' type=\"date\" id='start_date' class=\"datepicker start_date\" required>\n              <label for='start_date'>Start Date</label>\n            </div>\n            <div class=\"input-field col s6\">\n              <input name='end_date' type=\"date\" id='end_date' class=\"datepicker end_date\" required>\n              <label for='end_date'>End Date</label>\n            </div>\n          </div>\n          <div class=\"row\">\n            <div class=\"input-field col s6\">\n              <input name='start_time' type=\"time\">\n              <!--<label for='start_time'>Start Time</label>-->\n            </div>\n            <div class=\"input-field col s6\">\n              <input name=\"end_time\" type=\"time\">\n              <!--<label for=\"end_time\">End Time</label>-->\n            </div>\n          </div>\n        </form>\n      </div>\n    </div>\n    <div class=\"modal-footer\">\n      <a href=\"#!\" class='waves-effect waves-light btn-flat btn' id='add-event-button'>Add event</a>\n      <a href=\"#!\" class='modal-action modal-close waves-effect waves-light btn-flat btn' id='cancel-event-button'>Cancel</a>\n    </div>\n  </div>\n  <!-- <div class='column' id='new-event-container'>\n    <div class='event'>\n      <div class='error'></div>\n      <input type='text' id='event-name' placeholder='Event name'>\n      <br>\n      <input type='text' id='start-date' placeholder='Start date'>\n      <br>\n      <input type='time' id='start-time' placeholder='Start time'>\n      <br>\n      <input type='text' id='end-date' placeholder='End date'>\n      <br>\n      <input type='time' id='end-time' placeholder='End time'>\n      <div class='btn btn-default' id='add-event-button'>Add event</div>\n      <div class='btn btn-default' id='cancel-event-button'>Cancel</div>\n    </div>\n  </div> -->\n\n</div>\n";
},"usePartial":true,"useData":true});
templates['templates/header'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "            <li>"
    + container.escapeExpression(((helper = (helper = helpers.currentUser || (depth0 != null ? depth0.currentUser : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"currentUser","hash":{},"data":data}) : helper)))
    + "</li>\n            <li><a id=\"logout-link\" class=\"waves-effect waves-light\" href=\"#\">Logout </a></li>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "            <li><a id=\"signin-btn\" class=\"waves-effect waves-light\" href=\"#\">Sign in </a></li>\n            <li><a id=\"register-btn\" class=\"waves-effect waves-light\" href=\"#\">Sign up</a></li>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "            <li><a id=\"logout-link\" class=\"waves-effect waves-light currentUser\" href=\"#\">Logout</a></li>\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "            <li><a id=\"signin-btn\" class=\"waves-effect waves-light currentUser\" href=\"#\">Sign in</a></li>\n            <li><a id=\"register-btn\" class=\"waves-effect waves-light currentUser\" href=\"#\">Sign up</a></li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "<div id=\"header\">\n  <div class=\"navbar-fixed\">\n    <nav>\n      <div class=\"nav-wrapper blue-grey\">\n        <a href=\"/\" class=\"brand-logo\">Pocket Planner</a>\n        <a href=\"#\" data-activates=\"mobile-header\" class=\"button-collapse\"><i class=\"material-icons\">menu</i></a>\n        <ul class=\"right hide-on-small-only\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.currentUser : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "        </ul>\n        <ul class=\"side-nav\" id=\"mobile-header\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.currentUser : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + "        </ul>\n      </div>\n    </nav>\n  </div>\n  <script>\n    // Used for simple window collapse for mobile and small screens\n    $(document).ready(function() {\n      $(\".button-collapse\").sideNav();\n    });\n  </script>\n\n  <div id=\"login-modal\" class=\"modal\">\n    <div class=\"modal-content\">\n      <h2>Sign in</h2>\n      <div class=\"row\">\n        <form id=\"signin-form\" class=\"col s12\">\n          <div class=\"row\">\n            <div class=\"input-field col s12\">\n              <input name=\"username\" type=\"email\" class=\"validate\" required>\n              <label for=\"username\">Email</label>\n            </div>\n          </div>\n          <div class=\"row\">\n            <div class=\"input-field col s12\">\n              <input name=\"password\" type=\"password\" class=\"validate\" required>\n              <label for=\"password\">Password</label>\n            </div>\n          </div>\n        </form>\n      </div>\n    </div>\n    <div class=\"modal-footer\">\n      <a href=\"#!\" id=\"login-cancel\" class=\"modal-action modal-close waves-effect waves-green btn-flat btn\">Cancel</a>\n      <a href=\"#!\" id=\"login-submit\" type=\"submit\" class=\"waves-effect waves-green btn-flat btn\">Submit</a>\n    </div>\n  </div>\n\n  <div id=\"signup-modal\" class=\"modal\">\n    <div class=\"modal-content\">\n      <h2>Sign up</h2>\n      <div class=\"row\">\n        <form id=\"signup-form\" class=\"col s12\">\n          <div class=\"row\">\n            <div class=\"input-field col s6\">\n              <input name=\"username\" type=\"email\" class=\"validate\" required>\n              <label for=\"username\">Email</label>\n            </div>\n\n            <div class=\"input-field col s6\">\n              <input name=\"confirmusername\" type=\"email\" class=\"validate\" required>\n              <label for=\"confirmusername\">Confirm Email</label>\n            </div>\n          </div>\n          <div class=\"row\">\n            <div class=\"input-field col s6\">\n              <input name=\"password\" type=\"password\" class=\"validate\" required>\n              <label for=\"password\">Password</label>\n            </div>\n            <div class=\"input-field col s6\">\n              <input name=\"confirmpassword\" type=\"password\" class=\"validate\" required>\n              <label for=\"confirmpassword\">Confirm Password</label>\n            </div>\n          </div>\n        </form>\n      </div>\n    </div>\n    <div class=\"modal-footer\">\n      <a href=\"#!\" id=\"signup-cancel\" class=\"modal-action modal-close waves-effect waves-green btn-flat btn\">Cancel</a>\n      <a href=\"#!\" id=\"signup-submit\" type=\"submit\" class=\"waves-effect waves-green btn-flat btn\">Submit</a>\n    </div>\n  </div>\n</div>\n";
},"useData":true});
templates['templates/index'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "      <div class=\"navbar\">\n        <nav class=\"nav-error white red-text accent-1-text\">\n          <div class=\"nav-error center\">\n            You need to be logged in to create an event\n          </div>\n        </nav>\n      </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"homepage\">\n"
    + ((stack1 = container.invokePartial(partials.header,depth0,{"name":"header","hash":{"currentUser":(depth0 != null ? depth0.currentUser : depth0)},"data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "    <div>\n"
    + ((stack1 = helpers.unless.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.currentUser : depth0),{"name":"unless","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      <div class=\"slider background-slider hide-on-small-only\">\n        <ul class=\"slides\">\n          <li>\n            <img class=\"responsive-img\" src=\"/imgs/concert.jpg\">\n          </li>\n          <li>\n            <img class=\"responsive-img\" src=\"/imgs/fight.jpg\">\n          </li>\n          <li>\n            <img class=\"responsive-img\" src=\"/imgs/fireworks.jpg\">\n          </li>\n          <li>\n            <img class=\"responsive-img\" src=\"/imgs/timessquare.jpg\">\n          </li>\n        </ul>\n      </div>\n      <script>\n        // Used to intialize the slider\n        $(document).ready(function(){\n          $('.slider').slider({\n            full_width: true,\n            indicators: false,\n            interval: 3000,\n            height: 300\n          });\n        });\n      </script>\n      <div class=\"container\">\n        <h1 class=\"center\">Pocket Planner</h1>\n        <!-- <p>To create an event login</p> -->\n        <div class=\"section\">\n          <div class=\"row\">\n            <div class=\"col s12 m6\">\n              <div class=\"card white hoverable\">\n                <div class=\"card-content\">\n                  <span class=\"card-title\">Organize <i class=\"material-icons\">edit</i></span>\n                  <p> Create a new event! <br>\n                    We'll help you keep track of your progress and remind you of different\n                    things you need to get done. We can also help you keep track of who's coming.</p>\n                </div>\n                <div class=\"card-action\">\n                  <a id=\"organize-events\" class=\" waves-effect waves-light center white-text btn\">Organize</a>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"col s12 m6\">\n              <div class=\"card white hoverable\">\n                <div class=\"card-content\">\n                  <span class=\"card-title\">Attend <i class=\"material-icons\">group</i></span>\n                  <p>Attend an event! <br>\n                    Find an awesome event you can attend and let the organizers you are going.\n                    We'll keep you posted and let you know if their plans change. </p>\n                </div>\n                <div class=\"card-action\">\n                  <a id=\"attend-events\" name=\"attend\" class=\" waves-effect waves-light white-text btn\">Attend</a>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n\n</div>\n";
},"usePartial":true,"useData":true});
templates['templates/register'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        "
    + container.escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"error","hash":{},"data":data}) : helper)))
    + "\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.header,(depth0 != null ? depth0.currentUser : depth0),{"name":"header","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<!-- DEPRECATED: Use signup-modal instead -->\n<div id=\"register\">\n  <h1>Register</h1>\n  <div class=\"error\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\n  <form id=\"register-form\">\n    <div>Username: <input type=\"text\" name=\"username\" required /></div>\n    <div>Password: <input type=\"password\" name=\"password\" required /></div>\n    <div>Confirm Password: <input type=\"password\" name=\"confirm\" required /></div>\n    <input type=\"submit\" />\n  </form>\n</div>\n";
},"usePartial":true,"useData":true});
templates['templates/rsvp'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.location || (depth0 != null ? depth0.location : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"location","hash":{},"data":data}) : helper)));
},"3":function(container,depth0,helpers,partials,data) {
    return "TBD";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return "            <div class=\"row\">\n              "
    + container.escapeExpression(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"description","hash":{},"data":data}) : helper)))
    + "\n            </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"rsvp\">\n"
    + ((stack1 = container.invokePartial(partials.header,depth0,{"name":"header","hash":{"currentUser":(depth0 != null ? depth0.currentUser : depth0)},"data":data,"indent":"  ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "  <div class=\"container grey lighten-3\">\n    <div id=\"rsvp-summary-card\" class=\"card large\">\n      <div id=\"rsvp-summary-image\" class=\"card-image teal\">\n        <span class=\"card-title\">event details</span>\n      </div>\n      <div id=\"rsvp-summary-content\" class=\"card-content\">\n          <div class=\"row\">\n            <h2>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</h2>\n            <blockquote id=\"rsvp-summary-details\">\n              Host: "
    + alias4(((helper = (helper = helpers.hostEmail || (depth0 != null ? depth0.hostEmail : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"hostEmail","hash":{},"data":data}) : helper)))
    + " <br>\n              Start: "
    + alias4(((helper = (helper = helpers.start || (depth0 != null ? depth0.start : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"start","hash":{},"data":data}) : helper)))
    + " @ "
    + alias4(((helper = (helper = helpers.start_time || (depth0 != null ? depth0.start_time : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"start_time","hash":{},"data":data}) : helper)))
    + " <br>\n              End: "
    + alias4(((helper = (helper = helpers.end || (depth0 != null ? depth0.end : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"end","hash":{},"data":data}) : helper)))
    + " @ "
    + alias4(((helper = (helper = helpers.end_time || (depth0 != null ? depth0.end_time : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"end_time","hash":{},"data":data}) : helper)))
    + " <br>\n              Location: "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.location : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\n            </blockquote>\n          </div>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.description : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        <form id=\"attendee-status\" action=\"#\">\n          <h3>Are you going?</h3>\n          <div class=\"row\">\n            <div class=\"input-field col s6\">\n              <input name=\"email\" type=\"email\" class=\"validate\">\n              <label for=\"email\">Email</label>\n            </div>\n            <div class=\"input-field col s6\">\n              <input name=\"name\" type=\"text\" class=\"validate\">\n              <label for=\"name\">Name</label>\n            </div>\n            <div class=\"input-field col s12\">\n              <textarea id=\"rsvp-comments\" name=\"note\" class=\"materialize-textarea\"></textarea>\n              <label for=\"note\">Comments</label>\n            </div>\n          </div>\n        </form>\n      </div>\n      <div class=\"card-action\">\n        <button eventId = \""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" class=\"rsvp-attend waves-effect waves-light btn-flat\" name=\"attending\" value=\"1\">Yes</button>\n        <button eventId = \""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" class=\"rsvp-attend waves-effect waves-light btn-flat\" name=\"attending\" value=\"0\">No</button>\n      </div>\n\n    </div>\n  </div>\n  <div>\n\n  </div>\n</div>\n";
},"usePartial":true,"useData":true});
templates['templates/signin'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        "
    + container.escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"error","hash":{},"data":data}) : helper)))
    + "\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.header,(depth0 != null ? depth0.currentUser : depth0),{"name":"header","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<!-- DEPRECATED: Use login-modal instead -->\n<div id=\"signin\">\n  <h1>Sign in</h1>\n  <div class=\"error\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\n  <form id=\"signin-form\">\n    <div>Username: <input type=\"text\" name=\"username\" required /></div>\n    <div>Password: <input type=\"password\" name=\"password\" required /></div>\n    <input type=\"submit\" />\n  </form>\n</div>\n";
},"usePartial":true,"useData":true});
templates['templates/subscribe'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class=\"subscribe\" data-subscribe-id=\""
    + alias2(alias1(depth0, depth0))
    + "\">\n  <p>"
    + alias2(alias1(depth0, depth0))
    + " (<a href=\"#\" class=\"remove-subscribe\">Remove</a>)</p>\n</div>\n";
},"useData":true});
templates['templates/todo'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "  <div class=\"todo\" todoId="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n\n    <div class=\"todo-info\">\n      <i class=\"material-icons right delete-todo\">clear</i><i class=\"material-icons right edit-todo\">edit</i>\n      <p>\n        <input class=\"check-todo\" type=\"checkbox\" "
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias2).call(alias1,(depth0 != null ? depth0.status : depth0),1,{"name":"equal","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " todoId="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + " id=\"todo-name-"
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" >\n        <label for=\"todo-name-"
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</label>\n      </p>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.deadline : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.priority : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n    <div class=\"edit-todo-form\" style=\"display:none\">\n\n      <label class=\"active\" for=\"edit-todo-name\">Todo Name</label>\n      <input class=\"edit-todo-name\" name=\"edit-todo-name\" value="
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + " type=\"text\">\n\n      <label class=\"active\" for=\"edit-todo-deadline\">Deadline</label>\n      <input class=\"edit-todo-deadline\" type=\"text\" name=\"edit-todo-deadline\" value="
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.deadline : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n\n      <label class=\"active\" for=\"edit-todo-priority\">Priority (1-10)</label>\n      <input class=\"edit-todo-priority\" type=\"number\" max=\"10\" min=\"1\" value="
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.priority : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n\n      <br>\n      <button class=\"waves-effect waves-light btn btn-default submit-edit-todo\">Submit</button>\n      <button class=\"waves-effect waves-light btn btn-default cancel-edit-todo\">Cancel</button>\n\n    </div>\n  </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return " checked=\"true\"";
},"4":function(container,depth0,helpers,partials,data) {
    var helper;

  return "      <small>Deadline: "
    + container.escapeExpression(((helper = (helper = helpers.deadline || (depth0 != null ? depth0.deadline : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"deadline","hash":{},"data":data}) : helper)))
    + "</small>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var helper;

  return "      <br><small>Priority (1-10): "
    + container.escapeExpression(((helper = (helper = helpers.priority || (depth0 != null ? depth0.priority : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"priority","hash":{},"data":data}) : helper)))
    + "</small>\n";
},"8":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.deadline || (depth0 != null ? depth0.deadline : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"deadline","hash":{},"data":data}) : helper)));
},"10":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.priority || (depth0 != null ? depth0.priority : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"priority","hash":{},"data":data}) : helper)));
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.todos : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n\n<!-- Using this to temporarily hold state -->\n<!-- DEPRECATED -->\n<!-- <div id='new-category-container'>\n  <div class='event'>\n    <div class='input-field col s3'>\n      <input id='category-title' type='text' placeholder='To-Do List Title'>\n      <label for='category-title'>New Category Title</label>\n    </div>\n    <div class='btn btn-default' id='add-category-button'>Add To-Do List</div>\n    <div class='btn btn-default' id='cancel-category-button'>Cancel</div>\n    </div>\n  </div>\n</div> -->\n\n<!-- Using this to temporarily hold state -->\n<!-- DEPRECATED -->\n<!-- var htmlStr =\n  \"<div class='new-todo-form'>\" +\n  \"<div class='input-field col s12'>\" +\n  \"  <input type='text' id='todo-name'> \" +\n  \"  <label for='todo-name'>Name</label> \" +\n  \"</div>\" +\n  \"<div class='input-field col s12'> \" +\n  \"  <input type='text' id='deadline'> \" +\n  \"  <label for='deadline'>Deadline</label> \" +\n  \"</div>\" +\n  \"<div class='btn btn-default' id='add-todo'>Add To-do</div> \" +\n  \"<div class='btn btn-default' id='cancel-add-todo'>Cancel</div></div>\" -->\n";
},"useData":true});
templates['templates/todos'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <div class=\"todo-container card-panel col s12 m6 l3\" categoryId="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n      <div class=\"inner-todo-container\">\n\n        <p class=\"category\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "<i class=\"material-icons right delete-category\">clear</i><i class=\"material-icons right edit-category\">edit</i></p>\n\n        <div class=\"edit-category-form\" style=\"display:none\">\n          <label for=\"edit-category-name\" class=\"active\">Todo List Name<input class=\"edit-category-name\" value=\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\" name=\"edit-category-name\" type=\"text\"></label>\n\n\n          <button class=\"waves-effect waves-light btn btn-default submit-edit-category\">Submit</button>\n          <button class=\"waves-effect waves-light btn btn-default cancel-edit-category\">Cancel</button>\n        </div>\n\n        <hr>\n"
    + ((stack1 = container.invokePartial(partials.todo,depth0,{"name":"todo","data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "        <br>\n        <br>\n        <div class=\"new-todo-form\" style=\"display:none\">\n          <div class=\"input-field col s12\">\n            <input type=\"text\" name=\"todo-name\" class=\"todo-name\">\n            <label for=\"todo-name\">Todo name</label>\n          </div>\n          <div class=\"input-field col s12\">\n            <input type=\"text\" class=\"deadline\">\n            <label for=\"deadline\">Deadline</label>\n          </div>\n          <div class=\"input-field col s12\">\n            <input type=\"number\" min=\"1\" max=\"10\" class=\"priority\">\n            <label for=\"priority\">Priority (1-10)</label>\n          </div>\n          <button class=\"btn btn-default\" id=\"add-todo\">Add Todo</button>\n          <button class=\"btn btn-default\" id=\"cancel-add-todo\">Cancel</button>\n        </div>\n        <button class=\"waves-effect waves-light btn btn-default add_todo\">Add a To-Do</button>\n      </div>\n    </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "    <p><em>No todo lists yet!</em></p>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <li costId=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\">\n              <div class=\"collapsible-header\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + " - $"
    + alias4(((helper = (helper = helpers.amount || (depth0 != null ? depth0.amount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"amount","hash":{},"data":data}) : helper)))
    + "<span class=\"badge\"><i class=\"material-icons remove-cost\">clear</i></span></div>\n              <div class=\"collapsible-body\">\n                <p>Amount: $"
    + alias4(((helper = (helper = helpers.amount || (depth0 != null ? depth0.amount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"amount","hash":{},"data":data}) : helper)))
    + "\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.description : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </p>\n              </div>\n            </li>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                  <br>Description: "
    + container.escapeExpression(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"description","hash":{},"data":data}) : helper)))
    + "\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "          <p>No costs yet.</p>\n";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias2).call(alias1,(depth0 != null ? depth0.attending : depth0),1,{"name":"equal","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias2).call(alias1,(depth0 != null ? depth0.attending : depth0),2,{"name":"equal","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias2).call(alias1,(depth0 != null ? depth0.attending : depth0),0,{"name":"equal","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"11":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "              <li>\n                <p><span class=\"bold green-text lighten-1\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + " "
    + alias4(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"email","hash":{},"data":data}) : helper)))
    + " <i class=\"material-icons green-text lighten-1 right\">check</i></span></p>\n              </li>\n";
},"13":function(container,depth0,helpers,partials,data) {
    var helper;

  return "              <li>\n                <p><span class=\"bold red-text lighten-1\">"
    + container.escapeExpression(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"email","hash":{},"data":data}) : helper)))
    + " <i class=\"material-icons red-text lighten-1 right\">close</i></span></p>\n              </li-\n";
},"15":function(container,depth0,helpers,partials,data) {
    var helper;

  return "              <li>\n                <p><span class=\"bold\">"
    + container.escapeExpression(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"email","hash":{},"data":data}) : helper)))
    + " <i class=\"material-icons right\">more_horiz</i></span></p>\n              </li>\n";
},"17":function(container,depth0,helpers,partials,data) {
    return "            <p>No invitees yet.</p>\n";
},"19":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "            <li plannerId="
    + container.escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n              <p><span class=\"bold\">"
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias2).call(alias1,(depth0 != null ? depth0.username : depth0),(depth0 != null ? depth0.email : depth0),{"name":"equal","hash":{},"fn":container.program(20, data, 0),"inverse":container.program(22, data, 0),"data":data})) != null ? stack1 : "")
    + "</span><span class=\"badge\"><i class=\"material-icons remove-planner\">clear</i></span></p>\n            </li>\n";
},"20":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"email","hash":{},"data":data}) : helper)));
},"22":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return alias4(((helper = (helper = helpers.username || (depth0 != null ? depth0.username : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data}) : helper)))
    + " "
    + alias4(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"email","hash":{},"data":data}) : helper)));
},"24":function(container,depth0,helpers,partials,data) {
    return "            <p>No other planners yet.</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {};

  return ((stack1 = container.invokePartial(partials.header,depth0,{"name":"header","hash":{"title":(depth0 != null ? depth0.title : depth0),"currentUser":(depth0 != null ? depth0.currentUser : depth0)},"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<div id=\"event-row-container\" class=\"row\">\n<div id=\"category-container\" class=\"col m9\" eventId="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n"
    + ((stack1 = helpers.each.call(alias3,((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.categories : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\n  <button class=\"btn btn-default\" id=\"new_category\">+ New To-Do List</button>\n  <div id='new-category-container' style=\"display:none\">\n    <div>\n      <input id='category-title' type='text' placeholder='To-Do List Title'>\n      <br>\n      <div class='btn btn-default' id='add-category-button'>Add To-Do List</div>\n      <div class='btn btn-default' id='cancel-category-button'>Cancel</div>\n    </div>\n  </div>\n\n</div>\n<div id=\"event-panel\" class=\"col m3 s12 z-depth-2\" eventId="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n  <div class=\"row\">\n    <div class=\"col s12\">\n      <!-- <div class=\"error\"></div> -->\n      <ul class=\"tabs\">\n        <li class=\"tab col s4 tab-accent-cyan\">\n          <a class=\"active teal-text\" href=\"#event-details\">Details</a>\n        </li>\n        <li class=\"tab col s4 tab-accent-cyan\">\n          <a class=\"teal-text\" href=\"#event-costs\">Costs</a>\n        </li>\n        <li class=\"tab col s4 tab-accent-cyan\">\n          <a class=\"teal-text\" href=\"#event-invitees\">Invitees</a>\n        </li>\n        <li class=\"tab col s4 tab-accent-cyan\">\n          <a class=\"teal-text\" href=\"#event-planners\">Planners</a>\n        </li>\n      </ul>\n    </div>\n    <div id=\"event-details\" class=\"col s12\">\n      <div id=\"event_editable\">\n        <i class=\"material-icons right\" id=\"edit-event\">edit</i>\n        <!-- Event Summary Info (not editable) -->\n        <h3 id=\"event_name\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.name : stack1), depth0))
    + "</h3>\n        <hr>\n        <span id=\"event-start\">Start: <span id=\"start-date\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.start : stack1), depth0))
    + "</span> @ <span id=\"start-time\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.start_time : stack1), depth0))
    + "</span></span><br>\n        <span id=\"event-end\">End: <span id=\"end-date\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.end : stack1), depth0))
    + "</span> @ <span id=\"end-time\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.end_time : stack1), depth0))
    + "</span></span><br>\n        <span id=\"event-loc\">Location: "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.location : stack1), depth0))
    + "</span><br>\n        <span id=\"event-desc\">Description: "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.description : stack1), depth0))
    + "</span><br>\n        <span id=\"event-budget\">Budget: $"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.budget : stack1), depth0))
    + "</span><br>\n      </div>\n\n      <!-- Input form to update the Event description and information -->\n      <div id=\"event-edit-form\" style=\"display:none\">\n        <div class=\"input-field col s12\">\n          <input id=\"event_name_edit\" name=\"event_name_edit\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.name : stack1), depth0))
    + "\" class=\"validate\" type=\"text\">\n          <label class=\"active\" for=\"event_name_edit\">Event Name</label>\n        </div>\n        <div class=\"input-field col s6\">\n          <input type=\"text\" name=\"edit-start-date\" id=\"edit-start-date\" class=\"datepicker\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.start : stack1), depth0))
    + "\">\n          <label class=\"active\" for=\"edit-start-date\">Start Date</label>\n        </div>\n        <div class=\"input-field col s6\">\n          <input type=\"time\" name=\"edit-start-time\" id=\"edit-start-time\" class=\"validate\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.start_time_24 : stack1), depth0))
    + "\">\n          <label class=\"active\" for=\"edit-start-time\">Start Time</label>\n        </div>\n        <div class=\"input-field col s6\">\n          <input type=\"text\" name=\"edit-end-date\" id=\"edit-end-date\" class=\"datepicker\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.end : stack1), depth0))
    + "\">\n          <label class=\"active\" for=\"edit-end-date\">End Date</label>\n        </div>\n        <div class=\"input-field col s6\">\n          <input type=\"time\" name=\"edit-end-time\" id=\"edit-end-time\" class=\"validate\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.end_time_24 : stack1), depth0))
    + "\">\n          <label class=\"active\" for=\"edit-end-time\">End Time</label>\n        </div>\n        <div class=\"input-field col s12\">\n          <input type=\"text\" name=\"edit-event-loc\" id=\"edit-event-loc\" class=\"validate\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.location : stack1), depth0))
    + "\">\n          <label class=\"active\" for=\"edit-event-loc\">Location</label>\n        </div>\n        <div class=\"input-field col s12\">\n          <textarea id=\"edit-event-desc\" class=\"materialize-textarea\" length=\"50\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.description : stack1), depth0))
    + "</textarea>\n          <label class=\"active\" for=\"edit-event-desc\">Description</label>\n        </div>\n        <div class=\"input-field col s12\">\n          <input type=\"number\" id=\"edit-event-budget\" class=\"validate\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.budget : stack1), depth0))
    + "\">\n          <label class=\"active\" for=\"edit-event-budget\">Budget</label>\n        </div>\n        <button class=\"waves-effect waves-light btn btn-default\" id=\"submit-edit-event\">Submit</button>\n        <button class=\"waves-effect waves-light btn btn-default\" id=\"cancel-edit-event\">Cancel</button>\n      </div>\n      <hr>\n      <div>\n        <p class=\"bold\">Invite link: <br>\n          <a class=\"invite-link\" href=/events/"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1._id : stack1), depth0))
    + "/attend>pocketplanner.herokuapp.com/events/"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1._id : stack1), depth0))
    + "/attend</a>\n        </p>\n        <p><span class=\"bold\">Number attendees:</span>  "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.attendees : stack1)) != null ? stack1.length : stack1), depth0))
    + "</p>\n      </div>\n    </div>\n\n    <div id=\"event-costs\" class=\"col s12\">\n      <!-- Costs for the event -->\n      <div id=\"cost-list\" eventId="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n        <h3>Costs</h3>\n        Budget: $"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.budget : stack1), depth0))
    + "\n        <ul class=\"collapsible\" data-collapsible=\"accordion\">\n"
    + ((stack1 = helpers.each.call(alias3,((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.cost : stack1),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(8, data, 0),"data":data})) != null ? stack1 : "")
    + "        </ul>\n        <script>\n          $(document).ready(function(){\n            $('.collapsible').collapsible({\n              // accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style\n            });\n          });\n          </script>\n        <button class=\"btn btn-default\" id=\"add-cost\">Add Cost</button>\n      </div>\n      <div id=\"add-cost-form\" style=\"display:none\" eventId="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n        <h4>New Cost</h4>\n        <div class=\"input-field col s6\">\n          <input id=\"cost-name\" type=\"text\" class=\"validate\">\n          <label for=\"cost-name\">Name</label>\n        </div>\n        <div class=\"input-field col s6\">\n          <input id=\"cost-amount\" type=\"number\" class=\"validate\">\n          <label for=\"cost-amount\">Amount (in $)</label>\n        </div>\n        <div class=\"input-field col s12\">\n          <input id=\"cost-desc\" type=\"text\" class=\"validate\">\n          <label for=\"cost-desc\">Description</label>\n        </div>\n        <button class=\"waves-effect waves-light btn btn-default\"  id=\"submit-cost\">Submit Cost</button>\n        <button class=\" waves-effect waves-light btn btn-default\" id=\"cancel-cost\">Cancel</button>\n      </div>\n    </div>\n    <div id=\"event-invitees\" class=\"col s12\">\n      <!-- invitee administration -->\n      <div id=\"invitee-list\" eventId= "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n        <h3>Invitees</h3>\n        <ul>\n"
    + ((stack1 = helpers.each.call(alias3,((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.attendees : stack1),{"name":"each","hash":{},"fn":container.program(10, data, 0),"inverse":container.program(17, data, 0),"data":data})) != null ? stack1 : "")
    + "        </ul>\n        <button class=\"btn btn-default\" id=\"add-invitee\">Add Invitee</button>\n      </div>\n      <div id=\"add-invitee-form\" style=\"display:none\" eventId="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n        <h4>New Invitee</h4>\n        <div class=\"input-field col s6\">\n          <input id=\"invitee-email\" type=\"email\" class=\"validate\">\n          <label for=\"invitee-email\">Email</label>\n        </div>\n        <div class=\"input-field col s6\">\n          <input id=\"invitee-email-confirm\" type=\"email\" class=\"validate\">\n          <label for=\"invitee-email-confirm\">Confirm Email</label>\n        </div>\n        <button class=\"waves-effect waves-light btn btn-default\" id=\"submit-invitee\">Invite</button>\n        <button class=\"waves-effect waves-light btn btn-default\" id=\"cancel-planner\">Cancel</button>\n      </div>\n    </div>\n    <div id=\"event-planners\" class=\"col s12\">\n      <!-- Planner adminstration -->\n      <div id=\"planner-list\" eventId = "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n        <h3>Planners</h3>\n        <p> Host: "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.hostEmail : stack1), depth0))
    + " </p>\n        <ul>\n"
    + ((stack1 = helpers.each.call(alias3,((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.planners : stack1),{"name":"each","hash":{},"fn":container.program(19, data, 0),"inverse":container.program(24, data, 0),"data":data})) != null ? stack1 : "")
    + "        </ul>\n        <button class=\"btn btn-default\" id=\"add-planner\">Add Planner</button>\n      </div>\n      <div id=\"add-planner-form\" style=\"display:none\" eventId="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n        <h4>New Planner</h4>\n        <div class=\"input-field col s6\">\n          <input id=\"planner-email\" type=\"email\" class=\"validate\">\n          <label for=\"planner-email\">Email</label>\n        </div>\n        <div class=\"input-field col s6\">\n          <input id=\"planner-email-confirm\" type=\"email\" class=\"validate\">\n          <label for=\"planner-email-confirm\">Confirm Email</label>\n        </div>\n        <!-- <input id=\"planner-email\" placeholder=\"Email of planner [required]\"> -->\n        <!-- <br> -->\n        <button class=\"waves-effect waves-light btn btn-default\"  id=\"submit-planner\">Submit Planner</button>\n        <!-- <br> -->\n        <button class=\"waves-effect waves-light btn btn-default\" id=\"cancel-planner\">Cancel</button>\n      </div>\n    </div>\n    <script>\n      // Initialize the tabs\n      $(document).ready(function(){\n        $('ul.tabs').tabs();\n      });\n    </script>\n  </div>\n</div>\n</div>\n";
},"usePartial":true,"useData":true});
})();