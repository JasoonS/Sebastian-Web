var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link
window.jQuery = require('jquery');
window.$ = window.jQuery;

// //may be useful later when the code is a bit bigger.
// var buildUrl = function(base, key, value) {
    // var sep = (base.indexOf('?') > -1) ? '&' : '?';
    // return base + sep + key + '=' + value;
// }
var MenuItem = React.createClass({
	getInitialState: function() {
        return {
            subMenuItems: [],
            isSubMenuOpen: false
        };
    },
	componentWillMount: function() {
		console.log("component will mount");
		//
	},
	componentDidMount: function() {
		console.log("The view should be mounted!");
		console.log(this.props.params);
		var self = this;
		var dataString = "sb_hotel_id=" + this.props.hotel_id +"&sb_parent_service_id=" + this.props.parent_service_id;
    	console.log("just before the request!!");
        // try {
			$.ajax({
				type : 'post',
				url : "http://localhost/sebastian-admin-panel/index.php/api/customer/Hotel_service/get_submenu",
				crossDomain : true,
				data: dataString,
				async : true,
				dataType : 'json',
				processData : false,
				cache : false,
			}).done(function(hotelSubMenu) {
				console.log("SUB menu!! from" + dataString);
				console.log(hotelSubMenu);
				self.setState({subMenuItems: hotelSubMenu.result})
			}).fail(function() {
				console.log("the request failed!");
				alert("You were unsuccessful loging in/n(make this change the site apropriately)");
			});
		// } catch (error) {
			// console.log("There was some kind of error!");
		// }
		// console.log("(my did mount function)");
	    // $.get("https://api.github.com/users/octocat/gists", function(result) {
	      // console.log("(my did mount function) inside the get")
	      // var lastGist = result[0];
	      // if (this.isMounted()) {
	        // console.log("(my did mount function) set was reset in my did mount!!!!" + lastGist.owner.login);
	      // }
	    // }.bind(this));
	  },
	handleClick: function(e) {
	    e.stopPropagation();
	    console.log("button click", this.state.isSubMenuOpen);
	    this.setState({isSubMenuOpen: !this.state.isSubMenuOpen});
    },
	eachSubMenuItem: function(subMenuItem, i) {
		console.log("this is going to run for each menuItem");
		console.log(subMenuItem);
		console.log(subMenuItem.sb_child_servcie_id);
		var imageSource = "https://unsplash.it/20/?random&" + i;
        var imageStyle = {
			float: "left"
		};
        return (
        	<p key={i}><img src={imageSource} style={imageStyle} align="middle"/>{subMenuItem.sb_child_servcie_name}</p>
            );
    },
    render: function() {
    	console.log("render was called");
		var imageSource = "https://unsplash.it/40/?random&" + this.props.parent_service_id;
		var imageStyle = {
			float: "left"
		};
		var subMenuDisplay = {
			display: this.state.isSubMenuOpen ? 'block' : 'none'
		};
		var linkStyle = {
			
		};
		return (
			<div onClick={this.handleClick} style={this.props.style}>
	        	<h2><img src={imageSource} style={imageStyle} align="middle"/>{this.props.children}</h2>
	        	<div style={subMenuDisplay}>{this.state.subMenuItems.map(this.eachSubMenuItem)}</div>
	        </div>
		);
	}
});

module.exports = React.createClass({
	getInitialState: function() {
        return {
            menuItems: [],
            hotelName: "Default"
        };
    },
	componentWillMount: function() {
		var self = this;
		var dataString = "sb_hotel_id=" + this.props.params.hotel_id;
    	console.log("just before the request!!");
        // try {
			$.ajax({
				type : 'post',
				url : "http://localhost/sebastian-admin-panel/index.php/api/customer/Hotelmenu/gethotelmenu",
				crossDomain : true,
				data: dataString,
				async : true,
				dataType : 'json',
				processData : false,
				cache : false,
			}).done(function(hotelMenu) {
				console.log("menu!!");
				console.log(hotelMenu);
				self.setState({menuItems: hotelMenu.services})
			}).fail(function() {
				console.log("the request failed!");
				alert("You were unsuccessful loging in/n(make this change the site apropriately)");
			});
			
			$.ajax({
				type : 'post',
				url : "http://localhost/sebastian-admin-panel/index.php/api/customer/User/get_hotel_name_from_id",
				crossDomain : true,
				data: dataString,
				async : true,
				dataType : 'json',
				processData : false,
				cache : false,
			}).done(function(hotel) {
				console.log("menu!!");
				console.log(hotel);
				console.log("We have a hotel name!!" + hotel.sb_hotel_name);
				self.setState({hotelName: hotel.sb_hotel_name})
			}).fail(function() {
				console.log("the request failed!");
				alert("You were unsuccessful loging in/n(make this change the site apropriately)");
			});
		// } catch (error) {
			// console.log("There was some kind of error!");
		// }
	},
	eachMenuItem: function(menuItem, i) {
		console.log("this is going to run for each menuItem");
		var menuStyle = {
		  bgcolor: menuItem.sb_parent_service_color
		};
        return (
        	<MenuItem
		        	hotel_id={this.props.params.hotel_id}
		        	image={menuItem.sb_parent_service_image}
		        	style={menuStyle}
		        	parent_service_id={menuItem.sb_parent_service_id}
		        	key={menuItem.sb_parent_service_id}>
                <div>{menuItem.sb_parent_service_name}</div>
            </MenuItem>
            );
    },
	render: function(){
		// var menuStyle = {
			// display=
		// };
		return (
			<div>
				<h1>{this.state.hotelName}</h1>
				<div>
					{this.state.menuItems.map(this.eachMenuItem)}
				</div>
			</div>
		)
	}
});