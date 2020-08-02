const express = require("express");
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');

//mongodb atlas mode for initialize
const databaseModel = require("./models/database");

//load the environment variable file
require('dotenv').config({path:"./config/keys.env"});

const app = express();

//Handlebars middleware (This tells Express to set handlebars as the template engine)
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
    /*cookie: {
        maxAge : two_hour,
        sameSite: true,
        secure: IN_PROD
    }*/
}));

//load controllers
const generalController   = require("./controllers/general");
const cuisineController   = require("./controllers/cuisine");
const dashboardController = require("./controllers/dashboard");

//map each controller to the app object

app.use("/", generalController);
app.use("/cuisines", cuisineController);
app.use("/dashboard", dashboardController);

// parameter: id, passwrod
databaseModel.init(process.env.MONGO_DB)
.then(function() {
    //sets up server
    //const PORT = process.env.PORT;
    const PORT= process.env.PORT || 3000;
    app.listen(PORT,()=>{
        console.log(`Web Server is up and running`);    
    });
}).catch(function(err) {
    console.log(`Web Server is unable`);    
});