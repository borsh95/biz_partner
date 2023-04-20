module.exports = class createStore {
	constructor(rootReducer, initialState = {}) {
		this.rootReducer = rootReducer;
		this.state = rootReducer({ ...initialState }, { type: '__INIT__' })
		this.listeners = new Set();
	}
	
	subscribe(fn) {
		this.listeners.add(fn);

		return {
			unsubscribe() {
				this.listener.delete(fn);
			}
		}
	}

	dispatch(action) {
		this.state = this.rootReducer(this.state, action);
		
		for (const listener of this.listeners) {
			try {
				listener(this.state);
			} catch (error) {
				console.log(error);
			}
		}
	}

	getState() {
		return JSON.parse(JSON.stringify(this.state))
	}
}