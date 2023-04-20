
// Сравнение объектов и массивов по элементно (не по ссылке)
exports.deepCompare = function (obj1, obj2) {
	if (obj1 === obj2) return true;

	if (!isObject(obj1) && !isArray(obj1) ||
		!isObject(obj2) && !isArray(obj2)) return false;

	if (!isSameType(obj1, obj2) &&
		Object.keys(obj1).length !== Object.keys(obj2).length) return false;

	for (let key of Object.keys(obj1)) {
		if (!obj2.hasOwnProperty(key)) return false;

		if (!deepCompare(obj1[key], obj2[key])) return false;
	}

	return true;
};

// глубокое слияние объектов
exports.deepMerge = function (obj1, obj2) {
	if (!isObject(obj1) && !isArray(obj1) || !isSameType(obj1, obj2)) {
		if (isArray(obj2) || isObject(obj2)) {
			return deepCopy(obj2);
		}

		return obj2;
	} else if (isArray(obj1)) {
		return deepMergeArrays(obj1, obj2);
	} else {
		return deepMergeObject(obj1, obj2);
	}
};

exports.throttle = function (func, ms = 50) {
	let locked = false;

	return function () {
		if (locked) return;

		const context = this;
		const args = arguments;
		locked = true;

		setTimeout(() => {
			func.apply(context, args);
			locked = false;
		}, ms)
	}
};

exports.getCoords = function(el) {
    var box = el.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top = box.top + scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return {
        top: top,
        left: left,
        innerTop: box.top,
        innerLeft: box.left
    };
};

exports.toggleOverflowDocument = function (is) {
	if (is) {
		const scrollBarWidth = window.innerWidth - document.body.clientWidth;
		document.body.style.paddingRight = scrollBarWidth + "px";
		document.body.style.overflow = 'hidden';
	} else {
		document.body.style.overflow = '';
		document.body.style.paddingRight = "";
	}
};

exports.isElem = function (selector) {
	try {
		return document.querySelector(selector) ? true : false;
	} catch (error) {
		return selector instanceof Element;
	}
};

exports.trigger = function (elem, options = {}) {
  	elem.dispatchEvent(new CustomEvent(options.eventName, {
		bubbles: true, 
		cancelable: true,
		composed: true,
		detail: options.data
	}));
};

exports.uuidv4 = function () {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
}

exports.declension = function (num, textArray) {
    num = Math.abs(num) % 100;
    const num1 = num % 10;

    if (num > 10 && num < 20) {
        return textArray[2];
    }

    if (num1 > 1 && num1 < 5) {
        return textArray[1];
    }

    if (num1 == 1) {
        return textArray[0];
    }

    return textArray[2];
}

exports.isJson = function (str) {
	try {
		JSON.parse(str)
	} catch (e) {
		return false;
	}
	return true;
};

exports.storage =  function (key, data = null) {
	if (!data) {
	  return JSON.parse(window.localStorage.getItem(key))
	}
	window.localStorage.setItem(key, JSON.stringify(data))
}

function deepCopy(obj) {
	const result = isObject(obj) ? { ...obj } : [...obj];

	for (let key of Object.keys(obj)) {
		if (isObject(result[key]) || isArray(result[key])) {
			result[key] = deepCopy(result[key]);
			continue;
		}
	}

	return result;
};

function deepMergeArrays(arr1, arr2) {
	return deepCopy([...arr1, ...arr2]);
};

function deepMergeObject(obj1, obj2) {
	const result = deepCopy(obj1);

	for (let key of Object.keys(obj2)) {
		if (!result.hasOwnProperty(key)) {
			if (isObject(obj2[key])) {
				result[key] = deepCopy(obj2[key])
				continue;
			}

			if (isArray(obj2[key])) {
				result[key] = deepCopy(obj2[key])
				continue;
			}


			result[key] = obj2[key];
			continue;
		}

		result[key] = methods.deepMerge(result[key], obj2[key]);
	}

	return result;
};

function isArray(obj) {
	return Object.prototype.toString.call(obj) === '[object Array]';
};

function isObject(obj) {
	return Object.prototype.toString.call(obj) === '[object Object]';
};

function isSameType(item1, item2) {
	return Object.prototype.toString.call(item1) === Object.prototype.toString.call(item2);
};