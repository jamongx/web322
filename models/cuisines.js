const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let cuisineSchema = new Schema({
    rank:    { type: Boolean, default: false },
    country: { type: String },
    meals:   { type: Number },
    name:    { type: String, index: true, unique: true },
    price:   { type: Number },
    image:   { type: String, unique: true },
    synop:   { type: String }
});

module.exports = mongoose.model('Cuisine', cuisineSchema);