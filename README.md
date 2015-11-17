ajliu_erosales_erosolar_kimsin98_final
======================================
Files Structure
---------------
```
bin/
  > www
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
/event                                    // Get all events for a user
/event/:event                             // Get an event given a eventId

POST
/event                                    // Create an event
/event/:event/addcost                     // Add a cost to an event
/event/:event/addplanner                  // Add a planner to an event
/event/:event/addinformation              // Add information to an event
/event/:event/addcategory                 // Add a category to an event
/event/:event/addinvite                   // Add an invite to an event
/event/:event/category/:category/addtodo  // Add a todo to a category

DELETE
/event/:event                             // Delete an event
/event/:event/cost/:cost                  // Delete a cost from an event
/event/:event/planner/:planner            // Remove a planner from an event
/event/:event/category/:category          // Delete a category from an event
/event/:event/category/:category/todo/:todo // Delete a todo from a category
```
