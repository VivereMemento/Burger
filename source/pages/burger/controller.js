import model from './model';
import view from './view';

class Controller {
	constructor() {

	}

	invokeXHR() {
		model.sendAjax('https://www.json-generator.com/api/json/get/clvfzayBea?indent=2').then(response => {
			let result = JSON.parse(response);
			let ingredients = [];
			
			for(let key in result.various) {
				ingredients.push({name: key, ingredients: result.various[key], time: 10});
			}
			
			return ingredients;
		}).then( data => {
			view.displayMenu(data);
		}).catch((error) => {
			alert('SOMETHING WRONG WITH DATA');
		});
	}
}

const controller = new Controller();
export default controller;