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
