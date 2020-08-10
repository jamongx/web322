const express = require('express')
const router = express.Router();

const Cuisine = require('../models/cuisines');
const Cart = require("../models/cart");

router.get("/customer", (req, res) => {

    let cart = new Cart(req.session.cart ? req.session.cart : {});
    res.render("shopping/customer", {
        title:"Shopping Cart Page",
        items: cart.getItemsArray(),
        totalQty: cart.getTotalQuantity(),
        totalPrice: cart.getTotalPrice()
    });
});


router.get("/purchase",(req,res)=>{

    if(req.session.authorized) {
        Cuisine.findById(req.query._id)
        .exec()
        .then((cuisine) => {
            res.render("shopping/purchase", {
                title : "Purchase Cuisine Page",
                formData: {
                    _id: cuisine._id,
                    rank: cuisine.rank,
                    country: cuisine.country,
                    meals: cuisine.meals,
                    name: cuisine.name,
                    price: cuisine.price,
                    image: cuisine.image,
                    synop: cuisine.synop    
                }      
            });
        })
        .catch(err=>{
            console.log(err);
        });
    }
    else {
        res.redirect('/login');
    }
});


router.post('/purchase', (req, res) => {

    let user = req.session.user;
    let cart = new Cart(req.session.cart ? req.session.cart : {});

    let cartMsg = "Your cart is empty.";
    if(cart.getTotalQuantity() > 0) {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
        const msg = {
            from: `jamongx@gmail.com`,
            to: `${user.email}`,
            subject: '[Jason\'s Cuisines] Your order has purchased!',
            html: 
            `Customer's Name: ${user.firstName} ${user.lastName} <br>
            ${cart.generateTable()} <br>
            Total Quantity: ${cart.getTotalQuantity()} <br>
            Total Price: ${cart.getTotalPrice()} <br>
            Thank you for purchase! <br>`,
        };
    
        sgMail.send(msg)
        .catch((err) => {
            console.log(err);
        });
        cartMsg = "Your purchase has been completed.";
    }

    cart.clear();
    req.session.cart = cart;

    res.render("shopping/customer", {
        title : "Purchase Cuisine Page",
        formData: {
            cartMsg: cartMsg
        }
    });


});

router.post('/addtocart', (req, res) => {

    const _id = req.body._id;

    let cart = new Cart(req.session.cart ? req.session.cart : {});

    Cuisine.findById(_id)
    .exec()
    .then((cuisine) => {
        cart.addItem(_id, cuisine);
        req.session.cart = cart;
        res.redirect('/cuisines/all');
    })
    .catch(err=>{
        res.redirect('/');
        console.log(err);
    });
});

module.exports = router;
