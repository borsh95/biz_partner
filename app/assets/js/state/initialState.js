const { storage } = require('./../utils/utils');

const defaultState = {
	themeSite: "light"
}

const normalize = state => ({
  ...state
})

module.exports = storage('state')
  ? normalize(storage('state'))
  : defaultState
