'use strict';

const MyFirstStore = require('stores/MyFirstStore');
const MyFirstActionCreator = require('actions/MyFirstActionCreator');
const React = require('react');

export default React.createClass({
    mixins: [MyFirstStore.mixin],
    getStateFromStores() {
        /* Your code here! */
    },
    render() {
        /* Your code here! */
    }
});
