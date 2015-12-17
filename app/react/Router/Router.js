var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link

var HotelList = require('HotelList');
var HotelView = require('HotelView');

// var HotelView = React.createClass({
	// componentWillMount: function() {
		// console.log("The view should be mounting!");
		// console.log(this.props.params);
	// },
	// render: function(){
		// return (
			// <div>
			// <h1>This is the view of a hotel</h1>	
			// <h1>{this.props.params.hotel_id}</h1>
			// </div>
		// )
	// }
// });

module.exports = ReactDOM.render((
	<Router>
	    <Route path="/" component={HotelList}/>
	  	<Route path="hotel/:hotel_id" component={HotelView}/>
	</Router>
	),
		document.getElementById('hotelSelectApp')
);