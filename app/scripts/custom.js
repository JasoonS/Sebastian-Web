$(document).ready(function() {
    $('#login-trigger').click(function() {
        $(this).next('#login-content').slideToggle();
        $(this).toggleClass('active');                    
        
        if ($(this).hasClass('active')) $(this).find('span').html('&#x25B2;');
            else $(this).find('span').html('&#x25BC;');
       });
	
	//get the list of hotels
	$('.list-hotels').click(function() {
		getHotelList();
	});
});

function getHotelList() {
	console.log('Called!');

	try {
		$.ajax({
			type : 'post',
			url : "http://test.sebastiannow.com/public_api/Hotel/listall",
			crossDomain : true,
			data: {site: 'api'},
			async : false,
			dataType : 'json',
			processData : false,
			cache : false,
			success : function(data) {
				console.log(data);
				hotellist = data;
				console.log(hotellist);
			}
		}).done(function(hotellist) {
			console.log('hotel list within the done function');
			console.log(hotellist);
			console.log('cool right ;)');
			populateHtmlWithHotels(hotellist);
			return true;
			
			//$('#hotel-list').html(hotellist);
		}).fail(function() {
			alert("You were unsuccessful loging in/n(make this change the site apropriately)");
		});
	} catch (error) {
	}

	function populateHtmlWithHotels(JSONObject) {
		var hotelhtml = '<table>';
	    $.each(JSONObject, function(k,item){
	    	hotelhtml += "<tr><td class='"+item.sb_hotel_id+"'>"+item.sb_hotel_name+"</td></tr>";
	    });
	    hotelhtml += '</table>';
	    $('#hotel-list').html(hotelhtml);
	}
}

// function guest() {
// var fullDate = new Date();
// var twoDigitMonth = ((fullDate.getMonth().length+1) === 1)? (fullDate.getMonth()+1) : '0' + (fullDate.getMonth()+1);
// var currentDate =fullDate.getFullYear()+"-"+ twoDigitMonth + "-" +fullDate.getDate();
// hotel_id1 = <?php echo $this->session->userdata('logged_in_user')->sb_hotel_id?>;
// $.ajax({
// type:'post',
// //contentType: 'application/json; charset=utf-8',
// data: { hotel_id: hotel_id1, currentDate:currentDate },// service_due_date : currentDate},
// url: "http://localhost/sebastian-admin-panel/index.php/admin/Dashboard/currentGuest",
// success: function (data) {
// console.log(data);
// $('#myGuest').empty();
// var appenddata1 = "";
// var obj  = JSON.parse(data);
// if(obj.length > 0)
// {
//
// for(var i = 0; i < obj.length; i++)
// {
// console.log(obj[i].flag);
// if(obj[i].flag == 1)
// {
// appenddata1 += "<li><p>"+obj[i].sb_guest_firstName+" "+obj[i].sb_guest_lastName+" visited</p></li>";
// }
// else
// {
// appenddata1 += "<li><p>"+obj[i].sb_guest_firstName+" "+obj[i].sb_guest_lastName+" <span style='float:right;'> ";
// if(obj[i].room_no != "")
// appenddata1 += " Room No : "+obj[i].room_no+"</span></p></li>";
// else
// {
// var addroomurl= "http://localhost/sebastian-admin-panel/index.php/admin/HotelRooms/Roomcheckin/"+obj[i].sb_hotel_guest_booking_id+"/"+obj[i].sb_guest_rooms_alloted;
// appenddata1 += " <a href='"+addroomurl+"'>Please check for rooms</a></span></p></li>";
// }
// }
// }
// }
// else
// {
// appenddata1 += "<li><p>No new Guest</p></li>";
// }
// $("#myGuest").append(appenddata1);
// }
//
// }).done(function (){
// setTimeout(tasks, 5400);
// });
//
// }
// function tasks() {
// hotel_id1 = <?php echo $this->session->userdata('logged_in_user')->sb_hotel_id?>;
//
// $.ajax({
// type:'post',
// //contentType: 'application/json; charset=utf-8',
// data: { hotel_id: hotel_id1 },// service_due_date : currentDate},
// url: "http://localhost/sebastian-admin-panel/index.php/admin/Dashboard/currentTasks",
// success: function (data) {
// console.log(data);
// $('#myajax').empty();
// var appenddata1 = "";
// var obj  = JSON.parse(data);
// if(obj.length > 0)
// {
// for(var i = 0; i < obj.length; i++)
// {
// var sb_hotel_requst_ser_id = obj[i].sb_hotel_requst_ser_id;
// var sb_guest_allocated_room_no = obj[i].sb_guest_allocated_room_no;
// var service_type = obj[i].service_type;
// if(service_type == 'order')
// {
// var sb_child_servcie_name = obj[i].orderDetails[0].sb_sub_child_service_name;
// }
// else
// {
// var sb_child_servcie_name = obj[i].sb_child_servcie_name;
// }var service_due_date = obj[i].service_due_date;
// var service_due_time = obj[i].service_due_time;
// var datetime = service_due_date+" "+service_due_time;
// var status = obj[i].sb_hotel_service_status;
// var d2 = new Date();
// var d1 = new Date(datetime);
// var seconds =  (d2- d1)/1000;
// //console.log(seconds);
// if(seconds >= 600 && status=="pending")
// {
// appenddata1 += "<li><p class='shakeme' style='color:rgb(245, 98, 98);font-weight: bold;'>";
// }
// else if(status=="accepted")
// {
// appenddata1 += "<li><p style='color:#009118'>";
// }
// else
// {
// appenddata1 += "<li><p style='color:rgb(245, 98, 98);font-weight: bold;'>";
// }
// //appenddata1 += "<option value = '" + obj[i].id + " '>" + obj[i].service_name + " </option>";
// appenddata1 += sb_child_servcie_name+" Request From room : "+sb_guest_allocated_room_no+". ";
// if(status=="accepted")
// {
// appenddata1 += "<p>Accepted by : "+obj[i].accepted_by;
// appenddata1 +="</p></p></li>";
// }
// else
// {
// appenddata1 +="<span style='float:right;'><a onclick='action("+sb_hotel_requst_ser_id+")'><i class='fa fa-binoculars'></i></a></span></p></li>";
// }
// }
// }
// else
// {
// appenddata1 += "<li><p>hooray no pending task</p></li>";
// }
// $("#myajax").append(appenddata1);
// }
//
// }).done(function (){
// setTimeout(tasks, 5400);
// });
// }
//
// function action(sb_hotel_requst_ser_id) {
// var url = "http://localhost/sebastian-admin-panel/index.php/admin/Tasks/task_details/";
// //window.location=url;
//
// method = "post"; // Set method to post by default if not specified.
//
// // The rest of this code assumes you are not using a library.
// // It can be made less wordy if you use one.
// var form = document.createElement("form");
// form.setAttribute("method", method);
// form.setAttribute("action", url);
//
// var hiddenField = document.createElement("input");
// hiddenField.setAttribute("type", "hidden");
// hiddenField.setAttribute("name", 'sb_hotel_requst_ser_id');
// hiddenField.setAttribute("value", sb_hotel_requst_ser_id);
// form.appendChild(hiddenField);
//
// document.body.appendChild(form);
// form.submit();
// }
//
//
