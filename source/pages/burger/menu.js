class Menu {
	constructor(name, list) {
		this.name = name;
		this.list = list;
	}
	
	createMenu() {
		const menu = [];
		let name;
		let ingredients;
		let time;
		this.list.forEach(item => {
			name = item.name;
			ingredients = item.ingredients;
			time = item.time;
			menu.unshift(new Burger(name, ingredients, time));
		});

		return menu;
	}
}

export default Menu;