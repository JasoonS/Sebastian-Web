'use strict';

enquire.register("screen and (min-width:481px)", function() {

	$(document).ready(function () {

		$('.carousel-nav > a:nth-child(1) div').addClass('bg-muted-light');
		$('#carousel').carousel({
			interval: 4000
		});

		$('.carousel-nav > a').on('click', function (event) {
			event.preventDefault();
			$('.carousel-nav > a div').removeClass('bg-muted-light');
			$(this).find('div').addClass('bg-muted-light');
		});

		$('#carousel').on('slid.bs.carousel', function () {
			var index = $(this).find('.active').index('.carousel-inner .item');
			index++;
			$('.carousel-nav > a div').removeClass('bg-muted-light');
			$('.carousel-nav > a:nth-child(' + index + ') div').addClass('bg-muted-light');
		});
	});

});

$(document).ready(function () {

	$('.btn-tabs').on('click', '.btn', function(event) {
		event.preventDefault();

		$('.btn-tabs').find('.btn').removeClass('active');
		$(this).toggleClass('active');
	});
});

//# sourceMappingURL=main.js.map