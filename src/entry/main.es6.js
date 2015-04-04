'use strict';

require('babel-core/lib/babel/polyfill');

let Main = require('components/Main');
let React = require('react');

React.render(React.createElement(Main, {}), document.getElementById('main'));