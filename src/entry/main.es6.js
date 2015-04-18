'use strict';

require('babel-core/lib/babel/polyfill');

let MyFirstComponent = require('components/MyFirstComponent');
let React = require('react');

React.render(React.createElement(MyFirstComponent, {}), document.getElementById('main'));