import './menu.scss';

export default function(array, className) {
	var menu = document.createElement('ul');
	menu.className = className;
	var listItems = '';
	array.forEach(function (item) {
		listItems += `<li class="menu__item">
						<a class="menu__link" href="${item.href}">${item.name}</a>
					</li>`;
	});
	menu.innerHTML = listItems;
	return menu;
};