var React = require('react');
var ReactDOM = require('react-dom');
// var Router = require('react-router').Router
// var Route = require('react-router').Route
var Link = require('react-router').Link
// window.jQuery = require('jquery');
// window.$ = window.jQuery;

module.exports = React.createClass({
	// getDefailtProps:
	// changePage: 
	render: function() {
		console.log("these are the props:");
		console.log(this.props);
		var link = "/hotel/" + this.props.hotel_id;
        return (
        	<div>
	        	<Link to={link}>{this.props.children}</Link>
	        </div>
        );
    }
});