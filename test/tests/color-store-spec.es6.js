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
		ColorStore.getColors().toJS().should.containEql('red');
		
		ColorStore.TestUtils.mockDispatch({
			type: ACTION_TYPES.REMOVE_COLOR,
			payload: 'red'
		});
 
		ColorStore.getColors().toJS().should.not.containEql('red');
	});

	it('should return a list of colors', () => {
		ColorStore.getColors().toJS().should.eql(['red','green','blue']);
	});
});