var slideTime = 10000, effectTime = 1000, innerDelay = 1000, sliderTimeout;
$(document).ready(function() {

	// Спросить совета
	$('.wrap-sn-friends .sn-friend-cont:first').show();

	// Меню информационное на главной
	$('.main_page-info-open a').click(function(){
		$('.main_page-info-open').fadeOut();
		$('.main_page-info').fadeIn();
		return false;
	});

	$('.info-in-item').hover(function(){
		$(this).find('.info-in-item-img').hide();
		$(this).find('.info-in-hover').fadeIn();
	},
	function(){
		$(this).find('.info-in-item-img').fadeIn();
		$(this).find('.info-in-hover').hide();
	});



	// слайдер на главной
	$('#hotel_main_slider .hotel_main:eq(0)').addClass('active').siblings().fadeTo(0, 0);
	$('.jsInner').fadeTo(0, 0);
	$('.jsInner').eq(0).fadeTo(0, 1);
	sliderTimeout = setTimeout(runSlider, slideTime);
	
	$('.routes_main_menu a').click(function() {
		clearTimeout(sliderTimeout);
		var nextIndex = $('.routes_main_menu a').index($(this));
		slideTo(nextIndex, true);
		return false;
	});

	$(".js_cart_form_help img").click(function(){
		loadPopup('.cart_form_help_popup');
		return false;
	});
	
	//вспомогательное для попапа
	$(".popup .close").click(function(e){
		e.preventDefault();
		disablePopup();
	});
	
	$(".popup_bg").click(function(){
		disablePopup();
	});
	
	$(document).keypress(function(e){
		if(e.keyCode==27 && popupStatus==1){
			disablePopup();
		}
	});   
	$('textarea').focus(function() {
		if (this.value == this.defaultValue){
			this.value = '';
		}
		if(this.value != this.defaultValue){
			this.select();
		}
	});
	$('textarea').blur(function() {
		if ($.trim(this.value) == ''){
			this.value = (this.defaultValue ? this.defaultValue : '');
		}
	});
	mapInitClusters();
	// слайдер цены
	if ($('#slider-range-price').length) {
		$( "#slider-range-price" ).slider({
			  range: true,
			  min: 0,
			  max: 1000,
			  values: [ 230, 680 ],
			  slide: function( event, ui ) {
				  $( "#slider-price_namber_l" ).text( ui.values[ 0 ] + '$');
				  $( "#slider-price_namber_r" ).text( ui.values[ 1 ] + '$');
				  $( ".price_namber_l_inp" ).val( ui.values[ 0 ]);
				  $( ".price_namber_r_inp" ).val( ui.values[ 1 ]);
			  }
			});
		$( "#slider-price_namber_l" ).text( $( "#slider-range-price" ).slider( "values", 0 ) + '$' );
		$( "#slider-price_namber_r" ).text( $( "#slider-range-price" ).slider( "values", 1 ) + '$' );
		$( ".price_namber_l_inp" ).val( $( "#slider-range-price" ).slider( "values", 0 ) );
		$( ".price_namber_r_inp" ).val( $( "#slider-range-price" ).slider( "values", 1 ) );
	};
	
	// рейтинг звезд 
	$('.js_range').on('click', function(){ 
		var cr = $(this).parent().find('.js_range').length; 
		if ($(this).hasClass('active')){ 
			var st = $(this).siblings().slice($(this).index(),cr-1);
			st.add(this).each(function(index){
				$(this).removeClass('active');
			});
			$(this).removeClass('active'); 
		}
		else {
			$(this).addClass('active');
			var stN = $(this).siblings().slice(0, $(this).index());
			stN.add(this).each(function(index){
				$(this).addClass('active');
			});
		}  
		var stNam = $(this).parent().find('.js_range.active').length;
		$(this).parent().find('.js_range_namber').val(stNam);
    }); 
	/*$('.js_range').hover(
		function () {
			var cr = $(this).parent().find('.js_range').length; 
			$(this).addClass('hov');
			var st = $(this).siblings().slice(0, $(this).index());
			st.add(this).each(function(index){
				$(this).addClass('hov');
			}); 
			var stN = $(this).siblings().slice($(this).index(),cr-1); 
			stN.add(this).each(function(index){
				$(this).removeClass('active');
			}); 
		},
		function () {
			$(this).siblings().removeClass('hov');  
			$(this).removeClass('hov'); 
		}
	); */
	$('.sbOptions li').click(function() {
		alert('7');
		
	});
	
	$('.guests-adults .js_range').click(function() {
		var selectResult_2 = $('.guests-adults .js_range').index($(this));
		var selectResult_2_text = ['1 взрослый', '2 взрослых', '3 взрослых', '4 взрослых', '5 взрослых', 'более 6 взрослых'];
		$('.select_result_2').text(selectResult_2_text[selectResult_2]);
		var selectResult_1 = $('.sbSelector').text();
		var selectResult_1_text = ['', '1 комната', '2 комнаты', '3 комнаты', '4 комнаты', '5 комнат', 'более 6 комнат'];
		$('.select_result_1').text(selectResult_1_text[selectResult_1])
	})
	
	
	 
	// слайдер оценки
	if ($('#slider-range-evaluation').length) {
		$( "#slider-range-evaluation" ).slider({
			  range: "min",
			  value:2.5,
			  min: 0,
			  max: 5,
			  step: 0.5,
			  slide: function( event, ui ) {
				  $( "#slider-evaluation_namber" ).text( ui.value );
				  $( ".slider-evaluation_namber-namb" ).text( ui.value );
			  }
		  });
		  $( "#slider-evaluation_namber" ).text($( "#slider-range-evaluation" ).slider( "value" ) );
		  $( ".slider-evaluation_namber-namb" ).text($( "#slider-range-evaluation" ).slider( "value" ) );
	};
	  
	
	// радио переключатели и чекбоксы
	$('.radio').on('click', function(){
		$(this).addClass('radioOn').parents('.r-type').siblings().find('.radio').removeClass('radioOn');
	});
	$('.check').on('click', function(){
		var checkbox = $('input', $(this));
		$(this).toggleClass('checkOn');
		checkbox.attr('checked', !checkbox.attr('checked'));
	});
	// hover быстрый просмотр отеля
	$('.h-image').hover(
		function () {
			$(this).find('.h-preview').animate({bottom: "0px"}, 300);
		},
		function () {
			$(this).find('.h-preview').animate({bottom: "-44px"}, 300);
		}
	);
	// hover просмотр информации о рейтинге отеля
	$('.point-rate').hover(
		function () {  
			$(this).parents('.h-item').find('.rating_info_popup').stop().fadeIn();
		},
		function () {
			$(this).parents('.h-item').find('.rating_info_popup').fadeOut();
		}
	);
	// количество человек
	$('.js_link_guests').on('click', function(e){ 
		e.preventDefault();
		$(this).next().fadeToggle(); 
	});  
	$('.js_link_guests_popup').click(function(){ 
		$('.more_guests_popup').css({top : $(this).offset().top - 6, left : $(this).offset().left - 80});
		$('.more_guests_popup').fadeIn();
		return false;
	});
	
	
	 

	$('.h-item:nth-child(3n)').addClass('third').find('.rating_info_popup').addClass('item-third');
	$('.list_carousel img:nth-child(3n)').addClass('third');
	$('.list_carousel img:nth-child(4n)').addClass('fourth'); 
	
	// функции вызова и обработки попапа "подробно об отеле"
	$(".h-item").click(function(){ 
		loadPopup('.popup_detels_hotel');
		// слайдер в попапе "подробно об отеле" 
		$('.list_carousel img:nth-child(3n)').addClass('third');
		$('.list_carousel img:nth-child(4n)').addClass('fourth');
			 
		if($('#h-carousel').length){
			$('#h-carousel').carouFredSel({
				width: 765,
				height: 375,
				prev: '#prev',
				next: '#next', 
				auto: false
			}); 
		} 
		
		if($('#d-carousel-route ').length){
			$('#d-carousel-route ').carouFredSel({
				width: 765,
				height: 375,
				prev: '#prev',
				next: '#next', 
				pagination: "#pager",
				auto: false
			}); 
		}
		
	 	mapPreviewInit(); 
		return false;
	}); 



	// Попап маршруты
	$(".js_r_preview").click(function(){ 
		loadPopup('.rout_user_pupup');
		
	 	mapPreviewInitRoute(); 

	 	r_u_day_corusel();
	 	$('.rout_user_scroll').jScrollPane({
	 		autoReinitialise : true,
			autoReinitialiseDelay : 100
	 	});

	 	var langeBookmark = $('.rout_user_pupup').find('.js_share_map_but').length;
	 	var WidthBookmark;
	 	if (langeBookmark > 3) {
	 		$('.share_map_list_popup:visible').css({ 'left' : 0})
	 	} else {
	 		$('.share_map_list_popup:visible').css({ 'left' : 494 + 'px'})
	 	};
	 	if (langeBookmark > 6) {
	 		WidthBookmark = 990 / langeBookmark - 80;
	 		$('.share_map_list_popup:visible').find('.share_map_header').css({ 'width' : WidthBookmark + 'px'});
	 	}
		return false;
	}); 

	$('.js_corner_4').on('click', function(e){
		e.preventDefault();
		$('.wrap-photo').fadeToggle(100);
		$('.wrap-map').fadeToggle(100);
		// слайдер для детального просмотра
		if($('#carousel_route').length){
			$('#carousel_route').carouFredSel({
				width: 765,
				height: 375,
				prev: '#prev',
				next: '#next', 
				auto: false
			}); 
		} 
		
		if($('#carousel_route').length){
			$('#carousel_route').carouFredSel({
				width: 765,
				height: 375,
				prev: '#prev',
				next: '#next', 
				pagination: "#pager",
				auto: false
			}); 
		}
	 	mapPreviewInitRoute(); 
	});

	var baseWidth, unit2, unit3, timerStore;
	if ($('.route_day_list_scroll').length) {
		$('.route_day_list_scroll').jScrollPane();
		
		baseWidth = parseInt($('.route_day').width());
	}
	$('.route_day').hover(function() {
		clearTimeout(timerStore);
		var self = $(this);
		timerStore = setTimeout(function() {
			var curIndex = $('.route_day').index(self);
			if (curIndex % 3 == 0) {
				unit2 = curIndex + 1;
				unit3 = curIndex + 2;
			} else if (curIndex % 3 == 1) {
				unit2 = curIndex + 1;
				unit3 = curIndex - 1;
			} else {
				unit2 = curIndex - 1;
				unit3 = curIndex - 2;
			}
			self.add(self.find('.jspPane, .jspContainer, .jspScrollable')).stop(true, false).animate({width: baseWidth * 1.5}, 500, 'linear');
			$('.route_day').eq(unit2).add($('.route_day').eq(unit2).find('.jspPane, .jspContainer, .jspScrollable')).stop(true, false).animate({width: baseWidth * 0.75}, 500, 'linear');
			$('.route_day').eq(unit3).add($('.route_day').eq(unit3).find('.jspPane, .jspContainer, .jspScrollable')).stop(true, false).animate({width: baseWidth * 0.75}, 500, 'linear');
			self.find('.jspTrack').stop(true, false).animate({opacity: 1}, 500, 'linear');
		}, 2000);
	}, function() {
		clearTimeout(timerStore);
		$('.route_day').add($('.route_day').find('.jspPane, .jspContainer, .jspScrollable')).animate({width: baseWidth}, 500, 'linear');
		$(this).find('.jspTrack').animate({opacity : 0}, 500, 'linear');
	});

	$('.multiway').click(function() {
		$('.map_search_add').slideDown();
		$('div.calendar').hide();
	});


	$(".js_r_preview_NEW").click(function(){ 
		loadPopup('.rout_user_pupup_new');
		
	 	mapPreviewInitRoute2(); 

	 	r_u_day_corusel();
	 	$('.rout_user_scroll').jScrollPane({
	 		autoReinitialise : true,
			autoReinitialiseDelay : 100
	 	});
		return false;
	}); 
	

   // 3110
   $('.route_day_content .route_day:nth-child(3n)').css({marginRight : 0});
	

	$('.select_all_a').click(function() {
		$(this).parents('.route_day').find('.route_day_box').addClass('active');
		$(this).parents('.route_day').find('.check').addClass('checkOn');
		$(this).parents('.route_day').find('.check input').attr("checked",true);
		$(this).hide();
		$(this).parents('.select_all_route_day').find('.select_all_close').show();
		$(this).parents('.route_day').find('.select_all_a').hide();
		$(this).parents('.route_day').find('.route_day_head_button').addClass('active');
		namberActiveSelect($(this));
  		return false;
	});
	$('.select_all_close').click(function() {
		$(this).parents('.route_day').find('.route_day_box').removeClass('active');
		$(this).parents('.route_day').find('.check').removeClass('checkOn');
		$(this).parents('.route_day').find('.check input').attr("checked",false);
		$(this).hide();
		$(this).parents('.select_all_route_day').find('.select_all_close').hide();
		$(this).parents('.route_day').find('.select_all_a').show();
		$(this).parents('.route_day').find('.route_day_head_button').removeClass('active');
		namberActiveSelect($(this));
  		return false;
	});


	$('.route_day_box .check').click(function(){
		namberActiveSelect($(this));
		$(this).parents('.route_day_box').toggleClass('active');
	});

	$('.route_day_head_button').click(function() {
		if (!$(this).hasClass('active')) {
			$(this).addClass('active');
			$(this).parents('.route_day').find('.route_day_box').addClass('active');
			$(this).parents('.route_day').find('.check').addClass('checkOn');
			$(this).parents('.route_day').find('.check input').attr("checked",true);
			$(this).parents('.route_day').find('.select_all_close').show();
			$(this).parents('.route_day').find('.select_all_a').hide();

		} else {
			$(this).parents('.route_day').find('.route_day_box').removeClass('active');
			$(this).parents('.route_day').find('.check').removeClass('checkOn');
			$(this).parents('.route_day').find('.check input').attr("checked",false);
			$(this).removeClass('active');
			$(this).parents('.route_day').find('.select_all_close').hide();
			$(this).parents('.route_day').find('.select_all_a').show();
		};
		namberActiveSelect($(this));
  		return false;
	});

	$('.route_in_day_city_open').hover(function() {
		$('.route_in_day_city_popup').fadeIn();
	}, function() {
		$('.route_in_day_city_popup').fadeOut();
	});

	//Делаем лайк
	$('.route_in_user_like a').click(function() {
		$('.route_in_user_like').toggleClass('active');
		return false;
	});

	//количество лайков
	$('.route_in_user_reiting a').click(function() {
		var userReiting = $(this).next('span').text();
		$(this).toggleClass('active');
		if(!$(this).hasClass('active')) {
			userReiting = --userReiting;
		} else {
			userReiting = ++userReiting;
		};
		$(this).next('span').text(userReiting);
		return false;
	});

	// Спросить пользователя
	$('.ask-btn, .ask-btn_close').click(function(){
		$(this).parents('.sn-friend-item').toggleClass('active');
		return false;
	});


	// попап при наведении
	$('.result_plane_ico img').hover(function(){
		$(this).next('.result_plane_ico_help').fadeIn();
	}, function() {
		$(this).next('.result_plane_ico_help').fadeOut();
	});

	// черезполосица

	$('.route_day_box:nth-child(2n)').addClass('route_day_box_bg');
	
	/* детальная страница отеля*/  
	// смена позиции карта/фотографии
	if($('#d-carousel').length){
		$('#d-carousel').carouFredSel({
			width: 990,
			height: 506, 
			prev: '#prev',
			next: '#next',  
			pagination: "#pager",
			auto: false 
		});  
	} ;
	
	var coruselItem = $('.total').parents('.d-photomap').find('.pager a').length;
	$('.total').text(coruselItem);
	
	$('.next, .prev').click(function() {
		var coruselItemAct = $('.pager').find('a.selected').index() + 1;
		$('.current').text(coruselItemAct);
	});
	
	
	
	$('.js_corner').on('click', function(e){
		e.preventDefault();
		$('.wrap-photo').fadeToggle(100);
		$('.wrap-map').fadeToggle(100);
		// слайдер для детального просмотра
		if($('#d-carousel').length){
			$('#d-carousel').carouFredSel({
				width: 990,
				height: 506, 
				prev: '#prev',
				next: '#next',  
				pagination: "#pager",
				auto: false 
			});  
		} 
		// слайдер для детального просмотра на страницу маршрутов
		if($('#d-carousel-route').length){
			$('#d-carousel-route').carouFredSel({
				prev: '#prev',
				next: '#next',
				pagination: "#pager",  
				auto: false 
			}); 
		}
	 	mapPreviewInit(); 
	});
	
	$('.js_corner_1').on('click', function(e){
		e.preventDefault();
		$('.wrap-photo').fadeIn(100);
		$('.js_corner_1').hide();
		$('.map-canvas-bg').show();
		// слайдер для детального просмотра
		if($('#d-carousel').length){
			$('#d-carousel').carouFredSel({
				width: 990,
				height: 506, 
				prev: '#prev',
				next: '#next', 
				pagination: "#pager", 
				auto: false 
			});  
		} 
		// слайдер для детального просмотра на страницу маршрутов
		if($('#d-carousel-route').length){
			$('#d-carousel-route').carouFredSel({
				prev: '#prev',
				next: '#next',  
				pagination: "#pager",
				auto: false 
			}); 
		}
	 	mapPreviewInit(); 
	});
	
	$('.js_corner_2').on('click', function(e){
		e.preventDefault();
		$('.wrap-photo').fadeOut(100);
		$('.js_corner_1').show();
		$('.map-canvas-bg').hide();
		// слайдер для детального просмотра
		if($('#d-carousel').length){
			$('#d-carousel').carouFredSel({
				width: 990,
				height: 506, 
				prev: '#prev',
				next: '#next',
				pagination: "#pager",  
				auto: false 
			});  
		} 
		// слайдер для детального просмотра на страницу маршрутов
		if($('#d-carousel-route').length){
			$('#d-carousel-route').carouFredSel({
				prev: '#prev',
				next: '#next',  
				pagination: "#pager",
				auto: false 
			}); 
		}
	 	mapPreviewInit(); 
	});
	// читать подробнее об отеле
	$('.js_read-more').on('click', function(e){
		e.preventDefault();
		$(this).parent('.desc').find('p').toggleClass('full');
	});
	// календарь
	$('#datepicker-from').datepicker($.datepicker.regional[ "ru" ]);
	$('#datepicker-to').datepicker($.datepicker.regional[ "ru" ]);
	// преобразование селекта
	$('#select-rooms').selectbox();
	// читать подробнее о номере
	$('.js_show-details').on('click', function(e){
		e.preventDefault();
		$(this).toggleClass('invisible');
		$(this).parents('.room-item').find('.room-details').slideDown();
		$(this).parents('.room-item').find('.hide-details').show();
	});
	$('.js_hide-details').on('click', function(e){
		e.preventDefault();
		$(this).hide();
		$(this).parents('.room-item').find('.room-details').slideUp().end().find('.show-details').toggleClass('invisible'); 
	});
	// показать еще отели 
	$('.js_more-results').on('click', function(e){
		e.preventDefault(); 
		$(this).parents('.hotel_rooms_results_box').find('.hidden-item').slideDown();
	});
	
	// Мелочи по детальному описанию отеля
	$(".js_link_open").click(function(){
		$(this).removeClass('active');
		$('.js_link_close').addClass('active');
		$('.js_service_open_all').slideDown();
		$('.service_link_open_all').addClass('open');
		return false;
	});
	
	$(".js_link_close").click(function(){
		$(this).removeClass('active');
		$('.js_link_open').addClass('active');
		$('.js_service_open_all').slideUp();
		$('.service_link_open_all').removeClass('open');
		return false;
	});
	
	// Табы, подробная информацио отеля
	$(".js_tab_detals_hotel_list .js_tab_detals_hotel:not(:first)").hide();
	
	$('.js_tab_detals_menu li').click(function() {
		$('.js_tab_detals_menu li').removeClass('active');
		$(this).addClass('active');
		var curIndex = $('.js_tab_detals_menu li').index($(this));
		$('.js_tab_detals_hotel_list .js_tab_detals_hotel').hide();
		$('.js_tab_detals_hotel_list .js_tab_detals_hotel').eq(curIndex).show();
		return false;
	});
	
	// вызов попапа "способ оплаты"
	$(".hotel_oformlenie_button a").click(function(){ 
		loadPopup('.js_popup_payment');
		return false;
	}); 
	

	// Попап на карте
	$(".popup_map_comment_info a").click(function(e){
		e.preventDefault();
		$('.popup_map_comment_info').hide();
		$('.popup_map_comment').show();
		$('.popup_map_comment_text').jScrollPane();
		return false;
	});
	
	// Переключение закладок
	$(".js_share_map_list .js_share_map_but").click(function(){ 
		$(this).parents('.js_share_map_but').remove();
	});
	$('.js_share_map_list .share_map_close').click(function() {
		return false;
	});
	
	// Главная страница отелей, маленькие слайдеры
	if ($('#hotel_slider_min_l').length) {
		$('#hotel_slider_min_l').carouFredSel({
			width:'100%',
			height: 375,
			auto: true,
			scroll: {
				items: 1,
				duration: 500,
				timeoutDuration: 4000
			},
			align: false
		});
	};
	
	if ($('#hotel_slider_min_r').length) {
		$('#hotel_slider_min_r').carouFredSel({
			width:'100%',
			height: 375,
			auto: true,
			scroll: {
				items: 1,
				duration: 500,
				timeoutDuration: 4000
			},
			align: false,
			direction: 'right',
			duration: 7000
		});
	};


	if ($('#top_destinations_l').length) {
		$('#top_destinations_l').carouFredSel({
			width:'100%',
			height: 510,
			auto: true,
			scroll: {
				items: 1,
				duration: 500,
				pauseOnHover : "immediate",
				timeoutDuration: 4000
			},
			align: false
		});
	};
	
	if ($('#bot_destinations_r').length) {
		$('#bot_destinations_r').carouFredSel({
			width:'100%',
			height: 510,
			auto: true,
			scroll: {
				items: 1,
				duration: 500,
				pauseOnHover : "immediate",
				timeoutDuration: 4000
			},
			align: false,
			direction: 'right',
			duration: 7000
		});
	};
	
	$('.hotel_main_slider').css({ width : $('html, body').width() });
	$('.hotel_main_slider_height').css({ height : $(window).height() });
	
	$('.hotel_main').css({ width : $('html, body').width() + 30+ 'px' });
	$('.hotel_main_slider_height .hotel_main').css({ height : $(window).height() });
	
	
	$('.flightTypeButtons a').click(function() {
		$('.flightTypeButtons a').removeClass('active');
		$(this).addClass('active');
		return false;
	});
	
	$('.round').click(function () {
		$('div.calendar').toggle();
		$('.map_search_add').slideUp();
	});
	$('.oneway').click(function () {
		$('div.calendar').hide();
		$('.map_search_add').slideUp();
	});
	
	
	// маршруты - блок с фильтром
	if ($('.range-container').length) {
		$( "#range-entertainment" ).slider({
			  range: "min",
			  value:2.5,
			  min: 0,
			  max: 5,
			  step: 0.5, 
		  }); 
		$( "#range-sights" ).slider({
			  range: "min",
			  value:2.5,
			  min: 0,
			  max: 5,
			  step: 0.5, 
		  }); 
		$( "#range-nightlife" ).slider({
			  range: "min",
			  value:2.5,
			  min: 0,
			  max: 5,
			  step: 0.5, 
		  }); 
		$( "#range-cafe" ).slider({
			  range: "min",
			  value:2.5,
			  min: 0,
			  max: 5,
			  step: 0.5, 
		  });
		$( "#range-shopping" ).slider({
			  range: "min",
			  value:2.5,
			  min: 0,
			  max: 5,
			  step: 0.5, 
		  });
		$( "#range-helth" ).slider({
			  range: "min",
			  value:2.5,
			  min: 0,
			  max: 5,
			  step: 0.5, 
		  });
		$( "#range-activity" ).slider({
			  range: "min",
			  value:2.5,
			  min: 0,
			  max: 5,
			  step: 0.5, 
		  });
		$( "#range-extreme" ).slider({
			  range: "min",
			  value:2.5,
			  min: 0,
			  max: 5,
			  step: 0.5, 
		  });
		$( "#range-family" ).slider({
			  range: "min",
			  value:2.5,
			  min: 0,
			  max: 5,
			  step: 0.5, 
		  });
		$( "#range-events" ).slider({
			  range: "min",
			  value:2.5,
			  min: 0,
			  max: 5,
			  step: 0.5, 
		  });
		$( "#range-energy" ).slider({
			  range: "min",
			  value:2.5,
			  min: 0,
			  max: 5,
			  step: 0.5, 
		  });
		$( "#range-nature" ).slider({
			  range: "min",
			  value:2.5,
			  min: 0,
			  max: 5,
			  step: 0.5, 
		  });

		$( "#range-entertainment-route" ).slider({
			  range: "min",
			  value:2.5,
			  min: 0,
			  max: 5,
			  step: 0.5, 
		  }); 
		$( "#range-sights-route" ).slider({
			  range: "min",
			  value:2.5,
			  min: 0,
			  max: 5,
			  step: 0.5, 
		  }); 
		$( "#range-nightlife-route" ).slider({
			  range: "min",
			  value:2.5,
			  min: 0,
			  max: 5,
			  step: 0.5, 
		  }); 
		$( "#range-cafe-route" ).slider({
			  range: "min",
			  value:2.5,
			  min: 0,
			  max: 5,
			  step: 0.5, 
		  });
		$( "#range-shopping-route" ).slider({
			  range: "min",
			  value:2.5,
			  min: 0,
			  max: 5,
			  step: 0.5, 
		  });
		$( "#range-helth-route" ).slider({
			  range: "min",
			  value:2.5,
			  min: 0,
			  max: 5,
			  step: 0.5, 
		  });
		$( "#range-activity-route" ).slider({
			  range: "min",
			  value:2.5,
			  min: 0,
			  max: 5,
			  step: 0.5, 
		  });
		$( "#range-extreme-route" ).slider({
			  range: "min",
			  value:2.5,
			  min: 0,
			  max: 5,
			  step: 0.5, 
		  });
		$( "#range-family-route" ).slider({
			  range: "min",
			  value:2.5,
			  min: 0,
			  max: 5,
			  step: 0.5, 
		  });
		$( "#range-events-route" ).slider({
			  range: "min",
			  value:2.5,
			  min: 0,
			  max: 5,
			  step: 0.5, 
		  });
		$( "#range-energy-route" ).slider({
			  range: "min",
			  value:2.5,
			  min: 0,
			  max: 5,
			  step: 0.5, 
		  });
		$( "#range-nature-route" ).slider({
			  range: "min",
			  value:2.5,
			  min: 0,
			  max: 5,
			  step: 0.5, 
		  });
	}; 
	// переключатель спросить у друзей
	$(".icon-place").click(function(e){
		e.preventDefault();
		$(this).parents('.switcher-content').children('.icon-switcher').toggleClass('icon-active');
		$(this).parents('.switcher-content').children('.switcher-btn').toggleClass('clicked');
	});
	$(".icon-ask-friend").click(function(e){
		e.preventDefault();
		$(this).parents('.switcher-content').children('.icon-switcher').toggleClass('icon-active');
		$(this).parents('.switcher-content').children('.switcher-btn').toggleClass('clicked');  
		loadPopup('.ask-friends-popup');
	});
	// вызов спросить у друзей
	$(".js-ask-friend-btn").click(function(){
		loadPopup('.ask-friends-popup');
		return false;
	});
	$(".icon-ask-friend.js-switcher").click(function(){
		loadPopup('.ask-friends-popup');
		return false;
	});
	// вызов попапа Спросить у друзей
	$(".js-ask-friend-popup").click(function(){  
		$('.popup_ask').fadeIn();
		return false;
	});
	$(".popup_ask_bg .close").click(function(){ 
		$('.popup_ask').fadeOut();  
	});
	// скролл на блоке друзей
	if($('.js-friends-block').length){
		$('.js-friends-block').jScrollPane();
	}
	// поиск на карте  
	$('.search-menu-map input').click(function(e){ 
		e.preventDefault();
		$(this).animate({width : '310'});
		$(this).addClass('active');
	});

	// строка поиска - выпадающее меню скрыть
	$('.enumlist li').click(function(){ 
		$(this).parent().fadeOut();
	});
	// строка поиска - выпадающее меню скрыть


	bookmarkOne();

	$('.field_add_button a').click(function(){  
	//массив с буквами

		var letterList = []; 
		//заполнение буквами
		for(var i=65;i<=90;i++) { 
			letterList.push(String.fromCharCode(i));
 		} 
		//общее количество уже созданных табов
		var count = $('.share_map').find('.js_share_map_but').length;  
		var contWidth = $('.share_map').width(); 
		var tabWidth = $('.share_map_header').width(); 
		var numPad = parseInt($('.share_map_namber').css('padding-right')); 
		//добавляем новый таб
		if((count+1)<=10){
			$(".js_share_map_list .js_share_map_but").removeClass('active');
			$('<li class="js_share_map_but active"><span class="share_map_bg"><span class="share_map_namber">'+letterList[count]+'</span><span class="share_map_header">'+$('.js_toggle_tab').val()+'</span><a href="#" class="share_map_close"><img src="img/px.gif" alt="" /></a></span></li>').insertBefore('.share_map_add');
			//раздаем новые z-index
			$('.share_map_list').children('.js_share_map_but').each(function(i){
				var indCount = $('.share_map_list').children('.js_share_map_but').length + 1;
				$(this).attr('style','z-index:'+(indCount-(i+1)));
			});
			if((count+1)>=6){
				$('.share_map_on_route').find('.share_map_header').css('width',tabWidth-10);
			}
			if((count+1)>=8){
				$('.share_map_on_route').find('.share_map_namber').css('padding-right',numPad-5);
			}   
		}
		else{ 
			alert('Хватит, остановись, много уже! :)');
		}
		$(".js_share_map_list .js_share_map_but").click(function(){ 
			$(".js_share_map_list .js_share_map_but").removeClass('active');
			$(this).addClass('active');
		});
		$('.routes-submenu').removeClass('searching'); 
		bookmarkOneClose();
		return false;
	});

	// Скритие заклажки
	bookmarkOneClose();
	
	// показать календарь при клике на меню даты
	$(".routes-submenu .dates").click(function(e){ 
		e.preventDefault(); 
		$('.routes-submenu .calendar').fadeIn(); 
	});  
	// выбор "без дат"
	$("#without-date").click(function(e){ 
		e.preventDefault(); 
		$(this).parents('.calendar').fadeOut();
		$('.routes-submenu').find('.dates').text('Даты');
	}); 
	$('.routes-range:not(.calendar), .content:not(.calendar)').click(function(){ $('.calendar').fadeOut();})  
	$('body:not(.enumlist)').click(function(){ $('.enumlist').fadeOut();})
	// показать строку поиска в разделе Места
	$(".share_map_add").click(function(e){ 
		e.preventDefault(); 
		$('.routes-submenu').addClass('searching'); 
		$('.routes-submenu').find('.searchfield').val('');

	}); 
	// количество дней маршрута выбор (слайдер)
	if ($('#range-route-duration').length) {
		$( "#range-route-duration" ).slider({
			  range: true,
			  min: 0,
			  max: 30,
			  values: [ 3, 11 ],
			  slide: function( event, ui ) {
				  $( "#range-route-duration-min" ).val( ui.values[ 0 ]);
				  $( "#range-route-duration-max" ).val( ui.values[ 1 ]);
			  } 
			});
		$( "#range-route-duration-min" ).val( $( "#range-route-duration" ).slider( "values", 0 ) );
		$( "#range-route-duration-max" ).val( $( "#range-route-duration" ).slider( "values", 1 ) );
		$( "#range-route-duration-min" ).keyup(function( ) {  
			$( "#range-route-duration" ).slider('values',0,$(this).val()); 
	    });
		$( "#range-route-duration-max" ).keyup(function( ) {  
			$( "#range-route-duration" ).slider('values',1,$(this).val()); 
	    });
	}; 
	// текст бэкграунда для блока маршрута
	$('.shield-duration span').each(function(){
		var a = $(this).text(); 
		$(this).parents('.route-item').find('.duration-bg').text(a); 
	}); 
	$('.filter_but_style a').click(function () {
		$(this).parents('.filter_but_style').find('li').removeClass('active');
		$(this).parent('li').addClass('active');
		return false;
	});
	// выбор валюты
	if($('.js-currency').length){
		$('.js-currency').selectbox();
		$('.sbSelector').addClass('currency1');
		$('.js-currency').next('.sbHolder').find('.sbOptions li').each(function(i, val){
			var a = $(this).index()+1;
			$(this).addClass('currency'+a);
			$(this).find('a').prepend('<span class="icon"></span>');
		});
		$('.sbOptions li a').click(function(){
			var c = $(this).parent().attr('class');
			$('.sbSelector').removeClass('currency1 currency2 currency3').addClass(c);
		});
		$('.sbOptions li.currency3 a').click(function(){
			$('.budget-input-col input').attr('placeholder', '0€');
			$('.budget-input-col em').text('€');
			$('.booking-top em').text('€');
		});
		$('.sbOptions li.currency2 a').click(function(){
			$('.budget-input-col input').attr('placeholder', '0P');
			$('.budget-input-col em').text('P');
			$('.booking-top em').text('P');
		});
		$('.sbOptions li.currency1 a').click(function(){
			$('.budget-input-col input').attr('placeholder', '0$');
			$('.budget-input-col em').text('$');
			$('.booking-top em').text('$');
		});
	} 
	// Высчитываем стоимость
	
	var budgetInput = 0;
	var budgetInputNamber = 0;
	$(".js_input_calck").each(function(){
		if ( $(this).val() > 0 ) {
			budgetInputNamber = parseInt($(this).val())
		} else {budgetInputNamber = 0;}
		budgetInput = budgetInput + budgetInputNamber;
	});
	$('.summary strong').text(budgetInput);
	$('.sum-day strong').text(budgetInput);
	$('.js_input_calck').keyup(function()	{
		budgetInput = 0;
		budgetInputNamber = 0;
		$(".js_input_calck").each(function(){
			if ( $(this).val() > 0 ) {
				budgetInputNamber = parseInt($(this).val())
			} else {budgetInputNamber = 0;}
        	budgetInput = budgetInput + budgetInputNamber;
      	});
		$('.sum-day strong').text(budgetInput);
	});
	
	
	
	// карусель на попапе детальном об отеле
	if($('#places-carousel').length){
		$('#places-carousel').carouFredSel({ 
			prev: '#btn-prev',
			next: '#btn-next', 
			auto: false
		}); 
	} 
	// календарь на попапе детальном об отеле
	$('#datepicker-from-popup').datepicker($.datepicker.regional[ "ru" ]);
	$('#datepicker-to-popup').datepicker($.datepicker.regional[ "ru" ]);
	$('#datepicker-from-popup, #datepicker-to-popup').click(function(){
		$('.ui-datepicker').addClass('onTop');
	});
	// спросить совета переключатель меню
	$('.ask-socials a').click(function (e) {
		e.preventDefault();
		$(this).parent('div').find('a').removeClass('active');
		$(this).addClass('active');
		if($(this).hasClass('travelonline')){
			$('.ask-travel-popup').fadeIn();
			// галерея друзей у которых можно спрашивать совета
			$('.wrap-sn-friends .sn-friend-item:nth-child(3n+1)').addClass('marked'); 
			// скролл в галерее друзей у которых можно спрашивать совета
			if($('.js-sn-friends').length){
				$('.js-sn-friends').jScrollPane();
			}
		}
		if($(this).hasClass('mail')){  
			$('.ask-mail-popup').fadeIn();
		}
		if($(this).hasClass('fb')){  
			$('.ask-fb-popup').fadeIn();
			// галерея друзей у которых можно спрашивать совета
			$('.wrap-sn-friends .sn-friend-item:nth-child(3n+1)').addClass('marked'); 
			// скролл в галерее друзей у которых можно спрашивать совета
			if($('.js-sn-friends').length){
				$('.js-sn-friends').jScrollPane();
			}
		}
		if($(this).hasClass('vk')){  
			$('.ask-vk-popup').fadeIn();
			// галерея друзей у которых можно спрашивать совета
			$('.wrap-sn-friends .sn-friend-item:nth-child(3n+1)').addClass('marked'); 
			// скролл в галерее друзей у которых можно спрашивать совета
			if($('.js-sn-friends').length){
				$('.js-sn-friends').jScrollPane();
			}
		}
	});
	
	 // строка поиска - выпадающее меню
 	$('.friend-searchfield').keypress(function(){
  		$(this).addClass('opened'); 
  		$(this).next().fadeIn();
  		$('.js-friends-select').jScrollPane();
 	});
	
	// строка поиска - выпадающее меню скрыть
	
	$('.js-friends-select li').click(function(){ 
		$(this).parents('.js-friends-select').fadeOut();
		$('.friend-searchfield').removeClass('opened'); 
	});
	// спросить совета travelonline блок
	$('.travel-content .preview').click(function (e) {
		e.preventDefault(); 
		$(this).next().fadeToggle();
	});
	// спросить совета попап 2 уровень - закрыть
	$('.ask-mail-popup .close').click(function (e) {
		e.preventDefault(); 
		$('.ask-mail-popup').fadeOut();
	}); 
	$('.ask-fb-popup .close').click(function (e) {
		e.preventDefault(); 
		$('.ask-fb-popup').fadeOut();
	}); 
	$('.ask-vk-popup .close').click(function (e) {
		e.preventDefault(); 
		$('.ask-vk-popup').fadeOut();
	}); 
	$('.ask-travel-popup .close').click(function (e) {
		e.preventDefault(); 
		$('.ask-travel-popup').fadeOut();
	}); 
	// добавить инпут с email друга
	$('.add-email').click(function (e) {
		e.preventDefault();  
		$('<input type="text" class="friend-email style_input" placeholder="E-mail адрес друга">').insertBefore($(this).parent('form').find('.friend-email:last'));
	}); 
	$('.ask-btn').click(function (e) {
		e.preventDefault();
		$(this).toggleClass('asked');
	});
	$('.select_button.data').click(function (e) {
		e.preventDefault();
		$(this).parent('div').find('.calendar').show();
	});
	$('.save-places-link').click(function () {
		loadPopup('.popup-save-route'); 
		return false;
	});
	
	$('.add-tags-block a').click(function (e) {
		e.preventDefault();
		$(this).toggleClass('active');
	});
	$('textarea[maxlength]').on('keypress', function(e) {  
        var limit = parseInt($(this).attr('maxlength')),   
			text = $(this).val(),  
			ignore = [8,9,13,33,34,35,36,37,38,39,40,46],
			code = $.data(this, 'keycode'),			
			chars = text.length;    
		if(chars > limit){    
			return ( $(this).val().length < limit || $.inArray(code, ignore) !== -1 ); 
		}  
		$(this).parents('div').find('.type-status .typed').text(chars);
    });	
	$('.hotel_main_reg_but').mouseenter(function(){ 
		$(this).parents('.hotel_main_reg').stop().toggleClass('onhover');
	});  
	$('.hotel_main_reg_but').mouseout(function(){ 
		$(this).parents('.hotel_main_reg').stop().toggleClass('onhover');
	});  
	$('.fixed-content[data-type="top"]').each(function(){
        var $bgobj = $(this);  
		$window = $(window);
        $window.scroll(function() {
            var yPos = ($window.scrollTop() / $bgobj.data('speed')); 
            var coords = yPos + 'px'; 
            $bgobj.css({ 'top': coords });
        });
    });  
	$('.hotel_main_cont_up').each(function(){
        var $bgobjText = $(this);  
		$window = $(window);
        $window.scroll(function() {
            var yPosText = ($window.scrollTop() / -5 + 'px'); 
            $bgobjText.css({ 'top': yPosText });
        });
    });  
	
	
	// Паралакс блока регистрации
	$('.hotel_main_reg').each(function(){
		var $bgobj = $(this);
		$window = $(window);
		var yPos2 = -353;
		var scrollTopWin = 0;
		var imgBgPos = 380;
		if ( $(window).height() > 860 ) {
			imgBgPos = 266;
		} else {
				
		}
		
		$window.scroll(function() {
				scrollTopWin = $window.scrollTop();
				yPos2 = ($window.scrollTop() - imgBgPos);
				if (scrollTopWin > 85 && yPos2 < -20) {
					
					var backgPos = yPos2 + 'px'; 
					$bgobj.css({ 'backgroundPosition': 'center' + ' ' + backgPos });
				} else {
					if (scrollTopWin > 380) {
						$bgobj.css({ 'backgroundPosition': 'center' + ' ' + 0 + 'px' });	
					}
				}
			});
    });  
	
	// Добовление места
	var savePlacesBtn = $('.save-places-btn p span').text();
	$('.shield-gray').click(function() {
		$(this).hide();
		$(this).parents('.place-item').find('.in-route').show();
		savePlacesBtn = ++savePlacesBtn;
		$('.save-places-btn p span').text(savePlacesBtn);
		console.log(savePlacesBtn);
		return false;
		
	});
	$('.in-route').click(function() {
		$(this).hide();
		$(this).parents('.place-item').find('.shield-gray').show();
		savePlacesBtn = --savePlacesBtn;
		$('.save-places-btn p span').text(savePlacesBtn);
		return false;
	});
	
	
	 mapPreviewInit();
	 
	 // Переключение таб в маршрутах
	 var routesMenu = 0;
	 var routesMenuTime = 500; //Скорость перелистывания
	 var routesMenuSetTime = 200; //Поуза между сменой
	 
	 
	 $('.wrap-routes-range:first').css({left : 0});
	 $('.wrap-routes-range:first').addClass('active_cont');
	 
	 $('.routes-submenu-inner li.js_tab_link').click(function() {
         $('#trails-tabs-content .inner-tab:visible').slideUp();
         $('#trails-tab-'+$(this).attr('data-act')).slideDown();
		$('.routes-submenu-inner li.js_tab_link').find('a').removeClass('active');
		$(this).find('a').addClass('active');
		var curIndex = $('.routes-submenu-inner li.js_tab_link').index($(this));
		if (routesMenu < curIndex) {
			$('.routes-range-cont .wrap-routes-range:not(.active_cont)').css({ left : -1000 + 'px'});
			$('.routes-range-cont .wrap-routes-range.active_cont').animate({ left : -1000 + 'px'}, routesMenuTime);
			$('.routes-range-cont .wrap-routes-range').eq(curIndex).animate({ opacity : 0, left : 1000 + 'px'}, 0);
			$('.routes-range-cont .wrap-routes-range').animate({ opacity : 0}, 0);
			$('.routes-range-cont .wrap-routes-range').eq(curIndex).animate({ opacity : 1}, routesMenuSetTime);
			$('.routes-range-cont .wrap-routes-range').eq(curIndex).animate({ left : 0 + 'px'}, routesMenuTime);
		} else {
			$('.routes-range-cont .wrap-routes-range:not(.active_cont)').css({ left : 1000 + 'px'});
			$('.routes-range-cont .wrap-routes-range.active_cont').animate({ left : 1000 + 'px'}, routesMenuTime);
			$('.routes-range-cont .wrap-routes-range').eq(curIndex).animate({ opacity : 0, left : -1000 + 'px'}, 0);
			$('.routes-range-cont .wrap-routes-range').animate({ opacity : 0}, 0);
			$('.routes-range-cont .wrap-routes-range').eq(curIndex).animate({ opacity : 1}, routesMenuSetTime);
			$('.routes-range-cont .wrap-routes-range').eq(curIndex).animate({ left : 0 + 'px'}, routesMenuTime);
		};
		$('.routes-range-cont .wrap-routes-range').removeClass('active_cont');
		$('.routes-range-cont .wrap-routes-range').eq(curIndex).addClass('active_cont');
		routesMenu = curIndex;
		$('.content_tabs .content').hide();
		$('.content_tabs .content').eq(curIndex).show();
		
		$(window).scroll(); 

		if($(this).find('a').hasClass('js_tab_link_calendar')){
	        var hideWidth = ($('.routes-range').width() - $('.routes-range-cont').width())/2;
	        $('.hidden-block').css('width',hideWidth+70).show(); 
	        $('.main-content-wrapper').css('overflow','hidden');
	        $('.routes-range-cont').css('overflow','visible');
	        $('.wrap-routes-range .caroufredsel_wrapper').css('overflow','visible'); 
	        //$('#tour-calendar').fullCalendar('render'); 
		}
		else{
	        $('.main-content-wrapper').css('overflow','visible');
			$('.hidden-block').hide();
	        $('.routes-range-cont').css('overflow','hidden');
	        $('.wrap-routes-range .caroufredsel_wrapper').css('overflow','hidden'); 
		}


		return false;
	 });
	 
	 
	 // Поиск отеля, введение даты
	 $('.js_search_button_link').click(function () {
		 if ( $(this).parents('.wrap-routes-range').find('.input_search_adres').val() != '' ) {
			loadPopup('.popup-enter-data'); 
		 };
		return false;
	});
	
	
	var namberGuuest = ['Нет гостей', '1 Гость', '2 Гостя', '3 Гостя', '4 Гостя', '5 Гостей', '6 Гостей', '7 Гостей', '8 Гостей', '9 Гостей', '10 Гостей'];
	$('.more_guests_button').click(function() {
		$('.more_guests_popup, .more_guests').fadeOut();
		var guests = $('.guests-adults').find('.active').length;
		guests = guests + $('.guests-kids').find('.active').length;
		$('.wrap-routes-range').find('.js_link_guests_popup').text(namberGuuest[guests]);
		$('.map_search').find('.js_link_guests').text(namberGuuest[guests]);
		$('.hotel_rooms').find('.js_link_guests').text(namberGuuest[guests]);
		$('.guests-adults').find('.active').removeClass('active');
	});
	
	
	 // Кнопка добавить
	$('.room-info .js_button_add a').click(function() {
		$(this).parent('.js_button_add').hide();
		$(this).parent('.js_button_add').next('.button_orang').show();
		return false;
	});
	
	// меню в хедере
	var ht;
	$('.help span').click(function() {
		$('.help .open').show();
	});
	$('.help').mouseout(function() {
		//$('.help .open').hide();
	});
	$('.help, .open, .help span').hover(function() {
		if (ht != undefined) {
			clearTimeout(ht);
		}
	}, function() {
		clearTimeout(ht);
		ht = setTimeout(function() {
			$('.help .open').hide();
		}, 300);
	});
	
	
	// бюджет - выподающий попап по клику в инпут
	$('.js_input_popup').click(function() {
		var inputMessageCont = $(this).next('.budget-input-message').html();
		$('.js-budget-input-message').html(inputMessageCont);
		$('.js-budget-input-message').fadeIn();
		var inputPopupPosition = $(this).offset();
		$('.js-budget-input-message').css({'top' : inputPopupPosition.top + 'px', 'left' : inputPopupPosition.left + 'px'});
	});
	
	// Сумируем чеки в бюждете
	
	$('.booking-body .check').click(function() {
		var paymentSym = 0;
		$('.content-booking .booking-body .check').each(function(index){
			if ($(this).hasClass('checkOn')) {
				paymentSym = paymentSym + parseInt($(this).prev().find('.booking-price strong').text().replace(' $', ''));
				console.log(paymentSym);
			};
			
		});
		$('.js_payment_sym em, .booking-top em').text(paymentSym);
	});

	resizePopUpRoutes();

	//карта пользователя, ОБЩЕЕ
	sizeUserMap();

	$('.popup_user_close').click(function () {
		$('.popup_user_message').fadeOut();
		return false;
	});

	// форма пинов на карте
	$('.popup_map_add_mesto a').click(function() {
		$('.popup_map_pin_cont').addClass('active');
		$('.popup_map_pin .popup_map_pin_form').show();
		$('.popup_map_pin .popup_map_comment_text').jScrollPane();
		$('.popup_map_add_mesto').hide();
		return false;
	});

	if($('.r_u_day_corusel').length){
		$(this).find('.rout_user_box_cont').jScrollPane();
	};


	$('.r_u_day_corusel a').click(function() {
		$('.r_u_day_corusel li').removeClass('active');
		$(this).parent('li').addClass('active');
		var namberDay = $(this).find('.js_namberDay').text() - 1;
		var DayLIsting = namberDay *(-500);
		$('.rout_user_content_in').animate({left : DayLIsting + 'px'}, 1000);
		return false;
	});


	$('.rout_user_box_text').click(function() {
		if ( $(this).hasClass('active') ) {
			$('.rout_user_box_text').removeClass('active');
			$('.rout_user_box_cont').hide();
		} else {
			$('.rout_user_box_text').removeClass('active');
			$(this).addClass('active');
			$('.rout_user_box_cont').hide();
			$(this).next('.rout_user_box_cont').show();

			if($(this).next('.rout_user_box_cont').find('.r_u_cont_corusel_img').length){
				$(this).next('.rout_user_box_cont').find('.r_u_cont_corusel_img').carouFredSel({ 
					prev: '.r_u_cont_corusel_l',
					next: '.r_u_cont_corusel_r', 
					auto: false
				}); 
			};

			$(this).next('.rout_user_box_cont').jScrollPane();

		};

		$('.rout_user_box_cont').find('.jspVerticalBar').css({opacity : 0});

		$('.rout_user_box_cont').hover(function() {
			$(this).find('.jspVerticalBar').animate({opacity : 1}, 500);
		}, function() {
			$(this).find('.jspVerticalBar').animate({opacity : 0}, 100);
		});
	});

	$('.rout_user_box_but2').click(function() {
		$(this).toggleClass('active');
		$(this).parent('.rout_user_box_text').toggleClass('active_orang');
		return false;
	});

	$('.r_u_message_popup_close').click(function() {
		$(this).parent('div').fadeOut();
		return false;
	});

	$('.rout_use_ava a').click(function() {
		$('.rout_user_message_popup').fadeIn();
		return false;
	});

	$('#tour-calendar').hover(function() {
			$(this).find('.jspVerticalBar').animate({opacity : 1}, 500);
		}, function() {
			$(this).find('.jspVerticalBar').animate({opacity : 0}, 100);
	});

	$('.main_register').css({ height : $(window).height() });

	$('.main_register-tab .main_register:first').show();
	$('.fooer_menu_tabs li').click(function() {
		$('.fooer_menu_tabs li').removeClass('active');
		$(this).addClass('active');
		var curIndexMenu = $('.fooer_menu_tabs li').index($(this));
		$('.main_register-tab .main_register').hide();
		$('.main_register-tab .main_register').eq(curIndexMenu).show();
		return false;
	});

	$('.hotel_main_tab a').click(function() {
		$('.hotel_main_tab li').removeClass('active');
		$(this).parent('li').addClass('active');
		if ( !$(this).parent().hasClass('three') ) {
			$('.hotel_main_slider_inp_box').hide();
		} else {
			$('.hotel_main_slider_inp_box').show();
		};
		return false;
	});

	var tabPopupWidth = 100;
	$('.hotel_main_tab li').hover(function() {
		$(this).find('.tab_popup').stop().fadeIn();
		tabPopupWidth = $(this).find('.tab_popup').width() + 26;
		$(this).find('.tab_popup').css({'margin-left' : tabPopupWidth/-2 + 'px'});
	}, function() {
		$(this).find('.tab_popup').stop().fadeOut();
	});

	$('.hotel_main_button_add').click(function() {
		$($('.hotel_main_input_add').html()).insertBefore(".hotel_main_input_add");

		return false;
	});

	// Календарь, бюджет на сутки
	$('.budget_day_table-categori span').click(function() {
		$(this).next().fadeIn();
	});
	var Budget = 0;
	var BudgetAct = 0;
    var budgetDayTableClick = function(){
    	if ($(this).hasClass('activeClick')) {
    		$(this).removeClass('activeClick');
    		$(this).parents('.budget_day_table-categori').find('span').text($('.heder_categori_none').text());
    		$(this).parents('.budget_day_table-list').fadeOut();
	        $(this).parents('.budget_day_table-categori').removeClass('active');
    	} else {
	        $(this).parents('.budget_day_table-categori').find('span').text($(this).text());
	        Budget = $(this).parents('.budget_day_form').find('.budget_day_table .budget_day_table-item').length;
	        BudgetAct = $(this).parents('.budget_day_form').find('.budget_day_table .budget_day_table-item').index($(this).parents('.budget_day_table-item')) + 2;
	        console.log(Budget+ ' - ' +BudgetAct);
	        $(this).parents('.budget_day_table-list').find('a').removeClass('activeClick');
	        $(this).addClass('activeClick');
	        if (Budget == BudgetAct) {
	            var budgetDayTable = $($('.budget_day_table-add').html());
	            budgetDayTable.insertBefore(".budget_day_table-add");
	            budgetDayTable.find('a').on('click', budgetDayTableClick);
	            budgetDayTable.find('.budget_day_table-categori span').click(function() {
	                $(this).next().fadeIn();
	            });
	        };
	        $(this).parents('.budget_day_table-list').fadeOut();
	        $(this).parents('.budget_day_table-categori').addClass('active');
	    };
        return false;

    }
	$('.budget_day_table-list a').click(budgetDayTableClick);

	var budgetDayInput = 0;
	var budgetDayInputNamber = 0;
	$('.budget_day_table-input input').keyup(function()	{
		budgetDayInput = 0;
		budgetDayInputNamber = 0;
		$(this).parents('.budget_day_table-input').find("input").each(function(){
			if ( $(this).val() > 0 ) {
				budgetDayInputNamber = parseInt($(this).val())
			} else {budgetDayInputNamber = 0;}
        	budgetDayInput = budgetDayInput + budgetDayInputNamber;
      	});
		$(this).parents('.route_day_list').find('.budget_day_itogo_r').text(budgetDayInput);
	});

	if($('.budget_day_table').length){
		$('.budget_day_table').jScrollPane({
			autoReinitialise : true,
			autoReinitialiseDelay : 100
		});
	};


	$('.rout_user_box_close a').click(function(){
		$(this).parents('.rout_user_box').remove();
		return false;
	});


	$('.js-delet_route').click(function() {
		$('.popup-save-route-in2').fadeIn();
		return false;
	});
	$('.js-close_delet_route').click(function(){
		$('.popup-save-route-in2').fadeOut();
		return false;
	});
	$('.js-ok_delet_route').click(function(){
		$('.popup-save-route-in2').fadeOut();
		disablePopup();
		return false;
	});


	$('.js-locations_added').click(function(){
		$('#trails-tabs-content .inner-tab:visible').slideUp();
         $('#trails-tab-'+$(this).attr('data-act')).slideDown();
		$('.routes-submenu-inner li.js_tab_link').find('a').removeClass('active');
		$('.js_tab_link_calendar').addClass('active');
		var curIndex = 5;
		if (routesMenu < curIndex) {
			$('.routes-range-cont .wrap-routes-range:not(.active_cont)').css({ left : -1000 + 'px'});
			$('.routes-range-cont .wrap-routes-range.active_cont').animate({ left : -1000 + 'px'}, routesMenuTime);
			$('.routes-range-cont .wrap-routes-range').eq(curIndex).animate({ opacity : 0, left : 1000 + 'px'}, 0);
			$('.routes-range-cont .wrap-routes-range').animate({ opacity : 0}, 0);
			$('.routes-range-cont .wrap-routes-range').eq(curIndex).animate({ opacity : 1}, routesMenuSetTime);
			$('.routes-range-cont .wrap-routes-range').eq(curIndex).animate({ left : 0 + 'px'}, routesMenuTime);
		} else {
			$('.routes-range-cont .wrap-routes-range:not(.active_cont)').css({ left : 1000 + 'px'});
			$('.routes-range-cont .wrap-routes-range.active_cont').animate({ left : 1000 + 'px'}, routesMenuTime);
			$('.routes-range-cont .wrap-routes-range').eq(curIndex).animate({ opacity : 0, left : -1000 + 'px'}, 0);
			$('.routes-range-cont .wrap-routes-range').animate({ opacity : 0}, 0);
			$('.routes-range-cont .wrap-routes-range').eq(curIndex).animate({ opacity : 1}, routesMenuSetTime);
			$('.routes-range-cont .wrap-routes-range').eq(curIndex).animate({ left : 0 + 'px'}, routesMenuTime);
		};
		$('.routes-range-cont .wrap-routes-range').removeClass('active_cont');
		$('.routes-range-cont .wrap-routes-range').eq(curIndex).addClass('active_cont');
		routesMenu = curIndex;
		$('.content_tabs .content').hide();
		$('.content_tabs .content').eq(4).show();
		
		$(window).scroll(); 

		if($(this).find('a').hasClass('js_tab_link_calendar')){
	        var hideWidth = ($('.routes-range').width() - $('.routes-range-cont').width())/2;
	        $('.hidden-block').css('width',hideWidth+70).show(); 
	        $('.main-content-wrapper').css('overflow','hidden');
	        $('.routes-range-cont').css('overflow','visible');
	        $('.wrap-routes-range .caroufredsel_wrapper').css('overflow','visible'); 
	        //$('#tour-calendar').fullCalendar('render'); 
		}
		else{
	        $('.main-content-wrapper').css('overflow','visible');
			$('.hidden-block').hide();
	        $('.routes-range-cont').css('overflow','hidden');
	        $('.wrap-routes-range .caroufredsel_wrapper').css('overflow','hidden'); 
		}
	});


	$(".pay_form-help img").click(function(){
		loadPopup('.cart_form_help_popup');
		return false;
	});
	

	// 07.01.2014 http://cyberapp.ru/2011/07/06/jquery-maskedinput/
	// Маска для инпутов

	if($('#NamberCart').length){
		$("#NamberCart").mask("9999        9999        9999        9999");
	};
	if($('#phoneCart').length){
		$("#phoneCart").mask("+9 (999) 999-99-99");
	};
	if($('#phoneCart2').length){
		$("#phoneCart2").mask("+9 (999) 999-99-99");
	};
	if($('#pasportNamber').length){
		$("#pasportNamber").mask("** 9999999");
	};
	if($('#pasportDate').length){
		$("#pasportDate, #pasportDate2").mask("99.99.9999");
	};
	if($('#pasportBirth').length){
		$("#pasportBirth, #pasportBirth2").mask("99.99.9999");
	};
	if($('#CVV').length){
		$("#CVV").mask("***");
	};
	if($('.data_mask').length){
		$(".data_mask").mask("99");
	};
	


	$('.citizenship_input').click(function(){
		$(this).parent().find('.citizenship_select').show();
		$(this).parent().find('.citizenship_select').jScrollPane();
	});
	var citizenshipText;
	$('.citizenship_select a').click(function(){
		citizenshipText = $(this).text();
		$(this).parents('.pay_form-input').find('.citizenship_input').val(citizenshipText);
		$(this).parents('.pay_form-input').find('.citizenship_select').hide();
		return false;
	});

	$('.input_pol').click(function(){
		$(this).parent().find('.pol_select').show();
	});
	var citizenshipText;
	$('.pol_select a').click(function(){
		citizenshipText = $(this).text();
		$(this).parents('.pay_form-input').find('.input_pol').val(citizenshipText);
		$(this).parents('.pay_form-input').find('.pol_select').hide();
		return false;
	});

	/*var teamNameHeight;
	$('.team-item a').hover(function(){
		teamNameHeight = $(this).find('.team_name').height();
		$(this).find('.team_name').stop().animate({'height' : 155 + 'px', 'opacity' : 0.59}, 500);
	},
	function(){
		$(this).find('.team_name').stop().animate({'height' : teamNameHeight + 'px', 'opacity' : 0.8}, 500);
	});*/
	

});

