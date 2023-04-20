const { throttle } = require('./../utils/utils.js');
const watchedComponents = {
	'table': {
		params: ['bg']
	}
}

const compareStates = function() {
	Object.entries(watchedComponents).forEach(([className, { params, stash }]) => {
		watchedComponents[className].stash = stash || new Map();
		stash = watchedComponents[className].stash;

		for (const elem of document.querySelectorAll(`.${className}`)) {
			const stashElem = stash.get(elem) || {};
			stashElem.state  = stashElem.state || {};
			stashElem.stateDom = stashElem.stateDom || {};

			params.forEach(param => {
				let valueParam = getComputedStyle(elem).getPropertyValue(`--${param}`);
		
				if (valueParam && typeof valueParam === 'string') {
					valueParam = valueParam.trim();
				}

				stashElem.state[param] = valueParam ? valueParam : null;
			});
			
			Object.keys(stashElem.state).forEach(param => {
				const valueParam = stashElem.state[param];
			
				elem.classList.remove(`${className}--${param}_${stashElem.stateDom[param]}`);
				elem.classList.toggle(`${className}--${param}_${valueParam}`, valueParam);
			});

			stashElem.stateDom = {...stashElem.state};
			stash.set(elem, stashElem);
		}
	});
}

if (Object.keys(watchedComponents).length) {
	compareStates(watchedComponents);
	window.addEventListener('resize', throttle(compareStates.bind(this, watchedComponents), 150));
}



	