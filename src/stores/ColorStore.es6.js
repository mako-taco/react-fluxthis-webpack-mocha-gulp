'use strict';

const ImmutableStore = require('fluxthis/src/ImmutableStore');
const ACTION_TYPES = require('constants/ActionTypes');
const Immutable = ImmutableStore.Immutable;

export default new ImmutableStore({
	displayName: 'ColorStore',
	init () {
		this.colors = Immutable.List(['red','green','blue']);
		this.bindActions(
			ACTION_TYPES.ADD_COLOR, this.addColor,
			ACTION_TYPES.REMOVE_COLOR, this.removeColor
		);
	},
	public: {
		getColors () {
			return this.colors;
		}
	},
	private: {
		addColor (color) {
			this.colors = this.colors.push(color);
		},
		removeColor (color) {
			let index = this.colors.findIndex((myColor) => {
				return myColor === color;
			});

			if (index > -1) {
				this.colors = this.colors.remove(index);
			}
		}
	}
});