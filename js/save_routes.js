$(document).ready(function() {

	// Для листалка дней растовляем номер

	var relDaylength;
	relDaylength = $('.routes_date_corusel li').length;
	console.log(relDaylength);
	var i = 0;
	for (i; i < relDaylength; i++) {
		$('.routes_date_corusel li').eq(i).find('a').attr('rel', i);
	};
	$('.routes_date_corusel li:first').find('a').addClass('active');



	// Листалка дней
	if ($('.routes_date_corusel').length){
		$('.routes_date_corusel').carouFredSel({
			width: 915,
			height: 52, 
			prev: '.routes_date_l a',
			next: '.routes_date_r a',
			auto: false 
		});  
	};

	$('.save_route_tab .save_route_tab_item:not(:first)').css({ 'left' : 100 + '%'});
	$('.save_route_tab .save_route_tab_item:first').addClass('active')

	$('.routes_date_corusel a').click(function(){
		if (!$(this).hasClass('active')) {
			var tabDayNamber = $(this).attr('rel');
			$('.save_route_tab .save_route_tab_item.active').animate({ 'left' : -100 + '%'});
			$('.save_route_tab .save_route_tab_item.active').addClass('active_left');
			$('.save_route_tab .save_route_tab_item.active').removeClass('active');
			$('.save_route_tab .save_route_tab_item').eq(tabDayNamber).addClass('active');
			$('.save_route_tab .save_route_tab_item').eq(tabDayNamber).animate({ 'left' : 0 + '%'});
			setTimeout("$('.save_route_tab .save_route_tab_item.active_left').css({ 'left' : 100 + '%'})", 500);
			setTimeout("$('.save_route_tab .save_route_tab_item.active_left').removeClass('active_left')", 500);
		};
		$('.routes_date_corusel a').removeClass('active');
		$(this).addClass('active');
		return false;
	});


	$('.rout_user_box_but3').click(function(){
		$(this)
	});



});



$(window).scroll(function() {

	if ($(window).scrollTop() > 675) {
		$('.routes_date').addClass('active');
	} else {
		$('.routes_date').removeClass('active');
	};
	
	console.log($(window).scrollTop());

});
