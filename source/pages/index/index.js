import './index.scss';
import 'normalize.css';

const Hubmburger = [
			'Булка',
			'Огурчик',
			'Котлетка',
			'Бекон',
			'Рыбная котлета',
			'Соус карри',
			'Кисло-сладкий соус',
			'Помидорка',
			'Маслины',
			'Острый перец',
			'Капуста',
			'Кунжут',
			'Сыр Чеддер',
			'Сыр Виолла',
			'Сыр Гауда',
			'Майонез'
	];
const Cheeseburger = [
			'Булка',
			'Огурчик',
			'Котлетка',
			'Бекон',
			'Рыбная котлета',
			'Соус карри',
			'Кисло-сладкий соус',
			
	];
function getElement(selector) {
	return document.querySelector(selector);
}
function getAllElements(selector) {
	return document.querySelectorAll(selector);
}

const btnOrder = getElement('#btn-order');
const btnConfirmOrder = getElement('#btn-confirm');

class Burger {
	constructor(name, composition, cookingTime) {
		this.name = name;
		this.composition = composition;
		this.cookingTime = cookingTime;
	}
	
	showComposition() {
		let {composition, name} = this;
		let compositionLength = composition.length;
		const container = getElement('.ingredients');
		const ingredientsTitle = document.createElement('div');
		const list = document.createElement('ul');
		
		ingredientsTitle.className = 'ingredients__title';
		list.className = 'ingredients__list';

		if( compositionLength !== 0){
			composition.forEach(item => {
				container.insertAdjacentElement('afterBegin', ingredientsTitle);
				ingredientsTitle.insertAdjacentElement('afterEnd', list);
				
				list.insertAdjacentHTML(
					'beforeEnd',
					`<li class="ingredients__item">
						<label class="ingredients__label">
							<input class="ingredients__input" type="checkbox">
							<div class="ingredients__elem"></div>
							<div class="ingredients__text">${item}</div>
						</label>
					</li>`)
			});
		}
	}	
	
}

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

const menuBurger = new Menu('Burger', [
	{name: 'Humburger', ingredients: Hubmburger, time: 10},
	{name: 'Cheesburger', ingredients: Cheeseburger, time: 5}
]);

function createMenu(menu) {
	const title = getElement('.title');
	title.innerText = menu.name;
	
	menu.list.forEach((item, index) => {
		setTimeout(() => {
			const ingredientsTitle = getAllElements('.ingredients__title');
			ingredientsTitle[index].innerText = item.name;
		});
		
		menu.createMenu()[index].showComposition();
	});
}
createMenu(menuBurger);

class Order {
	constructor(id, orderNumber, orderBurger) {
			this.id = id;
			this.orderNumber = orderNumber;
			this.orderBurger = orderBurger;
	}
	
	orderAvailability (list, checkboxes) {
		const Ingredients = [];
		let ingredientsList = list;
		let ingredientsItems = checkboxes;

		ingredientsItems.forEach(item => {
			
			if (item.checked) {
				let textContainer = item.closest('.ingredients__label');
				let text = textContainer.querySelector('.ingredients__text');
				Ingredients.push(text.innerText.toLowerCase());
			}
		});
		return Ingredients;
	}
	
	showModalWindow(ingredients) {
		let { id, orderNumber, orderBurger} = this;
		const modal = getElement('.modal')
		const modalContent = getElement('.modal__content');
		
		const modalList = document.createElement('ul');
		modalList.className = 'modal__list';
		modalContent.insertAdjacentElement('beforeEnd', modalList);
		
		const modalContentTitle = document.createElement('div');
		modalContentTitle.className = 'modal__content-title';
		modalList.insertAdjacentElement('beforeBegin', modalContentTitle);
		modalContentTitle.innerText = orderBurger;
		
		ingredients.forEach(item => {
			modalList.insertAdjacentHTML(
					'beforeEnd',
					`<li class="modal__item">
							<span class="modal__text">${item}</span>
					</li>`
			);
		});
		
		modal.style.display = 'block';
	}
}

btnOrder.addEventListener('click', createOrder);
btnConfirmOrder.addEventListener('click', (e) => {
	e.preventDefault();
	const modal = getElement('.modal')
	const modalContent = getElement('.modal__content');
	modalContent.innerHTML = '';
	modal.style.display = 'none';
});

function createOrder(e) {
	e.preventDefault();
	let order;
	let ingredientsList = getAllElements('.ingredients__list');
	const ingredientsTitle = getAllElements('.ingredients__title');
	
	ingredientsList.forEach((item, index) => {
		let ingredientsItems = item.querySelectorAll('input[type=checkbox]');
		const orderOne = new Order(index, index, ingredientsTitle[index].innerText);
		order = orderOne.orderAvailability(item, ingredientsItems);
		orderOne.showModalWindow(order);
	});
}
