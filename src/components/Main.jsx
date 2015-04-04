'use strict';

const ColorStore = require('stores/ColorStore');
const React = require('react');

export default React.createClass({
    displayName: 'Main',
    mixins: [ColorStore.mixin],
    getStateFromStores() {
        return {
            colors: ColorStore.getColors()
        };
    },
    renderColors(color) {
        let style = {
            backgroundColor: color,
            height: '100px',
            width: '100px',
            display: 'inline',
            padding: '5px',
            borderRadius: '3px'
        };

        return <div style={style} className='color'/>
    },
    render() {
        return (
            <div>
                {'Colors'}
                <div>
                    {this.state.colors.map(this.renderColors)}
                </div>
            </div>
        );
    }
});
