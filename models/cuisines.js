const cuisine = 
{
    fakeDB : [],
    
    init()
    {
        this.fakeDB.push( {rank:false, country: "Korean", meals:2, name:"Samgye-Tang", price:300, image:"/img/korean/samgyetang.jpg", synop:"This fragrant Korean chicken soup features whole small chickens stuffed with sticky rice and assorted goodies in an herbal broth. It's traditionally considered a summer dish, but it's equally delicious year-round." });
        this.fakeDB.push( {rank:true, country: "Korean", meals:4, name:"Bulgogi", price:300, image:"/img/korean/bulgogi.jpg", synop:"Korean-style grilled or roasted dish) made of thin, marinated slices of beef or pork grilled on a barbecue or on a stove-top griddle." });
        this.fakeDB.push( {rank:false, country: "Korean", meals:4, name:"Samgyeopsal", price:300, image:"/img/korean/samgyeopsal.jpg", synop:"Grilled pork belly (Samgyeopsal-gui) is an extremely popular Korean BBQ dish." });
        this.fakeDB.push( {rank:false, country: "Korean", meals:2, name:"Tteokbokki", price:300, image:"/img/korean/tteokbokki.jpg", synop:"Among other things, today’s recipe is made with Korean rice cakes, Korean fish cakes, Korean soup stock / dashi stock and gochujang (Korean chili paste)!" });

        this.fakeDB.push( {rank:true, country: "Italian", meals:3, name:"Bottarga", price:300, image:"/img/italian/bottarga.jpg", synop:"Bottarga is a delicacy of salted, cured fish roe, typically of the grey mullet or the bluefin tuna (bottarga di tonno)." });
        this.fakeDB.push( {rank:false, country: "Italian", meals:4, name:"Fiorentina Steak", price:300, image:"/img/italian/fiorentina_steak.jpg", synop:"Bistecca alla Fiorentina is an impressive dish of Porterhouse steak done Florentine style." });
        this.fakeDB.push( {rank:false, country: "Italian", meals:3, name:"Lasagna", price:300, image:"/img/italian/lasagna.jpg", synop:"Lasagne is also an Italian dish made of stacked layers of this flat pasta alternating with fillings such as ragù and other vegetables, cheese, and seasonings and spices such as garlic, oregano and basil." });
        this.fakeDB.push( {rank:false, country: "Italian", meals:4, name:"Pizza", price:300, image:"/img/italian/pizza.jpg", synop:"Pizza is a savory dish of Italian origin consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and often various other ingredients" });
        
        this.fakeDB.push( {rank:false, country: "Mexican", meals:2, name:"Chilaquiles", price:300, image:"/img/mexican/chilaquiles.jpg", synop:"Chilaquiles is a traditional Mexican dish consisting of corn tortillas cut in quarters and lightly fried." });
        this.fakeDB.push( {rank:false, country: "Mexican", meals:3, name:"Enchiladas", price:300, image:"/img/mexican/enchiladas.jpg", synop:"An enchilada is a corn tortilla rolled around a filling and covered with a savory sauce." });
        this.fakeDB.push( {rank:true, country: "Mexican", meals:4, name:"Pozole", price:300, image:"/img/mexican/pozole.jpg", synop:"Pozole is a traditional soup or stew from Mexican cuisine. It is made from hominy with meat" });
        this.fakeDB.push( {rank:false, country: "Mexican", meals:3, name:"Tostadas", price:300, image:"/img/mexican/tostadas.jpg", synop:"Tostadas are meant to be messy! Pile them with your favorite toppings and dig in." });

        this.fakeDB.push( {rank:false, country: "Indian", meals:3, name:"Malai Kofta", price:300, image:"/img/indian/malai_kofta.jpg", synop:"Malai Kofta is a very popular Indian vegetarian dish where balls (kofta) made of potato and paneer are deep fried and served with a creamy and spiced tomato based curry." });
        this.fakeDB.push( {rank:false, country: "Indian", meals:3, name:"Rogan Josh", price:300, image:"/img/indian/rogan_josh.jpg", synop:"Rogan Josh is an aromatic curried meat dish of Persian or Kashmiri origin" });
        this.fakeDB.push( {rank:false, country: "Indian", meals:4, name:"Palak Paneer", price:300, image:"/img/indian/palak_paneer.jpg", synop:"Palak Paneer is one of the most popular paneer dishes. Paneer (Indian cottage cheese) is cooked with spinach and spices in this creamy and flavorful curry." });
        this.fakeDB.push( {rank:true, country: "Indian", meals:2, name:"Tandoori Chicken", price:300, image:"/img/indian/tandoori_chicken.jpg", synop:"Tandoori chicken is an Indian chicken dish prepared by roasting chicken marinated in yogurt and spices in a tandoor cylindrical clay oven" });
    },

    getCuisines(country)
    {
        if(country) {
            return this.fakeDB.filter(cuisine => cuisine.country === country);
        }
        return this.fakeDB;
    },

    getRanks()
    {
        return this.fakeDB.filter(cuisine => cuisine.rank === true);
    }
}

cuisine.init();
module.exports = cuisine;
//export default = ServiceDB // ES6 Modules syntax