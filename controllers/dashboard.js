const express = require('express')
const router = express.Router();
// const { check, validationResult } = require('express-validator');

const Cuisine = require('../models/cuisines');

const multer = require('multer');
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `public/img/${req.body.country.toLowerCase()}/`);
            },
            filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    }),
});

router.get("/customer", (req, res) => {

    res.render("dashboard/customer", {
        title:"Customer's Dashboard Page",
        user: req.session.user
    });
});


router.get("/employee", (req, res) => {

    Cuisine.find()
    .exec()
    .then((cuisine) => {
        let all_list = [];
        cuisine.forEach(element => {

            all_list.push({
                _id: element._id,
                rank: element.rank,
                country: element.country,
                meals: element.meals,
                name: element.name,
                price: element.price,
                image: element.image,
                synop: element.synop
            });
        });

        res.render("dashboard/employee", {
            title:"Employee's Dashboard Page",
            user: req.session.user,
            cuisines:all_list
        });
    })
    .catch(err=>{
        console.log(err);
    });
});


//route create handlebars page
router.get("/create", (req,res) => {

    res.render("dashboard/create",{
        title:"Create Cuisine Package Page",
        user: req.session.user
    });
});


//process registration form for when user submits form
// image -> name of input
router.post("/create", upload.single("image"), (req,res)=>{
    const {rank,country,meals,name,price,image,synop} = req.body;

    const errors = [];
    if (name.length <= 0) {
        errors.push("Name is required.");
    }
    if (price <= 0) {
        errors.push("Price should be bigger than 0");
    }
    /*TypeError: Cannot read property 'length' of undefined
    if (image.length <= 0) {
        errors.push("Image is required.");
    }*/
    if (synop.length <= 0) {
        errors.push("Synop is required.");
    }

    if (errors.length > 0) {
        res.render("dashboard/create",{
            title:"Create Cuisine Package Page",
            user: req.session.user,
            formData: {
                rank: rank,
                country: country,
                meals: meals,
                name: name,
                price: price,
                synop: synop,
                errorName: errors.filter(name => name.includes('Name')),
                errorPrice: errors.filter(name => name.includes('Price')),
                errorEmail: errors.filter(name => name.includes('Email')),
                errorSynop: errors.filter(name => name.includes('Synop'))
            }
        });
    }
    else {
        const newCuisine = new Cuisine ({
            rank:    rank, 
            country: country,
            meals:   meals,
            name:    name,
            price:   price,
            image:   req.file.destination.substr(6) +req.file.originalname, // remove public (sizeof->6)
            synop:   synop
        });

        newCuisine.save()
        .then((cuisine) => {
            res.redirect(`./read/?_id=${cuisine._id}`);
        })
        .catch((err) => {
            // send status (error)
            console.log(err);
        });

    }
});



//home route
router.get("/read",(req,res)=>{
    Cuisine.findById(req.query._id)
    .exec()
    .then((cuisine) => {
        res.render("dashboard/read", {
            title : "Read The Detail Cuisine Page",
            user: req.session.user,
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
});


//process registration form for when user submits form
// image -> name of input
router.post("/read", upload.single("image"), (req,res)=>{

    console.log("read, req.body");
    console.log(req.body);

    const {rank,country,meals,name,price,image,synop} = req.body;

    const errors = [];
    if (name.length <= 0) {
        errors.push("Name is required.");
    }
    if (price <= 0) {
        errors.push("Price should be bigger than 0");
    }
    /*TypeError: Cannot read property 'length' of undefined
    if (image.length <= 0) {
        errors.push("Image is required.");
    }*/
    if (synop.length <= 0) {
        errors.push("Synop is required.");
    }

    if (errors.length > 0) {
        res.render("dashboard/update",{
            title:"Update Cuisine Package Page",
            user: req.session.user,
            formData: {
                rank: rank,
                country: country,
                meals: meals,
                name: name,
                price: price,
                synop: synop,
                errorName: errors.filter(name => name.includes('Name')),
                errorPrice: errors.filter(name => name.includes('Price')),
                errorEmail: errors.filter(name => name.includes('Email')),
                errorSynop: errors.filter(name => name.includes('Synop'))
            }
        });
    }
    else {
        const newCuisine = new Cuisine ({
            rank:    rank, 
            country: country,
            meals:   meals,
            name:    name,
            price:   price,
            image:   req.file.destination.substr(6) +req.file.originalname, // remove public (sizeof->6)
            synop:   synop
        });

        newCuisine.save()
        .then((cuisine) => {
            res.send('업로드 성공!');
        })
        .catch((err) => {
            console.log(err);
        });

    }
});


//route update handlebars page
router.get("/update", (req,res) => {
    Cuisine.findById(req.query._id)
    .exec()
    .then((cuisine) => {
        res.render("dashboard/update", {
            title:"Update Cuisine Package Page",
            user: req.session.user,
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
});


//process registration form for when user submits form
// image -> name of input
// console.log("[post] update, req.body" +req.body); -> an error occurs
router.post("/update", upload.single("image"), (req,res)=>{

    const {_id,rank,country,meals,name,price,image,synop} = req.body;

    const errors = [];
    if (name.length <= 0) {
        errors.push("Name is required.");
    }
    if (price <= 0) {
        errors.push("Price should be bigger than 0");
    }
    /*TypeError: Cannot read property 'length' of undefined
    if (image.length <= 0) {
        errors.push("Image is required.");
    }*/
    if (synop.length <= 0) {
        errors.push("Synop is required.");
    }

    if (errors.length > 0) {
        res.render("dashboard/update", {
            title:"Update Cuisine Package Page",
            user: req.session.user,
            formData: {
                _id: _id,
                rank: rank,
                country: country,
                meals: meals,
                name: name,
                price: price,
                image: image,
                synop: synop,
                errorName: errors.filter(name => name.includes('Name')),
                errorPrice: errors.filter(name => name.includes('Price')),
                errorEmail: errors.filter(name => name.includes('Email')),
                errorSynop: errors.filter(name => name.includes('Synop'))
            }    
        });
    }
    else {
        let setter = { rank: rank, country: country, meals: meals, name: name, price: price, synop: synop, };
        if(req.file) {
            setter["image"] = req.file.destination.substr(6) +req.file.originalname;
        }
        
        Cuisine.findByIdAndUpdate( _id, setter )
        .exec()
        .then((cuisine) => {
            console.log(cuisine);
            res.redirect(`./read/?_id=${cuisine._id}`);
        })
        .catch(err=>{
            console.log(err);
        });
    }
});

module.exports = router;