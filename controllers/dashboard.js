const express = require('express')
const router = express.Router();
const { check, validationResult } = require('express-validator');
const fs = require('fs');

const Cuisine = require('../models/cuisines');
const multer = require('multer');
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `public/img/cuisines/`);
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    }),
});


router.get("/employee", (req, res) => {

    Cuisine.find().sort({country:1})
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
            cuisines:all_list
        });
    })
    .catch(err=>{
        console.log(err);
    });
});


router.get("/create", (req,res) => {

    res.render("dashboard/create",{
        title:"Create Cuisine Package Page"
    });
});


router.post("/create", upload.single("image"), [
    check('rank').notEmpty().withMessage('Rank is required.'),
    check('country').notEmpty().withMessage('Country is required.'),
    check('meals').isInt({ gt: 0 }).withMessage('Meals is required.'),
    check('name').notEmpty().withMessage('Name is required.'),
    check('price').isFloat({ gt: 0 }).withMessage('Price is required.'),
    check('synop').notEmpty().withMessage('Description is required.')
], (req,res)=>{

    const {rank,country,meals,name,price,synop} = req.body;

    // image validation
    let image = "";
    let errorImage = "";
    if(req.file !== undefined) {
        image = req.file.destination.substr(6) +req.file.originalname;
        if (!image.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/)) {
            errorImage = `Wrong file: ${req.file.originalname}, PNG, JPG, and GIF files are allowed.`;
        }
    }
    else {
        errorImage = "Image is required.";
    }

    const errors = validationResult(req);
    if (!errors.isEmpty() || errorImage !== "") {
        const temp = [];
        errors.array().forEach(function(err) {
            temp.push(err.msg);
        });

        // delete the uploaded file
        if(req.file !== undefined) {
            fs.unlink(req.file.destination+req.file.originalname, (err) => {
                if (err) {
                    console.error(err);
                }
            });    
        }

        res.render("dashboard/create",{
            title:"Create Cuisine Package Page",
            formData: {
                rank: rank,
                country: country,
                meals: meals,
                name: name,
                price: price,
                image: image,
                synop: synop,
                errorRank: temp.filter(name => name.includes('Rank')),
                errorCountry: temp.filter(name => name.includes('Country')),
                errorMeals: temp.filter(name => name.includes('Meals')), 
                errorName: temp.filter(name => name.includes('Name')),
                errorPrice: temp.filter(name => name.includes('Price')),
                errorImage: errorImage,
                errorEmail: temp.filter(name => name.includes('Email')),
                errorSynop: temp.filter(name => name.includes('Description'))
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
            image:   image,
            synop:   synop
        });

        newCuisine.save()
        .then((cuisine) => {
            res.redirect(`./read/?_id=${cuisine._id}`);
        })
        .catch((err) => {
            console.log(err);
        });

    }
});


router.get("/read",(req,res)=>{
    Cuisine.findById(req.query._id)
    .exec()
    .then((cuisine) => {
        res.render("dashboard/read", {
            title : "Read The Detail Cuisine Page",
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


router.get("/update", (req,res) => {
    Cuisine.findById(req.query._id)
    .exec()
    .then((cuisine) => {
        res.render("dashboard/update", {
            title:"Update Cuisine Package Page",
            formData: {
                _id: cuisine._id,
                rank: cuisine.rank,
                country: cuisine.country,
                meals: cuisine.meals,
                name: cuisine.name,
                price: cuisine.price,
                imageOrg: cuisine.image,
                synop: cuisine.synop    
            }      
        });
    })
    .catch(err=>{
        console.log(err);
    });
});


router.post("/update", upload.single("image"), [
    check('meals').isInt({ gt: 0 }).withMessage('Meals is required.'),
    check('name').notEmpty().withMessage('Name is required.'),
    check('price').isFloat({ gt: 0 }).withMessage('Price is required.'),
    check('synop').notEmpty().withMessage('Description is required.')
], (req,res)=>{
    
    const {_id, rank,country,meals,name,price,imageOrg,synop} = req.body;

    // image validation
    let image = "";
    let errorImage = "";
    if(req.file !== undefined) {
        image = req.file.destination.substr(6) +req.file.originalname;
        if (!image.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/)) {
            errorImage = `Wrong file: ${req.file.originalname}, PNG, JPG, and GIF files are allowed.`;
        }
    }

    const errors = validationResult(req);
    if (!errors.isEmpty() || errorImage !== "") {
        const temp = [];
        errors.array().forEach(function(err) {
            temp.push(err.msg);
        });

        // delete the uploaded file
        if(req.file !== undefined) {
            fs.unlink(req.file.destination+req.file.originalname, (err) => {
                if (err) {
                    console.error(err);
                }
            });    
        }

        res.render("dashboard/update", {
            title:"Update Cuisine Package Page",
            formData: {
                _id: _id,
                rank: rank,
                country: country,
                meals: meals,
                name: name,
                price: price,
                imageOrg: imageOrg, // display the previous image again because of an error case
                synop: synop,
                errorMeals: temp.filter(name => name.includes('Meals')), 
                errorName: temp.filter(name => name.includes('Name')),
                errorPrice: temp.filter(name => name.includes('Price')),
                errorImage: errorImage,
                errorEmail: temp.filter(name => name.includes('Email')),
                errorSynop: temp.filter(name => name.includes('Description'))
            }
        });
    }
    else {
        let setter = { rank: rank, country: country, meals: meals, name: name, price: price, synop: synop, };
        if(image !== "") {
            setter["image"] = image;
        }
        
        Cuisine.findByIdAndUpdate( _id, setter )
        .exec()
        .then((cuisine) => {
            res.redirect(`./read/?_id=${cuisine._id}`);
        })
        .catch(err=>{
            console.log(err);
        });
    }
});


router.get("/delete", (req,res) => {

    Cuisine.findOneAndRemove( {_id: req.query._id} )
    .exec()
    .then((cuisine) => {
        fs.unlink("public" +cuisine.image, (err) => {
            if (err) {
                console.error(err);
            }
        });
        res.redirect(`./employee`);
    })
    .catch(err=>{
        console.log(err);
    });
});


module.exports = router;