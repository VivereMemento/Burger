import './zoo.scss';
import 'normalize.css';
import toggleDisplay from './toggle-display';

function getElement(selector) {
	return document.querySelector(selector);
};

function getAllElements(selector) {
	return document.querySelectorAll(selector);
};

class Zoo {
	constructor(name, animalCount) {
		this.name = name;
		this.animalCount = animalCount;
		this.zone = {
			mammals: [],
			birds: [],
			fishes: [],
			reptile: []
		};
	}

	addAnimal(animal){
		console.log(animal);
		let str = 'SORRY, TO CREATE AN ANIMAL YOU NEED CHOOSE TYPE OF ZONE OF THE ANIMAL';

		if ( animal === null) {
			toggleDisplay('.modal', '.modal__title', str);
			return;
		}

		for (let zone in this.zone) {

			if(zone === animal.zone) {
				let str = `my congratulations! You create the ${animal.type} ${animal.name}`;
				this.zone[zone].push(animal);
				toggleDisplay('.modal', '.modal__title', str);
			}
		}
	};
	removeAnimal(data){
		let str = 'SORRY, TO DELETE AN ANIMAL YOU NEED CHOOSE TYPE OF ZONE OF THE ANIMAL AND ITS NAME';
		let noName = 'SORRY, THE ANIMAL YOU NEED WAS NOT FOUND'
		if ( data.name === '') {
			toggleDisplay('.modal', '.modal__title', str);
			return;
		}
		for (let zone in this.zone) {
			this.zone[zone].forEach((item, index) => {
				if(item.name === data.name) {
					this.zone[zone].splice(index, 1);
				} else {
					toggleDisplay('.modal', '.modal__title', noName);
				}
			});
		}
	};

	getAnimal(data){
		if ( data.zone === undefined || data.name === '') {
			let str = 'SORRY, TO GET INFORMATION ABOUT AN ANIMAL YOU NEED CHOOSE TYPE OF ZONE OF THE ANIMAL AND ITS NAME';
			toggleDisplay('.modal', '.modal__title', str);
			return;
		}
		
		this.zone[data.zone].forEach(item => {
			let str = 'SORRY, THE ANIMAL YOU NEED WAS NOT FOUND'

			if(item.name === data.name) {
				let str = `you find the ${item.type} ${item.name}`;
				toggleDisplay('.modal', '.modal__title', str);
			} else {
				toggleDisplay('.modal', '.modal__title', str);
			}
		})
	};

	countAnimals(selector){
		let elems = getAllElements(selector);
		let count=0;

		for (let zone in this.zone) {
			elems[count].innerText = this.zone[zone].length;
			count++;
		}
	};
};

class Animal {
	constructor(zone, type, foodType) {
		this.zone = zone;
		this.type = type;
		this.foodType = foodType;
	};

	eatSomething() {

	};
};

function createAnimal(data) {
	if ( data.zone === undefined) {
		return  null;
	}
	
	if ( data.zone === 'mammals') {
		class Mammal extends Animal {
			constructor(name, phrase, speed) {
				super(data.zone, data.type, data.food);
				this.name = name;
				this.phrase = phrase;
				this.speed = speed;
			};

			run() {
				console.log( `${this.type} ${this.name} run with speed ${this.speed} km/h` );
			};
		};
		let animal = new Mammal(data.name, data.phrase, data.speed);

		return animal;
	}
	if ( data.zone === 'birds') {
		class Bird extends Animal {
			constructor(name, phrase, speed) {
				super(data.zone, data.type, data.food);
				this.name = name;
				this.phrase = phrase;
				this.speed = speed;
			};

			fly() {
				console.log( `${this.type} ${this.name} run with speed ${this.speed} km/h` );
			};
		};
		let animal = new Bird(data.name, data.phrase, data.speed);

		return animal;
	}
	if ( data.zone === 'fishes') {
		class Fishe extends Animal {
			constructor(name, phrase, speed) {
				super(data.zone, data.type, data.food);
				this.name = name;
				this.phrase = phrase;
				this.speed = speed;
			};

			swim() {
				console.log( `${this.type} ${this.name} run with speed ${this.speed} km/h` );
			};
		};
		let animal = new Fishe(data.name, data.phrase, data.speed);

		return animal;
	}
	if ( data.zone === 'reptile') {
		class Reptile extends Animal {
			constructor(name, phrase, speed) {
				super(data.zone, data.type, data.food);
				this.name = name;
				this.phrase = phrase;
				this.speed = speed;
			};

			run() {
				console.log( `${this.type} ${this.name} run with speed ${this.speed} km/h` );
			};
		};
		let animal = new Reptile(data.name, data.phrase, data.speed);

		return animal;
	}
}

function handleDataOfAnimal() {
	let data = {};
	const speciesContainer = getElement('#species');
	const speciesInputs = speciesContainer.querySelectorAll('input[type=radio]');
	
	const foodContainer = getElement('#food');
	const foodInputs = foodContainer.querySelectorAll('input[type=radio]');
	
	const typeContainer = getElement('#type');
	const typeInput = typeContainer.querySelector('input[type=text]');
	
	const nameContainer = getElement('#name');
	const nameInput = nameContainer.querySelector('input[type=text]');
	
	const phraseContainer = getElement('#phrase');
	const phraseInput = phraseContainer.querySelector('input[type=text]');
	
	const speedContainer = getElement('#speed');
	const speedInput = speedContainer.querySelector('input[type=number]');
	
	speciesInputs.forEach(item => {

		if (item.checked) {
			data.zone = item.dataset.zone;
		}
	});
	
	foodInputs.forEach(item => {
		if (item.checked) {
			data.food = item.dataset.food;
		}
	});
	
	data.type = typeInput.value;
	data.name = nameInput.value;
	data.phrase = phraseInput.value;
	data.speed = speedInput.value;
	
	return data;
}

const closeModalBtn = getElement('.modal__close-btn');
const addBtn = getElement('#add-btn');
const deleteBtn = getElement('#delete-btn');
const infoBtn = getElement('#info-btn');

document.addEventListener('click', (e) => {

	if (e.target === closeModalBtn) {
		toggleDisplay('.modal', '.modal__title', '');
	}

	if(e.target === addBtn) {
		e.preventDefault();
		myAmazingZoo.addAnimal(createAnimal(handleDataOfAnimal()));
		myAmazingZoo.countAnimals('.zoo__zones .zoo__zones-count span');
	}

	if (e.target === deleteBtn) {
		e.preventDefault();
		myAmazingZoo.removeAnimal(handleDataOfAnimal());
		myAmazingZoo.countAnimals('.zoo__zones .zoo__zones-count span');
	}

	if (e.target === infoBtn) {
		e.preventDefault();
		myAmazingZoo.getAnimal(handleDataOfAnimal());
	}
});

const myAmazingZoo = new Zoo('myAmazingZoo', 100);
