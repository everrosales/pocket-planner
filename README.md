ajliu_erosales_erosolar_kimsin98_final
======================================
Live Site
---------
This site is currently live at [pocketplanner.herokuapp.com](http://pocketplanner.herokuapp.com/).

Files Structure
---------------
```
bin/
  > www
config/
  > passport.js
documents/
  agenda/
    > agenda-nov-16.pdf
  meeting_notes
  > design_doc.pdf
  > pocket_planner_presentation.pdf
  > team_contract.pdf
  > teamwork_plan.pdf
models/
  > Event.js
  > User.js
public/
  javascripts/
    > handlebars.runtime-vX.js
    > helpers.js
    > index.js
    > templates.js
    > users.js
  stylesheets/
    > style.css
routes/
  > attend.js
  > event.js
  > index.js
  > users.js
templates/
  > event.handlebars
  > events.handlebars
  > header.handlebars
  > index.handlebars
  > register.handlebars
  > signin.handlebars
  > subscribe.handlebars
  > todo.handlebars
  > todos.handlebars
test/
  > test.js
utils/
  > utils.js
views/
  > error.ejs
  > index.ejs
> app.js
> package.json
```

Routes
------
Summary of event.js routes. All of these routes require user authentication.
```
GET
/events                                    // Get all events for a user
/events/public                             // Get the list of all public events (will be used for invited events)
/events/:event                             // Get an event given a eventId
/events/:event/attend                      // Get the invitee attendance page

POST
/events                                    // Create an event
/events/:event/attend                      // Attend an event
/events/:event/costs                       // Add a cost to an event
/events/:event/planners                    // Add a planner to an event
/events/:event/categories                  // Add a category to an event
/events/:event/invite                      // Add an invite to an event
/events/:event/categories/:category/todos  // Add a todo to a category

PUT
/events/:event                             // Add information to an event
/events/:event/categories/:category/todos/:todo/check // Marks todo as checked
/events/:event/categories/:category/todos/:todo/uncheck // Marks todo as unchecked

DELETE
/events/:event                             // Delete an event
/events/:event/costs/:cost                  // Delete a cost from an event
/events/:event/planners/:planner            // Remove a planner from an event
/events/:event/categories/:category          // Delete a category from an event
/events/:event/categories/:category/todos/:todo // Delete a todo from a category
```
Summary of  user.js routes.
```
GET
/users/loginsuccess     // Redirected here upon successful login (auth checked)
/users/loginfail        // Redirected here upon failed login
/users/signupsuccess    // Redirected here upon successful signup
/users/signupfail       // Redirected here upon failed signup
/current

POST
/users                  // Create a new user
/users/login            // Authenticate user
/users/logout           // Logout user and destroy session
```

Development
-----------
### Environment
First make sure that your environment is up to date
```
~$ npm install
```

To run in developer mode:
```
~$ npm run-script start-dev
```

### Email bot usage
First import the email bot script using
```
var mailer = require('../config/mailer.js');
```

Then to send emails just use
```
mailer.sendEmail(recipient, subject, text, callback);
```
The `callback` will be called with the arguments `callback(err, info)`. For more information on what is contained in `info`, read the corresponding section [here](https://nodemailer.com).
