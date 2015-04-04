'use strict';

const ActionCreator = require('fluxthis/src/ActionCreator');
const ACTION_SOURCES = require('constants/ActionSources');
const ACTION_TYPES = require('constants/ActionTypes');

export default new ActionCreator({
	displayName: 'ColorActions',
	actionSource: ACTION_SOURCES.COLOR_UI,
	addColor: {
		actionType: ACTION_TYPES.ADD_COLOR,
		payloadType: ActionCreator.PayloadTypes.string.isRequired
	},
	removeColor: {
		actionType: ACTION_TYPES.REMOVE_COLOR,
		payloadType: ActionCreator.PayloadTypes.string.isRequired
	}
});