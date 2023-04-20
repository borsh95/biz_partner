const {
	CHANGE_THEME
} = require('./types');

module.exports.changeTheme = function (data) {
	return {
		type: CHANGE_THEME,
		data
	}
}