function Latin(obj) {
   if (/^[a-zA]*?$/.test(obj.value)) 
      obj.defaultValue = obj.value;
   else 
      obj.value = obj.defaultValue;
}
function Mail(mail_obj) {
   if (/^[a-zA-Z0-9 ,.\-:"()@]*?$/.test(mail_obj.value)) 
      mail_obj.defaultValue = mail_obj.value;
   else 
      mail_obj.value = mail_obj.defaultValue;
}
function Namber(namber) {
   if (/^[0-9]*?$/.test(namber.value)) 
      namber.defaultValue = namber.value;
   else 
      namber.value = namber.defaultValue;
}

function r_u_day_corusel(){ 
	if($('.r_u_day_corusel').length){
		$('.r_u_day_corusel').carouFredSel({
			circular: false,
			infinite: false,
			width: 410,
			height: 17,
			prev: '.rout_user_day_tab_l a',
			next: '.rout_user_day_tab_r a', 
			auto: false 
		});  
	};
};


function bookmarkOne() {
	var letterList = []; 
		//заполнение буквами
		for(var i=65;i<=90;i++) { 
			letterList.push(String.fromCharCode(i));
 		} 
		//общее количество уже созданных табов
		var count = $('.share_map').find('.js_share_map_but').length;
		var contWidth = $('.share_map').width(); 
		var tabWidth = $('.share_map_header').width(); 
		var numPad = parseInt($('.share_map_namber').css('padding-right')); 
		//добавляем новый таб
		if((count+1)<=10){
			
			//раздаем новые z-index
			$('.share_map_list').children('.js_share_map_but').each(function(i){
				var indCount = $('.share_map_list').children('.js_share_map_but').length + 1;
				$(this).attr('style','z-index:'+(indCount-(i+1)));
			});
			if((count+1)>=6){
				$('.share_map_on_route').find('.share_map_header').css('width',tabWidth-10);
			}
			if((count+1)>=8){
				$('.share_map_on_route').find('.share_map_namber').css('padding-right',numPad-5);
			}   
		}
		else{ 
			alert('Хватит, остановись, много уже! :)');
		};

};

function bookmarkOneClose() {
	$('.js_share_map_but .share_map_close').click(function() {
		$(this).parents('.js_share_map_but').remove();
		return false;
	});
};

var popupStatus = 0;

function loadPopup(popup){  
	if(popupStatus==0){
		$(popup).show();
		popupStatus = 1;
		$('body').addClass('popupOpen');
	}
};
	
function disablePopup(){ 
	if(popupStatus==1){
		$(".popup").hide();
		popupStatus = 0;
		$('body').removeClass('popupOpen');
	}
} 
// инициализация карты  
function mapPreviewInit() { 
	if ($('#map-canvas').length) { 
		var latlng = new google.maps.LatLng(45.436767,12.330093); 
		var mapOptions = {
			zoom: 15,  
			center: latlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP, 
			panControl:false,
			streetViewControl:false,
			mapTypeControl:false, 
			scaleControl: false,
			scrollwheel: false 
		}; 
		var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions); 
		var image = new google.maps.MarkerImage('/bundles/routes/img/popup/pin.png', 
			new google.maps.Size(63, 56), 
			new google.maps.Point(0,0), 
			new google.maps.Point(18, 42)
		); 
		var marker1 = new google.maps.Marker({
			position: new google.maps.LatLng(45.436767,12.330093),
			map: map,
			icon: image  
		});  
		google.maps.event.addDomListener(map, 'tilesloaded', function(){ 
			mapZoomInitSmall();
		});  
	};
};

function namberActiveSelect(el) {
 	var namberActiveSelect = 0;
	namberActiveSelect = el.parents('.route_day').find('.check.checkOn').length;
	el.parents('.route_day').find('.selected_route_day span').text(namberActiveSelect);
};



// инициализация карты  Маршруты
function mapPreviewInitRoute() { 
	if ($('#map-canvas-route').length) { 
		var latlng = new google.maps.LatLng(45.436767,12.330093); 
		var mapOptions = {
			zoom: 15,  
			center: latlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP, 
			panControl:false,
			streetViewControl:false,
			mapTypeControl:false, 
			scaleControl: false,
			scrollwheel: false 
		}; 
		var map = new google.maps.Map(document.getElementById('map-canvas-route'), mapOptions); 
		var image = new google.maps.MarkerImage('img/popup/pin.png', 
			new google.maps.Size(63, 56), 
			new google.maps.Point(0,0), 
			new google.maps.Point(18, 42)
		); 
		var marker1 = new google.maps.Marker({
			position: new google.maps.LatLng(45.436767,12.330093),
			map: map,
			icon: image  
		});  
		google.maps.event.addDomListener(map, 'tilesloaded', function(){ 
			mapZoomInitRout()
		}); 
	}
}

function mapPreviewInitRoute2() { 
	if ($('#map-canvas-route2').length) { 
		var latlng = new google.maps.LatLng(45.436767,12.330093); 
		var mapOptions = {
			zoom: 15,  
			center: latlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP, 
			panControl:false,
			streetViewControl:false,
			mapTypeControl:false, 
			scaleControl: false,
			scrollwheel: false 
		}; 
		var map = new google.maps.Map(document.getElementById('map-canvas-route2'), mapOptions); 
		var image = new google.maps.MarkerImage('img/popup/pin.png', 
			new google.maps.Size(63, 56), 
			new google.maps.Point(0,0), 
			new google.maps.Point(18, 42)
		); 
		var marker1 = new google.maps.Marker({
			position: new google.maps.LatLng(45.436767,12.330093),
			map: map,
			icon: image  
		});  
		google.maps.event.addDomListener(map, 'tilesloaded', function(){ 
			mapZoomInitRout2()
		}); 
	}
}
// карта с группировками
function mapInitClusters() { 
	if ($('#map').length) {
		var map_center = new google.maps.LatLng(Math.floor(Math.random() * 15), Math.floor(Math.random() * 30));
			
		var map = new google.maps.Map(document.getElementById("map"), {
			  zoom:3,
			  center:map_center,
			  mapTypeId:google.maps.MapTypeId.ROADMAP,
			  panControl:false,
			  streetViewControl:false,
			  mapTypeControl:false, 
			  scaleControl: false,
			  scrollwheel: false
		});  
		var pos;
		var marker;
		var marker_list = [];
		for (var i = 0; i < 30; i++) {
			pos = new google.maps.LatLng(Math.floor(Math.random() * 15), Math.floor(Math.random() * 30));
			marker = new google.maps.Marker({
				position:pos,
				map:map,
				title:'Title',
				icon:'/bundles/routes/img/popup/pin.png'
			});  
			marker_list.push(marker);
		} 
		// Add marker clustering
		var markerCluster = new MarkerClusterer(map, marker_list, {
			gridSize:40,
			minimumClusterSize: 4,
			calculator: function(markers, numStyles) {
			// Custom style can be returned here
				return {
					text: markers.length,
					index: numStyles
				};
			}
		});
		google.maps.event.addDomListener(map, 'tilesloaded', function(){ 
			mapZoomInit();
		}); 
	} 
}
function mapZoomInit() { 
	if($('#map').find('.customCont').length==0){
		$('#map').find('.gmnoprint').last().parent().wrap('<div class="customCont" />'); 
		$('#map').find('.customCont').children().find('.gmnoprint:last-child').addClass('customZoom');
		$('#map').find('.customZoom').find('div:first-child').addClass('zoomIn'); 
		$('#map').find('.customZoom').find('div:nth-child(2)').addClass('zoomBg'); 
		$('#map').find('.customZoom').find('div:nth-child(3)').addClass('zoomPos'); 
		$('#map').find('.customZoom').find('div:last-child').addClass('zoomOut');
	}  
}  
function mapZoomInitRout() { 
	if($('#map-canvas-route').find('.customCont').length==0){
		$('#map-canvas-route').find('.gmnoprint').last().parent().wrap('<div class="customCont" />'); 
		$('#map-canvas-route').find('.customCont').children().find('.gmnoprint:last-child').addClass('customZoom');
		$('#map-canvas-route').find('.customZoom').find('div:first-child').addClass('zoomIn'); 
		$('#map-canvas-route').find('.customZoom').find('div:nth-child(2)').addClass('zoomBg'); 
		$('#map-canvas-route').find('.customZoom').find('div:nth-child(3)').addClass('zoomPos'); 
		$('#map-canvas-route').find('.customZoom').find('div:last-child').addClass('zoomOut');
	}  
}  

function mapZoomInitRout2() { 
	if($('#map-canvas-route2').find('.customCont').length==0){
		$('#map-canvas-route2').find('.gmnoprint').last().parent().wrap('<div class="customCont" />'); 
		$('#map-canvas-route2').find('.customCont').children().find('.gmnoprint:last-child').addClass('customZoom');
		$('#map-canvas-route2').find('.customZoom').find('div:first-child').addClass('zoomIn'); 
		$('#map-canvas-route2').find('.customZoom').find('div:nth-child(2)').addClass('zoomBg'); 
		$('#map-canvas-route2').find('.customZoom').find('div:nth-child(3)').addClass('zoomPos'); 
		$('#map-canvas-route2').find('.customZoom').find('div:last-child').addClass('zoomOut');
	}  
} 

function mapZoomInitSmall() { 
	if($('#map-canvas').find('.customContSmall').length==0){ 
		$('#map-canvas').find('.gmnoprint').last().parent().wrap('<div class="customCont customContSmall" />'); 
		$('#map-canvas').find('.customCont').children().find('.gmnoprint:last-child').addClass('customZoom customZoomSmall');
		$('#map-canvas').find('.customZoom').find('div:nth-child(2)').addClass('zoomIn');  
		$('#map-canvas').find('.customZoom').find('div:last-child').addClass('zoomOut');
	}  
}  
$(document).on('click', 'body', function (e) {
	// количество гостей 
	var guests = $('.wrap-routes-range .guests-adults').find('.active').length;
	$('.wrap-routes-range').find('.js_link_guests').text(guests+' Гость');
	
	// Закрытие попапа
	var current = $(e.target);
	if (current.parents('.popup').length === 0) {
		if ($('.popup_in').is(":visible")) {
			disablePopup();
		}; 
	}
	
	
});


$(document).mouseup(function (e){
  	var container = $(".searchfield"); 
  	if (!container.is(e.target) && container.has(e.target).length === 0){
		if ( $('.searchfield').val() == '') {
			if ($('.searchfield').hasClass('active')) {
				$('.search-menu-map input').animate({width: '176'});
				$('.search-menu-map input').removeClass('active'); 
			}
		};
	};
	
	var container2 = $(".js-budget-input-message"); 
  		if (!container2.is(e.target) && container2.has(e.target).length === 0){
   		container2.fadeOut();
  	};

  	var container3 = $(".citizenship_select"); 
  		if (!container3.is(e.target) && container3.has(e.target).length === 0){
   		container3.hide();
  	};

  	var container4 = $(".pol_select"); 
  		if (!container4.is(e.target) && container4.has(e.target).length === 0){
   		container4.hide();
  	};
  
});

var offsetTop = -1;
var offsetTop_t = -1;
if ($('.left_column_t').length) { var offsetTopMenu = $('.routes_fixed').offset().top; };
var offsetTopMenuCal = offsetTopMenu + 120;
var scrollMenuInfo = 50;

$(window).scroll(function() {

	if ($('.left_column').length) {
		$('.left_column').each(function() {
			if ($(this).is(':visible')) {
				if (offsetTop == -1) {
					offsetTop = $(this).offset().top;
				}

				if ($(window).scrollTop() + $(window).height() > offsetTop + $(this).height()) {
					var curBottom = 0;
					if ($(window).scrollTop() + $(window).height() > $('.footer_main').offset().top - 8) {
						curBottom = $(window).scrollTop() + $(window).height() - $('.footer_main').offset().top + 8;
					}
					$(this).css({position: 'fixed', bottom: curBottom});
				} else {
					$(this).css({position: 'relative', bottom: 0});
				}
			}
		});
	};

	
	if ($('.left_column_t').length) {
		$('.left_column_t').each(function() {
			if ($(this).is(':visible')) {
			

				if ($(window).scrollTop() > offsetTop - 40) {
					var curBottom = $(window).height() - $(this).height();
					if ($(window).scrollTop() + $(this).height() > $('.footer_main').offset().top - 8) {
						curBottom = $(window).scrollTop() + $(this).height() - $('.footer_main').offset().top + 8;
					}
					$(this).css({position: 'fixed', top: 41 + 'px'});
				} else {
					$(this).css({position: 'relative', top: 0});
				}
			}
		});
	};

	// Меню инфо

	if ($('.main_page-info:visible').length) {
		if ($(window).scrollTop() > scrollMenuInfo) {
			$('.main_page-info-open').fadeIn();
			$('.main_page-info').fadeOut();
		};
	};


	
});

function runSlider() {
	var nextSlide = $('#hotel_main_slider .hotel_main.active').next();
	var nextIndex = $('#hotel_main_slider .hotel_main').index(nextSlide);
	slideTo(nextIndex, false);
}

function slideTo(i, noDelay) {
	var curDelay = innerDelay;
	if (noDelay) {
		curDelay = 0;
	}

	$('#hotel_main_slider .hotel_main.active').find('.jsInner').animate({opacity: 0}, effectTime);
	$('#hotel_main_slider .hotel_main.active').delay(curDelay).animate({opacity: 0}, effectTime, function() {
		$(this).removeClass('active');
	});
	
	var nextSlide = $('#hotel_main_slider .hotel_main').eq(i);
	if (i == -1) {
		nextSlide = $('#hotel_main_slider .hotel_main:eq(0)');
		i = 0;
	}
	nextSlide.addClass('active');
	nextSlide.css('left', '0px');
	nextSlide.delay(curDelay).animate({opacity: 1, left: -30}, effectTime, function() {
		nextSlide.find('.jsInner').animate({opacity: 1}, effectTime);
	});
	
	$('.routes_main_menu a').removeClass('active');
	$('.routes_main_menu a').eq(i).addClass('active');
	
	sliderTimeout = setTimeout(runSlider, slideTime);
}

$(window).resize(function() {
	resizePopUpRoutes();
	sizeUserMap();
	if($('.hidden-block').length){ 
		var hideWidth = ($('.routes-range').width() - $('.routes-range-cont').width())/2;
		$('.hidden-block').css('width',hideWidth+70).show(); 
	}
});

function resizePopUpRoutes() {
	// Маршруты регулируем видимость попапа
	if ($(window).height() > 610) {
		$('.quick_veiw_main_fix').addClass('active');
		$('.route_in_day_info_magin').addClass('active');
	} else {
		$('.quick_veiw_main_fix').removeClass('active');
		$('.route_in_day_info_magin').removeClass('active');
	};
};

function sizeUserMap() {
	if ($(window).height() > 570 ) {
		$('.map_user').height($(window).height() - 153 + 'px');
	};
};
 