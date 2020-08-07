const content =
{
    fakeDB : [],
    
    init()
    {
        this.fakeDB.push( {name:"Tasty",      desc:"Serve tasty world's cuisines", image:"/img/contents/tasty.jpg"});
        this.fakeDB.push( {name:"Chef",       desc:"Work with great Chefs", image:"/img/contents/chef.jpg"});
        this.fakeDB.push( {name:"Ingredient", desc:"Uses good ingredients", image:"/img/contents/ingredient.jpg"});
        this.fakeDB.push( {name:"Delivery",   desc:"Promise fast delivery", image:"/img/contents/delivery.jpg"});
    },

    getContents()
    {
        return this.fakeDB;
    }
};

content.init();
module.exports = content;
//export default = ServiceDB // ES6 Modules syntax


/*const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let contentSchema = new Schema({
    rank:    { type: Boolean, default: false },
    country: { type: String },
    meals:   { type: Number },
    name:    { type: String, index: true, unique: true },
    price:   { type: Number },
    image:   { type: String },
    synop:   { type: String }
});

module.exports = mongoose.model('Content', contentSchema);*/