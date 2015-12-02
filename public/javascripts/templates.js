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

  return "        <p class=\"event_desc\">"
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
    + "  <div class=\"container center grey lighten-3\">\n    <div class=\"card-panel large\">\n      <div class=\"card-content\">\n          <h2 class=\"event_name\"><span class=\"card-title\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span></h2>\n          <div class=\"row\">\n            Host: "
    + alias4(((helper = (helper = helpers.hostEmail || (depth0 != null ? depth0.hostEmail : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"hostEmail","hash":{},"data":data}) : helper)))
    + "\n          </div>\n          <div class=\"row\">\n            Start: "
    + alias4(((helper = (helper = helpers.start || (depth0 != null ? depth0.start : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"start","hash":{},"data":data}) : helper)))
    + " @ "
    + alias4(((helper = (helper = helpers.start_time || (depth0 != null ? depth0.start_time : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"start_time","hash":{},"data":data}) : helper)))
    + "\n          </div>\n          <div class=\"row\">\n            End: "
    + alias4(((helper = (helper = helpers.end || (depth0 != null ? depth0.end : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"end","hash":{},"data":data}) : helper)))
    + " @ "
    + alias4(((helper = (helper = helpers.end_time || (depth0 != null ? depth0.end_time : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"end_time","hash":{},"data":data}) : helper)))
    + "\n          </div>\n          <div class=\"row\">\n            Location: "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.location : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\n          </div>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.description : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        <form id=\"attendee-status\" action=\"#\">\n          <input name=\"email\" type=\"email\" class=\"validate\" placeholder=\"Email [required]\">\n          <input name=\"name\" placeholder=\"Your name [required]\">\n          <textarea id=\"rsvp-comments\" name=\"note\" placeholder=\"Comments\"></textarea>\n          <button eventId = \""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" class=\"rsvp-attend\" type=\"submit\" name=\"attending\" value=\"1\">Yes</button>\n          <button eventId = \""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" class=\"rsvp-attend\" type=\"submit\" name=\"attending\" value=\"0\">No</button>\n        </form>\n      </div>\n      <div class=\"card-action\">\n\n      </div>\n\n    </div>\n  </div>\n  <div>\n\n  </div>\n</div>\n";
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
    + ">\n    <i class=\"material-icons right delete-todo\">clear</i>\n    <p>\n      <input class=\"check-todo\" type=\"checkbox\" "
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias2).call(alias1,(depth0 != null ? depth0.status : depth0),1,{"name":"equal","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " todoId="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + " id=\"todo-name\" />\n      <label for=\"todo-name\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</label>\n    </p>\n    <!--<div class=\"checkbox-container\">\n      <input type=\"checkbox\" "
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias2).call(alias1,(depth0 != null ? depth0.status : depth0),1,{"name":"equal","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " class=\"check-todo\" todoId="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n    </div>-->\n      <!--<p>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "<span class=\"glyphicon glyphicon-remove delete-todo\"></span></p>-->\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.deadline : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.priority : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    <br>\n\n  </div>\n";
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

  return "    <div class=\"todo-container col s3\" categoryId="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n      <div class=\"inner-todo-container\">\n        <p class=\"category\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "<i class=\"material-icons right delete-category\">clear</i></p>\n        <hr>\n"
    + ((stack1 = container.invokePartial(partials.todo,depth0,{"name":"todo","data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "      </div>\n    </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "    <p><em>No todo lists yet!</em></p>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "      <li costId="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n        <p><span class=\"bold\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span><span class=\"glyphicon glyphicon-remove remove-cost\"></span></p>\n        <p>Amount: $"
    + alias4(((helper = (helper = helpers.amount || (depth0 != null ? depth0.amount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"amount","hash":{},"data":data}) : helper)))
    + "</p>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.description : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      </li>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var helper;

  return "          <p>Description: "
    + container.escapeExpression(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "      <p>No costs yet.</p>\n";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "        <li plannerId="
    + container.escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n          <p><span class=\"bold\">"
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias2).call(alias1,(depth0 != null ? depth0.username : depth0),(depth0 != null ? depth0.email : depth0),{"name":"equal","hash":{},"fn":container.program(11, data, 0),"inverse":container.program(13, data, 0),"data":data})) != null ? stack1 : "")
    + "</span><span class=\"glyphicon glyphicon-remove remove-planner\"></span></p>\n        </li>\n";
},"11":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"email","hash":{},"data":data}) : helper)));
},"13":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return alias4(((helper = (helper = helpers.username || (depth0 != null ? depth0.username : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data}) : helper)))
    + " "
    + alias4(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"email","hash":{},"data":data}) : helper)));
},"15":function(container,depth0,helpers,partials,data) {
    return "        <p>No other planners yet.</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {};

  return ((stack1 = container.invokePartial(partials.header,depth0,{"name":"header","hash":{"title":(depth0 != null ? depth0.title : depth0),"currentUser":(depth0 != null ? depth0.currentUser : depth0)},"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<div class=\"row\">\n<div id=\"category-container\" class=\"col m9\" eventId="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n"
    + ((stack1 = helpers.each.call(alias3,((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.categories : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\n  <button class=\"col s3 btn btn-default\" id=\"new_category\">+ Add a new to-do list</button>\n\n</div>\n<div id=\"event_panel\" class=\"col m3\" eventId="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n  <div class=\"error\"></div>\n  <div id=\"event_editable\">\n    <i class=\"material-icons right\" id=\"edit-event\">edit</i>\n    <h3 id=\"event_name\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.name : stack1), depth0))
    + "</h3>\n    <hr>\n    <p id=\"event-start\"><span class=\"bold\">Start:</span> <span id=\"start-date\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.start : stack1), depth0))
    + "</span> @ <span id=\"start-time\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.start_time : stack1), depth0))
    + "</span></p>\n    <p id=\"event-end\"><span class=\"bold\">End:</span> <span id=\"end-date\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.end : stack1), depth0))
    + "</span> @ <span id=\"end-time\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.end_time : stack1), depth0))
    + "</span></p>\n    <p id=\"event-loc\"><span class=\"bold\">Location:</span> "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.location : stack1), depth0))
    + "</p>\n    <p id=\"event-desc\"><span class=\"bold\">Description:</span>  "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.description : stack1), depth0))
    + "</p>\n    <p id=\"event-budget\"><span class=\"bold\">Budget:</span> $"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.budget : stack1), depth0))
    + "</p>\n  </div>\n\n  <div id=\"event-edit-form\" style=\"display:none\">\n\n    <h3 id=\"event_name_edit\" class=\"edit\"  contenteditable=\"true\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.name : stack1), depth0))
    + "</h3>\n    <hr>\n    <p id=\"event-start\"><span class=\"bold\">Start:</span></p><input type=\"text\" id=\"edit-start-date\" class=\"datepicker\" data-value="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.start : stack1), depth0))
    + "> @ <input type=\"time\" id=\"edit-start-time\" value="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.start_time_24 : stack1), depth0))
    + ">\n    <br>\n    <br>\n    <p id=\"event-end\"><span class=\"bold\">End:</span></p><input type=\"text\" id=\"edit-end-date\" class=\"datepicker\" data-value="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.end : stack1), depth0))
    + "> @ <input type=\"time\" id=\"edit-end-time\" value="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.end_time_24 : stack1), depth0))
    + ">\n    <br>\n    <br>\n    <span class=\"bold\">Location:</span><p id=\"edit-event-loc\" class=\"edit\" contenteditable=\"true\"> "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.location : stack1), depth0))
    + "</p>\n    <br>\n    <span class=\"bold\">Description:</span> <p id=\"edit-event-desc\" class=\"edit\" contenteditable=\"true\"> "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.description : stack1), depth0))
    + "</p>\n    <br>\n    <span class=\"bold\">Budget:</span><p id=\"edit-event-budget\" class=\"edit\" contenteditable=\"true\"> "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.budget : stack1), depth0))
    + "</p>\n\n    <button class=\"btn btn-default\" id=\"submit-edit-event\">Submit</button>\n    <button class=\"btn btn-default\" id=\"cancel-edit-event\">Cancel</button>\n  </div>\n  <hr>\n  <div>\n    <p class=\"bold\">Invite link:</p><a href=/events/"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1._id : stack1), depth0))
    + "/attend>pocketplanner.herokuapp.com/events/"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1._id : stack1), depth0))
    + "/attend</a>\n    <p><span class=\"bold\">Number attendees:</span>  "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.attendees : stack1)) != null ? stack1.length : stack1), depth0))
    + "</p>\n    <hr>\n  </div>\n  <div id=\"cost-list\" eventId="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n    <p class=\"bold\">Costs</p>\n    <ul>\n"
    + ((stack1 = helpers.each.call(alias3,((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.cost : stack1),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(8, data, 0),"data":data})) != null ? stack1 : "")
    + "    </ul>\n    <button class=\"btn btn-default\" id=\"add-cost\">Add Cost</button>\n    <hr>\n  </div>\n  <div id=\"add-cost-form\" style=\"display:none\" eventId="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n    <div class=\"error\"></div>\n    <br>\n    <input id=\"cost-name\" placeholder=\"Name of cost [required]\">\n    <br>\n    <input id=\"cost-amount\" placeholder=\"Amount (in $) [required]\">\n    <br>\n    <input id=\"cost-desc\" placeholder=\"Description\">\n    <br>\n\n    <button class=\"btn btn-default\"  id=\"submit-cost\">Submit Cost</button>\n    <br>\n    <button class=\"btn btn-default\" id=\"cancel-cost\">Cancel</button>\n  </div>\n  <div id=\"planner-list\" eventId = "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n    <p class=\"bold\">Planners</p>\n    <ul>\n"
    + ((stack1 = helpers.each.call(alias3,((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.planners : stack1),{"name":"each","hash":{},"fn":container.program(10, data, 0),"inverse":container.program(15, data, 0),"data":data})) != null ? stack1 : "")
    + "    </ul>\n    <button class=\"btn btn-default\" id=\"add-planner\">Add Planner</button>\n  </div>\n  <div id=\"add-planner-form\" style=\"display:none\" eventId="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n    <div class=\"error\"></div>\n    <br>\n    <input id=\"planner-email\" placeholder=\"Email of planner [required]\">\n    <br>\n\n    <button class=\"btn btn-default\"  id=\"submit-planner\">Submit Planner</button>\n    <br>\n    <button class=\"btn btn-default\" id=\"cancel-planner\">Cancel</button>\n  </div>\n</div>\n</div>\n";
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

  return "        <p class=\"event_desc\">"
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
    + "  <div class=\"container center grey lighten-3\">\n    <div class=\"card-panel large\">\n      <div class=\"card-content\">\n          <h2 class=\"event_name\"><span class=\"card-title\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span></h2>\n          <div class=\"row\">\n            Host: "
    + alias4(((helper = (helper = helpers.hostEmail || (depth0 != null ? depth0.hostEmail : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"hostEmail","hash":{},"data":data}) : helper)))
    + "\n          </div>\n          <div class=\"row\">\n            Start: "
    + alias4(((helper = (helper = helpers.start || (depth0 != null ? depth0.start : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"start","hash":{},"data":data}) : helper)))
    + " @ "
    + alias4(((helper = (helper = helpers.start_time || (depth0 != null ? depth0.start_time : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"start_time","hash":{},"data":data}) : helper)))
    + "\n          </div>\n          <div class=\"row\">\n            End: "
    + alias4(((helper = (helper = helpers.end || (depth0 != null ? depth0.end : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"end","hash":{},"data":data}) : helper)))
    + " @ "
    + alias4(((helper = (helper = helpers.end_time || (depth0 != null ? depth0.end_time : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"end_time","hash":{},"data":data}) : helper)))
    + "\n          </div>\n          <div class=\"row\">\n            Location: "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.location : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\n          </div>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.description : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        <form id=\"attendee-status\" action=\"#\">\n          <input name=\"email\" type=\"email\" class=\"validate\" placeholder=\"Email [required]\">\n          <input name=\"name\" placeholder=\"Your name [required]\">\n          <textarea id=\"rsvp-comments\" name=\"note\" placeholder=\"Comments\"></textarea>\n          <button eventId = \""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" class=\"rsvp-attend\" type=\"submit\" name=\"attending\" value=\"1\">Yes</button>\n          <button eventId = \""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" class=\"rsvp-attend\" type=\"submit\" name=\"attending\" value=\"0\">No</button>\n        </form>\n      </div>\n      <div class=\"card-action\">\n\n      </div>\n\n    </div>\n  </div>\n  <div>\n\n  </div>\n</div>\n";
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
    + ">\n    <i class=\"material-icons right delete-todo\">clear</i>\n    <p>\n      <input class=\"check-todo\" type=\"checkbox\" "
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias2).call(alias1,(depth0 != null ? depth0.status : depth0),1,{"name":"equal","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " todoId="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + " id=\"todo-name\" />\n      <label for=\"todo-name\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</label>\n    </p>\n    <!--<div class=\"checkbox-container\">\n      <input type=\"checkbox\" "
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias2).call(alias1,(depth0 != null ? depth0.status : depth0),1,{"name":"equal","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " class=\"check-todo\" todoId="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n    </div>-->\n      <!--<p>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "<span class=\"glyphicon glyphicon-remove delete-todo\"></span></p>-->\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.deadline : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.priority : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    <br>\n\n  </div>\n";
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
templates['templates/todos'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <div class=\"todo-container col s3\" categoryId="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n      <div class=\"inner-todo-container\">\n        <p class=\"category\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "<i class=\"material-icons right delete-category\">clear</i></p>\n        <hr>\n"
    + ((stack1 = container.invokePartial(partials.todo,depth0,{"name":"todo","data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "      </div>\n    </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "    <p><em>No todo lists yet!</em></p>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "      <li costId="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n        <p><span class=\"bold\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span><span class=\"glyphicon glyphicon-remove remove-cost\"></span></p>\n        <p>Amount: $"
    + alias4(((helper = (helper = helpers.amount || (depth0 != null ? depth0.amount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"amount","hash":{},"data":data}) : helper)))
    + "</p>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.description : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      </li>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var helper;

  return "          <p>Description: "
    + container.escapeExpression(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "      <p>No costs yet.</p>\n";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "        <li plannerId="
    + container.escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n          <p><span class=\"bold\">"
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias2).call(alias1,(depth0 != null ? depth0.username : depth0),(depth0 != null ? depth0.email : depth0),{"name":"equal","hash":{},"fn":container.program(11, data, 0),"inverse":container.program(13, data, 0),"data":data})) != null ? stack1 : "")
    + "</span><span class=\"glyphicon glyphicon-remove remove-planner\"></span></p>\n        </li>\n";
},"11":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"email","hash":{},"data":data}) : helper)));
},"13":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return alias4(((helper = (helper = helpers.username || (depth0 != null ? depth0.username : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data}) : helper)))
    + " "
    + alias4(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"email","hash":{},"data":data}) : helper)));
},"15":function(container,depth0,helpers,partials,data) {
    return "        <p>No other planners yet.</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {};

  return ((stack1 = container.invokePartial(partials.header,depth0,{"name":"header","hash":{"title":(depth0 != null ? depth0.title : depth0),"currentUser":(depth0 != null ? depth0.currentUser : depth0)},"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<div class=\"row\">\n<div id=\"category-container\" class=\"col m9\" eventId="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n"
    + ((stack1 = helpers.each.call(alias3,((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.categories : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\n  <button class=\"col s3 btn btn-default\" id=\"new_category\">+ Add a new to-do list</button>\n\n</div>\n<div id=\"event_panel\" class=\"col m3\" eventId="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n  <div class=\"error\"></div>\n  <div id=\"event_editable\">\n    <i class=\"material-icons right\" id=\"edit-event\">edit</i>\n    <h3 id=\"event_name\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.name : stack1), depth0))
    + "</h3>\n    <hr>\n    <p id=\"event-start\"><span class=\"bold\">Start:</span> <span id=\"start-date\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.start : stack1), depth0))
    + "</span> @ <span id=\"start-time\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.start_time : stack1), depth0))
    + "</span></p>\n    <p id=\"event-end\"><span class=\"bold\">End:</span> <span id=\"end-date\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.end : stack1), depth0))
    + "</span> @ <span id=\"end-time\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.end_time : stack1), depth0))
    + "</span></p>\n    <p id=\"event-loc\"><span class=\"bold\">Location:</span> "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.location : stack1), depth0))
    + "</p>\n    <p id=\"event-desc\"><span class=\"bold\">Description:</span>  "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.description : stack1), depth0))
    + "</p>\n    <p id=\"event-budget\"><span class=\"bold\">Budget:</span> $"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.budget : stack1), depth0))
    + "</p>\n  </div>\n\n  <div id=\"event-edit-form\" style=\"display:none\">\n\n    <h3 id=\"event_name_edit\" class=\"edit\"  contenteditable=\"true\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.name : stack1), depth0))
    + "</h3>\n    <hr>\n    <p id=\"event-start\"><span class=\"bold\">Start:</span></p><input type=\"text\" id=\"edit-start-date\" class=\"datepicker\" data-value="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.start : stack1), depth0))
    + "> @ <input type=\"time\" id=\"edit-start-time\" value="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.start_time_24 : stack1), depth0))
    + ">\n    <br>\n    <br>\n    <p id=\"event-end\"><span class=\"bold\">End:</span></p><input type=\"text\" id=\"edit-end-date\" class=\"datepicker\" data-value="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.end : stack1), depth0))
    + "> @ <input type=\"time\" id=\"edit-end-time\" value="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.end_time_24 : stack1), depth0))
    + ">\n    <br>\n    <br>\n    <span class=\"bold\">Location:</span><p id=\"edit-event-loc\" class=\"edit\" contenteditable=\"true\"> "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.location : stack1), depth0))
    + "</p>\n    <br>\n    <span class=\"bold\">Description:</span> <p id=\"edit-event-desc\" class=\"edit\" contenteditable=\"true\"> "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.description : stack1), depth0))
    + "</p>\n    <br>\n    <span class=\"bold\">Budget:</span><p id=\"edit-event-budget\" class=\"edit\" contenteditable=\"true\"> "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.budget : stack1), depth0))
    + "</p>\n\n    <button class=\"btn btn-default\" id=\"submit-edit-event\">Submit</button>\n    <button class=\"btn btn-default\" id=\"cancel-edit-event\">Cancel</button>\n  </div>\n  <hr>\n  <div>\n    <p class=\"bold\">Invite link:</p><a href=/events/"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1._id : stack1), depth0))
    + "/attend>pocketplanner.herokuapp.com/events/"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1._id : stack1), depth0))
    + "/attend</a>\n    <p><span class=\"bold\">Number attendees:</span>  "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.attendees : stack1)) != null ? stack1.length : stack1), depth0))
    + "</p>\n    <hr>\n  </div>\n  <div id=\"cost-list\" eventId="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n    <p class=\"bold\">Costs</p>\n    <ul>\n"
    + ((stack1 = helpers.each.call(alias3,((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.cost : stack1),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(8, data, 0),"data":data})) != null ? stack1 : "")
    + "    </ul>\n    <button class=\"btn btn-default\" id=\"add-cost\">Add Cost</button>\n    <hr>\n  </div>\n  <div id=\"add-cost-form\" style=\"display:none\" eventId="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n    <div class=\"error\"></div>\n    <br>\n    <input id=\"cost-name\" placeholder=\"Name of cost [required]\">\n    <br>\n    <input id=\"cost-amount\" placeholder=\"Amount (in $) [required]\">\n    <br>\n    <input id=\"cost-desc\" placeholder=\"Description\">\n    <br>\n\n    <button class=\"btn btn-default\"  id=\"submit-cost\">Submit Cost</button>\n    <br>\n    <button class=\"btn btn-default\" id=\"cancel-cost\">Cancel</button>\n  </div>\n  <div id=\"planner-list\" eventId = "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n    <p class=\"bold\">Planners</p>\n    <ul>\n"
    + ((stack1 = helpers.each.call(alias3,((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.planners : stack1),{"name":"each","hash":{},"fn":container.program(10, data, 0),"inverse":container.program(15, data, 0),"data":data})) != null ? stack1 : "")
    + "    </ul>\n    <button class=\"btn btn-default\" id=\"add-planner\">Add Planner</button>\n  </div>\n  <div id=\"add-planner-form\" style=\"display:none\" eventId="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n    <div class=\"error\"></div>\n    <br>\n    <input id=\"planner-email\" placeholder=\"Email of planner [required]\">\n    <br>\n\n    <button class=\"btn btn-default\"  id=\"submit-planner\">Submit Planner</button>\n    <br>\n    <button class=\"btn btn-default\" id=\"cancel-planner\">Cancel</button>\n  </div>\n</div>\n</div>\n";
},"usePartial":true,"useData":true});
})();
