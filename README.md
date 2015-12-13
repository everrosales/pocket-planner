Pocket Planner
==============
Final project for 6.170 (Software Studio)
Live Site
---------
This site is currently live at [pocketplanner.herokuapp.com](http://pocketplanner.herokuapp.com/).

Details
-------
This site was built as a event planner application, designed to help planners
organize and keep track of the different tasks that they need to do to plan
an event.

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

### Tools and Frameworks
#### Handlebars
This application makes use of client side rendering of handlebar templates to
provide a more reactive user interface. These templates are located under the
folder `templates`. These templates must be compiled after they are modified and
this can be done by either re-running:
```
npm run-script start-dev
```
This will compile the handlebar templates and start the server or by manually.
Alternatively you can compile the handlebar templates manually by running (from
the root project directory):
```
handlebars templates/.* -f public/javascripts/templates.js
```
For more usage details about handlebars go [here](http://handlebarsjs.com/).

#### Google Maps API
To properly use the Google Maps plugins that we are using in our app, replace:
```
<iframe
width="100%"
height="400"
frameborder="0" style="border:0"
src="https://www.google.com/maps/embed/v1/place?key=[YourKeyHere]
&q={{queryLocation}}" allowfullscreen>
</iframe>
```
With your API key in `templates/rsvp.handlebars`.
#### Container Templates and Email Templates
The container HTML templates are specified under `views` and these are
[EJS](http://www.embeddedjs.com/) templates. If you need to link additional
javascript resources or stylesheets put them in either the `index.ejs` or
`rsvp.ejs` files accordingly. The templates for emails are found under `views/emails`.
#### MaterializeCSS
The frontend framework we used to make the user interface was MaterializeCSS and
more information about this can be found [here](http://materializecss.com/).
