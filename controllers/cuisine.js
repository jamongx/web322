const express = require('express')
const router = express.Router();

const Cuisine = require('../models/cuisines');


//show all cuisine
router.get("/all",(req,res)=>{

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

        res.render("cuisines/cuisineList",{
            title:"All Cuisines",
            user: req.session.user,
            cuisines:all_list
        });
    })
    .catch(err=>{
        console.log(err);
    });
});


router.get("/korean",(req,res)=>{

    Cuisine.find({country: "Korean"})
    .exec()
    .then((cuisine) => {
        let korean = [];
        cuisine.forEach(element => {

            korean.push({
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

        res.render("cuisines/cuisineList",{
            title:"Korean Cuisines",
            user: req.session.user,
            cuisines:korean
        });
    })
    .catch(err=>{
        console.log(err);
    });
});


router.get("/italian",(req,res)=>{

    Cuisine.find({country: "Italian"})
    .exec()
    .then((cuisine) => {
        let italian = [];
        cuisine.forEach(element => {

            italian.push({
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

        res.render("cuisines/cuisineList",{
            title:"Italian cuisines",
            user: req.session.user,
            cuisines:italian
        });
    })
    .catch(err=>{
        console.log(err);
    });
});


router.get("/mexican",(req,res)=>{

    Cuisine.find({country: "Mexican"})
    .exec()
    .then((cuisine) => {
        let mexican = [];
        cuisine.forEach(element => {

            mexican.push({
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

        res.render("cuisines/cuisineList",{
            title:"Mexican cuisines",
            user: req.session.user,
            cuisines:mexican
        });
    })
    .catch(err=>{
        console.log(err);
    });
});

router.get("/indian",(req,res)=>{

    Cuisine.find({country: "Indian"})
    .exec()
    .then((cuisine) => {
        let indian = [];
        cuisine.forEach(element => {

            indian.push({
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

        res.render("cuisines/cuisineList",{
            title:"Indian cuisines",
            user: req.session.user,
            cuisines:indian
        });
    })
    .catch(err=>{
        console.log(err);
    });
});

module.exports = router;


//=========================================================================
//const databaseModel = require("../models/database"); //mongodb atlas mode
//const cuisineModel = require("../models/cuisines"); //load cuisineModel
/*res.render("cuisines/cuisineList",{
    title:"Korean Cuisines",
    user: req.session.user,
    cuisines:cuisineModel.getCuisines("Korean")
});
});

router.get("/italian",(req,res)=>{

res.render("cuisines/cuisineList",{
    title:"Italian cuisines",
    user: req.session.user,
    cuisines:cuisineModel.getCuisines("Italian")
});
});

router.get("/mexican",(req,res)=>{

res.render("cuisines/cuisineList",{
    title:"Mexican cuisines",
    user: req.session.user,
    cuisines:cuisineModel.getCuisines("Mexican")
});
});

router.get("/indian",(req,res)=>{

res.render("cuisines/cuisineList",{
    title:"Indian cuisines",
    user: req.session.user,
    cuisines:cuisineModel.getCuisines("Indian")
});
});

module.exports = router;*/