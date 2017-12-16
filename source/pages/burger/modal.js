class Modal {
	consturctor(name) {
		this.name = name;
	}

	sendAjax(url) {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
		
			xhr.open('GET', url);
			xhr.addEventListener('load', () => {
				resolve(xhr.responseText);
			});
			xhr.addEventListener('error', () => {
				reject();
			});
			xhr.send();
		});
	}
}

const modal = new Modal;

export default modal;