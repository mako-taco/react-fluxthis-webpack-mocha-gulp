'use strict';

const ColorStore = require('stores/ColorStore');
const React = require('react');
const ColorCSS = require('style/colors.css');

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
            backgroundColor: color
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
