module.exports = function Cart(oldCart) {
	
	this.list = oldCart.list || {};
	this.total_quantity = oldCart.total_quantity || 0;
	this.total_price = oldCart.total_price || 0;

	this.addItem = function(_id,  cuisine) {
		let item = this.list[_id];
		if(item === undefined) {
			item = this.list[_id] = {cuisine: cuisine, quantity: 0, price: 0};
		}

		item.quantity++;
		item.price = item.cuisine.price * item.quantity;		
		this.total_quantity++;
		this.total_price += item.price;
	};

	this.getItemsArray = function() {
		let arr = [];
		for(let _id in this.list) {
			arr.push(this.list[_id]);
		}
		return arr;
	};

	this.getTotalQuantity = function() {
		return this.total_quantity;
	};

	this.getTotalPrice = function() {
		return this.total_price;
	};

	this.clear = function() {
		for(let _id in this.list) {
			if (this.list.hasOwnProperty(_id)){
				delete this.list[_id];
			}			
		}
		this.total_quantity = 0;
		this.total_price = 0;
	};

	this.generateTable = function() {
		let array = this.getItemsArray();
		let thead = `<thead><th>Name</th><th>Meals</th><th>Price</th><th>Quantity</th></thead>`;
		let tbody = "<tbody>";
		for(let i = 0 ; i < array.length ; i++) {
			tbody += ("<tr><td>" +array[i].cuisine.name +"</td>");
			tbody += ("<td>" +array[i].cuisine.meals +"</td>");
			tbody += ("<td>" +array[i].price +"</td>");
			tbody += ("<td>" +array[i].quantity +"</td></tr>");
		}
		tbody += "</tbody>";
		return ("<table>" +thead +tbody +"</table>");
	};

};

