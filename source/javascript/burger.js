var eventObj = {
	addEvent: function (el, type, func) {
		if (typeof addEventListener !== 'undefined'){
			el.addEventListener(type, func, false);
		} else if (typeof attachEvent !== 'undefined'){
			el.attachEvent('on' + type, func);
		} else {
			el['on' + type] = func;
		}
	},

	removeEvent: function (el, type, func) {
		if (typeof removeEventListener !== 'undefined'){
			el.removeEventListener(type, func, false);
		} else if (typeof detachEvent !== 'undefined'){
			el.detachEvent('on' + type, func);
		} else {
			el['on' + type] = null;
		}
	},

	getTarget: function (event) {
		if (typeof event.target !== 'undefined'){
			return event.target;
		} else {
			return event.srcElement;
		}
	},

	preventDefault: function (event) {
		if (typeof event.preventDefault !== 'undefined'){
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	}
};

(function () {
	var buttons = document.getElementsByTagName('button');

	var changeColor = function (e) {
		eventObj.preventDefault(e);

		var elem = eventObj.getTarget(e);

		if (elem.id === 'day'){
			document.body.className = 'day';
		} else if (elem.id === 'night'){
			document.body.className = 'night';
		}
	};

	for (var i = 0, len = buttons.length; i < len; i++){
		eventObj.addEvent(buttons[i], 'click', changeColor);
	};

})();