$(document).ready(function() {
	

	var helpLinkText;
	var helpLinkText2;
	var helpNamberPage;
	$('.help_link_click').click(function(){
		$('.help_link_click').removeClass('active');
		$(this).addClass('active');
		helpNamberPage = '#' + $(this).attr("rel");
		console.log(helpNamberPage);
		$('.help_page-item').hide();
		if($(helpNamberPage).length){
			$(helpNamberPage).show();
		} else {$("#help_error").show();}
		return false;
	});

	$('.help_link_1').click(function(){
		$('.help_link_1').parents('li').removeClass('active');
		$(this).parents('li').addClass('active');
		$('.help_page-menu').animate({ left : -200 });
		helpLinkText = $(this).text();
		$('.crubs ul').html('<li><a href="" class="help_lavel_1_l">Помощь</a> <img src="img/help/pointer.png" class="crubs_pointer" alt="" /></li><li><strong>' + helpLinkText + '</strong></li>');
		crubsBack();
		return false;
	});

	$('.help_link_2').click(function(){
		$('.help_link_2').parents('li').removeClass('active');
		$(this).parents('li').addClass('active');
		$('.help_page-menu').animate({ left : -400 });
		helpLinkText2 = $(this).text();
		$('.crubs ul').html('<li><a href="" class="help_lavel_1_l">Помощь</a> <img src="img/help/pointer.png" class="crubs_pointer" alt="" /></li><li><a href="" class="help_lavel_2_l">' + helpLinkText + '</a> <img src="img/help/pointer.png" class="crubs_pointer" alt="" /></li><li><strong>' + helpLinkText2 + '</strong></li>');
		crubsBack();
		return false;
	});

	crubsBack();

	$('.help_page-close a').click(function(){
		$('.help_page-menu').animate({ left : 0 });
		$('.crubs ul').html('<li>Помощь</li>');
		$('.help_page-item').hide();
		$("#help_0_0").show();
		return false;
	});

	$('.help_page-close2 a').click(function(){
		$('.help_page-menu').animate({ left : -200 + 'px' });
		$('.crubs ul').html('<li><a href="" class="help_lavel_1_l">Помощь</a> <img src="img/help/pointer.png" class="crubs_pointer" alt="" /></li><li><strong>' + helpLinkText + '</strong></li>');
		$('.help_page-item').hide();
		$("#help_0_0").show();
		return false;
	});

	$('.crubs a').click(function(){
		$('.help_page-menu').animate({ left : 0 });
		$('.crubs ul').html('<li>Помощь</li>');
		$('.help_page-item').hide();
		$("#help_0_0").show();
		return false;
	});

	$('.help_link_detals a').click(function(){
		$(this).parent().next().slideToggle();
		return false;
	});


});

function crubsBack(){ 
	$('.help_lavel_1_l').click(function(){
		$('.help_page-menu').animate({ left : 0 });
		$('.crubs ul').html('<li>Помощь</li>');
		return false;
	});
	var helpLinkTextBack = $(this).text(); 
	$('.help_lavel_2_l').click(function(){
		$('.help_page-menu').animate({ left : -200 + 'px' });
		helpLinkTextBack = $(this).text()
		$('.crubs ul').html('<li><a href="" class="help_lavel_1_l">Помощь</a> <img src="img/help/pointer.png" class="crubs_pointer" alt="" /></li><li><strong>' + helpLinkTextBack + '</strong></li>');
		crubsBack();
		return false;
	});
};




