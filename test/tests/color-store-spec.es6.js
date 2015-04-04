let ColorStore = require('stores/ColorStore');
let ACTION_TYPES = require('constants/ActionTypes');

describe('color store', () => {

	beforeEach(() => {
		ColorStore.TestUtils.reset();
	});

	it('should add colors', () => {
		ColorStore.TestUtils.mockDispatch({
			type: ACTION_TYPES.ADD_COLOR,
			payload: 'cyan'
		});
 
		ColorStore.getColors().toJS().should.containEql('cyan');
	});

	it('should remove colors', () => {

	});

	it('should return a list of colors', () => {

	})
});