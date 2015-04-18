let MyFirstStore = require('stores/MyFirstStore');
let ACTION_TYPES = require('constants/ActionTypes');

describe('My first store', () => {

	beforeEach(() => {
		/* Resets the state of your store, along with any mocked methods */
		MyFirstStore.TestUtils.reset();
	});

	it('should do something', () => {
		/* Your code here! */
	});
});