const express = require('express')
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const contentModel = require("../models/contents");

const User = require('../models/users');
const Cuisine = require('../models/cuisines');


router.get("/",(req,res)=>{

    Cuisine.find({rank: true})
    .exec()
    .then((cuisine) => {
        let ranks = [];
        cuisine.forEach(element => {

            ranks.push({
                _id: element._id,
                rank: element.rank,
                coutry: element.coutry,
                meals: element.meals,
                name: element.name,
                price: element.price,
                image: element.image,
                synop: element.synop
            });  
        });

        res.render("general/home", {
            title : "Home Page",
            contents:contentModel.getContents(),
            cuisines:ranks
        });
    })
    .catch(err=>{
        console.log(err);
    });
});


router.get("/login",(req,res)=>{

    res.render("general/login",{
        title:"Login Page",
    });
});


router.post("/login", [
    check('email').isEmail().withMessage('Email is required.'),
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
        User.findOne({email:email})
        .exec()
        .then(user => {
            bcrypt.compare(password, user.password, (err, success) => {
                if(!err && success) {
                    req.session.authorized = true;
                    req.session.user = {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        clerk: user.clerk
                    };

                    req.session.save(function() {
                        if(req.session.user.clerk) {
                            res.redirect('/dashboard/employee');
                        }
                        else {
                            res.redirect('/shopping/customer');
                        }
                    });
                }
                else {
                    res.render("general/login", {
                        title:"Login Page",
                        formData: {
                            email: email,
                            password: password,
                            errorEmail: "",
                            errorPassword: "Sorry, you entered the wrong email and/or password"
                        }
                    });
                }
            });
        }).catch((err) => {
            console.log(err);
        });
    }
});


router.get("/logout",(req,res)=>{

    req.session.destroy(function(err) {
        res.redirect("./login");
    });
});


router.get("/registration",(req,res)=>{

    res.render("general/registration",{
        title:"Registration Page"
    });
});


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
        const newUser = new User ({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        });

        // Generate a "salt" using 10 rounds
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(newUser.password, salt, function(err, hash) {
                if(err) {
                    throw err;
                }
                newUser.password = hash;
                newUser.save()
                .then((user) => {
                    // send email
                    const sgMail = require('@sendgrid/mail');
                    sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
                    const msg = {
                        from: `jamongx@gmail.com`,
                        to: `${user.email}`,
                        subject: '[Jason\'s Cuisines] Registration Complete!',
                        html: 
                        `Subscriber's Full Name: ${user.firstName} ${user.lastName} <br>
                        Subscriber's Email Address: ${user.email} <br>
                        Thank you for signing up! <br>`,
                    };
            
                    sgMail.send(msg)
                    .catch((err) => {
                        console.log(err);
                    });

                    // send email
                    User.findOne({email:email})
                    .exec()
                    .then(user => {
                        bcrypt.compare(password, user.password, (err, success) => {
                            if(!err && success) {
                                req.session.authorized = true;
                                req.session.user = {
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    email: user.email,
                                    clerk: user.clerk
                                };
            
                                req.session.save(function() {
                                    if(req.session.user.clerk) {
                                        res.redirect('/dashboard/employee');
                                    }
                                    else {
                                        res.redirect('/shopping/customer');
                                    }
                                });
                            }
                        });
                    }).catch((err) => {
                        console.log(err);
                    });
                })
                .catch((err) => {
                    console.log(err);
                    User.findOne({ email:newUser.email })
                    .exec()
                    .then(() => {
                        res.render("general/registration", {
                            title:"Registration Page",
                            formData: {
                                firstName: newUser.firstName,
                                lastName: newUser.lastName,
                                email: newUser.email,
                                errorEmail: "Email address already exists."
                            }
                        });    
                    })
                    .catch(err=>{
                        console.log(err);
                    });
    
                });




            });
        });
    }
});

module.exports = router;
