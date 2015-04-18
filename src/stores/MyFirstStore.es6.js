'use strict';

const ImmutableStore = require('fluxthis/src/ImmutableStore');
const ACTION_TYPES = require('constants/ActionTypes');
const Immutable = ImmutableStore.Immutable;

export default new ImmutableStore({
	displayName: 'MyFirstStore',
	init () {
		/* Your code here! */
	},
	public: {
		/* Your code here! */
	},
	private: {
		/* Your code here! */
	}
});