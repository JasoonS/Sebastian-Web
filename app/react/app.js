var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link
window.jQuery = require('jquery');
window.$ = window.jQuery;

var Router = require('Router');

try {
	Router();
} catch(e) {
	console.log("not on hotel page");
}
