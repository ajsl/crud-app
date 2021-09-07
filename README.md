# Aquent developer candidate project

A basic application with a Spring boot REST API, an Angular UI and styled with Twitter Bootstrap. 

##Running the application locally

###Spring boot
- First fork the Repo. 
- Open the crud-app in a Suitable IDE such as IntelliJ. 
- Using Maven download the dependencies. 
- Run the API project from the application class. 
- Running the API will populate the database with the initial data.

###Angular
- Navigate to the aquent-client file in a terminal/console.
- Run `npm install` to install the required packages.
- To start the application run `ng-serve` and navigate to http://localhost:4200.
- Running Angular tests - To run unit tests use `ng-test` in the terminal.

###Swagger
To view the swagger endpoints navigate to http://localhost:8081/swagger-ui.html. in the browser.

##Overview
The Application allows you to view, create, update and delete clients and contacts. Clients can have multiple 
contacts associated with them, contacts are linked to either one or no clients.

## ToDo

###UI
- More unit testing.
- Refactor the form components and create a reusable input or address form.
- Find ways to improve performance.
- Move logic to the backend and try to reduce API calls.

###Back-End

- Unit tests
- Error handling

###Bugs
After updating a client, the redirect to the detail page takes place before the changes to the contacts
have been saved to the database and not displaying on the detail page without a refresh.

