const {
	CHANGE_THEME
} = require('./types');
const { storage } = require('./../utils/utils');

module.exports = function rootReducer(state, action) {
	let changeState = state,
		field,
 		val
	switch (action.type) {
		case CHANGE_THEME:
			changeState = { ...state, themeSite: action.data }
	}

	storage('state', changeState);

	return changeState;
}