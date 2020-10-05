## Heroku
- https://jasonyang-web322.herokuapp.com/


## Login account
- Regular User: jamongx@gmail.com / wozh7510
- Clerk: alice@gmail.com / abcd1234


## Application Architecture
- This application has been structured fully according to the MVC Design pattern
- All sensitive credential information is stored in the environment variables of Heroku.


## User Registration Module
- Once the user account is created, my web application redirects the user to a dashboard page.
- Setup and configure a MongoDB cloud service using mongoDB Atlas
- Connect this web application to your mongoDB database using an ODM called Mongoose.
- Named your database and collections appropriately.
- This application doesn't allow different users to have the same email in the database. for this, I set a unique field to the email field of User schema.
- Passwords aren't stored in plain text in the database; I used a 3rd party package called bcryptjs.


## Authentication Module
- This application allows a clerk and customers who want to purchase meal packages.
- Upon successful authentication, a session is created to maintain the user state until they have logged out of the application. 
- Upon an unsuccessful authentication, the application must display an appropriate message.
- After successfully authenticating, the application determines if the person logging in is a data a clerk or a regular user and A customer will be directed to a user dashboard and a data entry clerk will be directed to a data entry clerk dashboard. Both dashboards, show the user's name (first name and last name) and a logout link
- The logout link destroys the session created when the user initially authenticated.
- Specific routes are accessed when users are logged-in, thus those routes are protected.
- After log-out, anyone can't access the dashboard of a clerk and the shopping cart of a regular user. Before authenticating, only login and registration are displayed.


## Data Entry Clerk Module
- Create Meal Packages: The Clerk can add new meal packages to the database.
- Home Page: only meal packages that are set as "Top Meal Packages" are populated in the "Top Meal Package" section of the home page.
- A Clerk can only upload an image, i.e. jpg, gif, png, for the meal package photo.
- View a list of all created meal packages.
- Edit and change meal package details for a selected meal package.


## Meal Package Description Page
- Only logged in a regular user can "purchase" meal packages by adding selected meal packages to their shopping cart. 
- When the user clicks the "Add to order" button, the given package will be added to the user's shopping cart.
