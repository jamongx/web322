const express = require("express");
const exphbs  = require('express-handlebars');
const handlebars = require('./helpers/handlebars.helper')(exphbs);
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

//mongodb atlas mode for initialize
const databaseModel = require("./models/database");

//load the environment variable file
require('dotenv').config({path:"./config/keys.env"});

const app = express();

//Handlebars middleware (This tells Express to set handlebars as the template engine)
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 60 * 60 * 1000 }
}));

//load controllers
const generalController   = require("./controllers/general");
const cuisineController   = require("./controllers/cuisine");
const dashboardController = require("./controllers/dashboard");
const shoppingController  = require("./controllers/shopping");

// global variable
app.use(function(req, res, next) {
    res.locals.authorized = req.session.authorized;
    res.locals.user = req.session.user;
    res.locals.cart = req.session.cart;
    next();
});

//map each controller to the app object
app.use("/", generalController);
app.use("/cuisines", cuisineController);
app.use("/dashboard", dashboardController);
app.use("/shopping", shoppingController);


databaseModel.init(process.env.MONGO_DB)
.then(function() {

    const PORT= process.env.PORT || 3000;
    app.listen(PORT,()=>{
        console.log(`Web Server is up and running`);    
    });
}).catch(function(err) {
    console.log(`Web Server is unable`);    
});