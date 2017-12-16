class View {
	constructor() {

	}

	displayMenu(data) {
		if( data !== 0){
			data.forEach((item, index) => {
				const container = document.querySelector('.ingredients');
				container.insertAdjacentHTML(
					'beforeEnd',
					`
						<div>${item.name}</div>
						<ul class="ingredients__list"></ul>
					`
				);

				item.ingredients.forEach(ingredient => {
					let list = document.querySelectorAll('.ingredients__list');
					list[index].insertAdjacentHTML(
						'beforeEnd',
						`<li class="ingredients__item">
							<label class="ingredients__label">
								<input class="ingredients__input" type="checkbox">
								<div class="ingredients__elem"></div>
								<div class="ingredients__text">${ingredient}</div>
							</label>
						</li>`
					);
				});
			});
		}
	}
}

const view = new View;
export default view;