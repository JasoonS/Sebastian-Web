var React = require('react');
var ReactDOM = require('react-dom');

window.jQuery = require('jquery');
window.$ = window.jQuery;

var Hotel = require('Hotel');

module.exports = React.createClass({
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
				url : "http://localhost/sebastian-admin-panel/index.php/api/customer/User/get_hotel_names",
				crossDomain : true,
				data: {site: 'api'},
				async : true,
				dataType : 'json',
				processData : false,
				cache : false,
			}).done(function(hotelList) {
				console.log("the resquest has completed");
				console.log(hotelList);
				self.setState({hotels: hotelList.result})
			}).fail(function() {
				console.log("the request failed!");
				alert("You were unsuccessful loging in/n(make this change the site apropriately)");
			});
		// } catch (error) {
			// console.log("There was some kind of error!");
		// }
    },
    // sendTestRequest: function() {
    	// $.ajax({
				// type : 'post',
				// url : "http://localhost/sebastian-admin-panel/index.php/admin/Dashboard/currentTasks",
				// crossDomain : true,
				// data: {hotel_id: '2'},
				// async : true,
				// dataType : 'json',
				// processData : false,
				// cache : false,
			// }).done(function(currentTasks) {
				// console.log("the resquest has completed");
				// console.log(currentTasks);
			// }).fail(function() {
				// console.log("the LOGED IN request failed!");
				// alert("You were unsuccessful loging in/n(make this change the site apropriately)");
			// });
    // },
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
				<div>
					<h2>Please select a hotel below</h2>
				</div>
				{this.state.hotels.map(this.eachHotel)}
            </div>
		);
	}
});
