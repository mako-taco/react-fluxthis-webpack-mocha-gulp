'use strict';

const ColorStore = require('stores/ColorStore');
const ColorActions = require('actions/ColorActions');
const React = require('react');
const ColorCSS = require('style/colors.css');

export default React.createClass({
    displayName: 'Main',
    mixins: [ColorStore.mixin],
    getInitialState() {
        return {
            add: 'yellow'
        };
    },
    getStateFromStores() {
        return {
            colors: ColorStore.getColors()
        };
    },
    handleColorInputChange(evt) {
        this.setState({add: evt.target.value});
    },
    handleAddClick() {
        ColorActions.addColor(this.state.add);
        this.setState({add: ''});
    },
    renderColors(color) {
        let style = {
            backgroundColor: color
        };

        return <div style={style} className='color'/>;
    },
    renderAddButton() {
        return (
            <div>
                <input value={this.state.add} 
                    onChange={this.handleColorInputChange}/>
                <button onClick={this.handleAddClick}>Add</button>
            </div>
        )
    },
    render() {
        return (
            <div>
                {'Colors'}
                <div>
                    {this.state.colors.map(this.renderColors)}
                </div>
                {this.renderAddButton()}
            </div>
        );
    }
});
