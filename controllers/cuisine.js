const express = require('express')
const router = express.Router();

//load cuisineModel
const cuisineModel = require("../models/cuisines");

//show all cuisine
router.get("/all",(req,res)=>{

    res.render("cuisines/cuisineList",{
        title:"All Cuisines",
        cuisines:cuisineModel.getCuisines()
    });
});

router.get("/korean",(req,res)=>{

    res.render("cuisines/cuisineList",{
        title:"Korean Cuisines",
        cuisines:cuisineModel.getCuisines("Korean")
    });
});

router.get("/italian",(req,res)=>{

    res.render("cuisines/cuisineList",{
        title:"Italian cuisines",
        cuisines:cuisineModel.getCuisines("Italian")
    });
});

router.get("/mexican",(req,res)=>{

    res.render("cuisines/cuisineList",{
        title:"Mexican cuisines",
        cuisines:cuisineModel.getCuisines("Mexican")
    });
});

router.get("/indian",(req,res)=>{
    
    res.render("cuisines/cuisineList",{
        title:"Indian cuisines",
        cuisines:cuisineModel.getCuisines("Indian")
    });
});

module.exports = router;