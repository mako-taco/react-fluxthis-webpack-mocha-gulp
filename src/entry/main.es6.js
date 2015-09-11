'use strict';

require('babel-core/polyfill');

let MyFirstComponent = require('components/MyFirstComponent');
let React = require('react');

React.render(React.createElement(MyFirstComponent, {}), document.getElementById('main'));
