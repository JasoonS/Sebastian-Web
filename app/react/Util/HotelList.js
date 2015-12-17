var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link
window.jQuery = require('jquery');
window.$ = window.jQuery;

var Hotel = React.createClass({
	// getDefailtProps:
	// changePage: 
	render: function() {
		console.log("these are the props:");
		console.log(this.props);
		var link = "/hotel/" + this.props.hotel_id;
        return (
        	<div>
	        	<p>Clich the hotel</p>
	        	<Link to={link}>{this.props.children}</Link>
	        </div>
        );
    }
});

//may be useful later when the code is a bit bigger.
var buildUrl = function(base, key, value) {
    var sep = (base.indexOf('?') > -1) ? '&' : '?';
    return base + sep + key + '=' + value;
}

var HotelList = React.createClass({
	getInitialState: function() {
        return {
            hotels: []
        };
    },
    componentWillMount: function() {
    	var self = this;
    	console.log("just before the request!!");
        // try {
			$.ajax({
				type : 'post',
				url : "http://localhost/sebastian-admin-panel/index.php/public_api/Hotel/get_hotel_names",
				crossDomain : true,
				data: {site: 'api'},
				async : false,
				dataType : 'json',
				processData : false,
				cache : false,
			}).done(function(hotelList) {
				console.log("the resquest has completed");
				console.log(hotelList);
				self.setState({hotels: hotelList})
			}).fail(function() {
				console.log("the request failed!");
				alert("You were unsuccessful loging in/n(make this change the site apropriately)");
			});
		// } catch (error) {
			// console.log("There was some kind of error!");
		// }
    },
	eachHotel: function(hotel, i) {
		console.log("this is going to run for each hotel");
        return (
                <Hotel key={hotel.sb_hotel_id}
                hotel_id={hotel.sb_hotel_id}
                >{hotel.sb_hotel_name}</Hotel>
            );
    },
	render: function() {
		console.log("this is a test console.log, you should see me :)");
		return (
			<div>
				{this.state.hotels.map(this.eachHotel)}
            </div>
		);
	}
});

var HotelView = React.createClass({
	componentWillMount: function() {
		console.log("The view should be mounting!");
		console.log(this.props.params);
	},
	render: function(){
		return (
			<div>
			<h1>This is the view of a hotel</h1>	
			<h1>{this.props.params.hotel_id}</h1>
			</div>
		)
	}
});

ReactDOM.render((
	<Router>
	    <Route path="/" component={HotelList}/>
	  	<Route path="hotel/:hotel_id" component={HotelView}/>
	</Router>
	),
		document.getElementById('hotelSelectApp')
	);