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


//process login form for when user submits form
// res.status(422).json({ errors: errors.array() });
// {"errors":[{"value":"","msg":"Invalid value","param":"email","location":"body"},
//            {"value":"","msg":"Invalid value","param":"password","location":"body"}]}
router.post("/login", [
    check('email').not().isEmpty(),
    check('password').not().isEmpty()
], (req,res)=>{

    const {email,password} = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const temp = [];
        errors.array().forEach(function(err) {
            temp.push(err.param +" " +err.msg);
        });
        res.render("general/login", {
            title:"Login Page",
            formData: {
                email: email,
                password: password,
                errorEmail: temp.filter(name => name.includes('email')),
                errorPassword: temp.filter(name => name.includes('password'))
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
router.post("/registration", [
    check('firstName').not().isEmpty().withMessage('First name is required.'),
    check('lastName').not().isEmpty().withMessage('Last name is required.'),
    check('email').isEmail().withMessage('Email address is required.'),
    check('password')
        .isLength({min:6, max:12}).withMessage('must enter a password that is 6 to 12 characters')
        .isAlphanumeric().withMessage('must have letters and numbers only')
], (req,res)=>{

    const {firstName,lastName,email,password} = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        
        const temp = [];
        errors.array().forEach(function(err) {
            temp.push(err.param +" " +err.msg);
        });

        res.render("general/registration", {
            title:"Registration Page",
            formData: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                errorFirst: temp.filter(name => name.includes('firstName')),
                errorLast: temp.filter(name => name.includes('lastName')),
                errorEmail: temp.filter(name => name.includes('email')),
                errorPassword: temp.filter(name => name.includes('password'))
            }
        });
    }
    else {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
        const msg = {
            from: `jamongx@gmail.com`,
            to: `${email}`,
            subject: 'Contact Us Form Submit',
            html: 
            `Subscriber's Full Name ${firstName} ${lastName} <br>
            Subscriber's Email Address ${email} <br>
            Thank you for signing up! <br>
            Registration Complete! <br>`,
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