import offScroll from './scroll-off';

export default function(modalSelector, textSelector, str) {
	let elem = document.querySelector(modalSelector);
	let text = document.querySelector(textSelector);

	if (elem.style.display === 'block') {
		elem.style.display = 'none';
		text.innerText = '';
		window.removeEventListener('scroll', offScroll);
	} else {
		text.innerText = str;
		elem.style.display = 'block';
		window.addEventListener('scroll', offScroll);
	}
};