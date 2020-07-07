const express = require('express')
const router = express.Router();

const { check, validationResult } = require('express-validator');

const contentModel = require("../models/contents");
const cuisineModel = require("../models/cuisines");

//home route
router.get("/",(req,res)=>{

    res.render("general/home",{
        title : "Home Page",
        contents:contentModel.getContents(),
        cuisines:cuisineModel.getRanks()
    });
});


//login route
router.get("/login",(req,res)=>{

    res.render("general/login",{
        title:"Login Page"
    });
});


router.post("/login", [
    check('email').not().isEmpty().withMessage('Email is required.'),
    check('password').not().isEmpty().withMessage('Password is required.')
], (req,res)=>{

    const {email,password} = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const temp = [];
        errors.array().forEach(function(err) {
            temp.push(err.msg);
        });
        res.render("general/login", {
            title:"Login Page",
            formData: {
                email: email,
                password: password,
                errorEmail: temp.filter(name => name.includes('Email')),
                errorPassword: temp.filter(name => name.includes('Password'))
            }
        });
    }
    else {
        res.redirect("/");
    }
});


//registration route
router.get("/registration",(req,res)=>{

    res.render("general/registration",{
        title:"Registration Page"
    });
});


//process registration form for when user submits form
router.post("/registration", (req,res)=>{

    const {firstName,lastName,email,password} = req.body;

    const errors = [];
    if (firstName.length <= 0) {
        errors.push("First name is required.");
    }
    if (lastName.length <= 0) {
        errors.push("Last name is required.");
    }
    if (email.length <= 0) {
        errors.push("Email address is required.");
    }
    else {
        if(!/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(email)) {
            errors.push("Wrong Email address format");
        }
    }
    if (password.length <= 0) {
        errors.push("Password is required.");
    }
    else {
        if(!/^[a-zA-Z0-9]{6,12}$/.test(password)) {
            errors.push("Enter a Password 6-12 digits using a combination of numbers and letters");
        }
    }

    if (errors.length > 0) {
        res.render("general/registration", {
            title:"Registration Page",
            formData: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                errorFirst: errors.filter(name => name.includes('First')),
                errorLast: errors.filter(name => name.includes('Last')),
                errorEmail: errors.filter(name => name.includes('Email')),
                errorPassword: errors.filter(name => name.includes('Password'))
            }
        });
    }
    else {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
        const msg = {
            from: `jamongx@gmail.com`,
            to: `${email}`,
            subject: '[Jason\'s Cuisines] Registration Complete!',
            html: 
            `Subscriber's Full Name: ${firstName} ${lastName} <br>
            Subscriber's Email Address: ${email} <br>
            Thank you for signing up! <br>`,
        };

        sgMail.send(msg)
        .then(()=>{
            res.redirect(`/dashboard/?param1=${firstName}&param2=${lastName}&param3=${email}`);
        })
        .catch(err=>{
            console.log(`Error ${err}`);
        });
    }
});

router.get("/dashboard", (req, res) => {


    res.render("general/dashboard", {
        title:"Dashboard Page",
        firstName: req.query.param1,
        lastName: req.query.param2,
        email: req.query.param3
    });
});

module.exports = router;