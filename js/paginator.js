$(document).ready(function() {
	var paginatorNamber;
	$('.ask-socials a').click(function () {
		// Пагинация
		$(".wrap-sn-friends:visible .sn-friend-cont").hide();
		$(".wrap-sn-friends:visible .sn-friend-cont:first").show();
		paginatorNamber = $(".wrap-sn-friends:visible .sn-friend-cont").length;
		$(".ask-sn-popup-in:visible").find('.pagination_all').text(paginatorNamber);
		$(".ask-sn-popup-in:visible").find('.page_end').text(paginatorNamber);
		$('.page_namber').remove();
		paginatorTag(paginatorNamber);
		pagerItemClick(paginatorNamber);
		$(".page_namber:first").addClass('active');
		$('.pagination_position').text('1');
		return false;
	});

});

var paginatorTagNamber = 1;
var paginatorTagVisible = 8;
function paginatorTag(paginatorNamber) {
	if (paginatorTagNamber < paginatorNamber) {
		if ( paginatorTagNamber <= paginatorTagVisible) {
			$(".ask-sn-popup-in:visible").find('.page_namber_box').append('<a href="#" class="page_namber">' + paginatorTagNamber + '</a>');
			paginatorTagNamber = ++paginatorTagNamber;
			paginatorTag(paginatorNamber);
		} else {
			$(".ask-sn-popup-in:visible").find('.page_namber_box').append('<a href="#" class="page_namber" style="display: none;">' + paginatorTagNamber + '</a>');
			paginatorTagNamber = ++paginatorTagNamber;
			paginatorTag(paginatorNamber);
		}
	} else {
		paginatorTagNamber = 1;
	};
};

var pageNamberItem, pageNamberItemAct;
function pagerItemClick(paginatorNamber) {
	var i, iClose;
	$('.page_namber').click(function(){
		pageNamberItem = $(this).text() - 1;
		$('.pagination_position').text(pageNamberItem + 1);
		$('.wrap-sn-friends:visible .sn-friend-cont').hide();
		$('.wrap-sn-friends:visible .sn-friend-cont').eq(pageNamberItem).show();
		$('.page_namber, .page_end').removeClass('active');
		$(this).addClass('active');
		$('.ask-sn-popup:visible .page_namber').hide();
		if (pageNamberItem <= 3) {
			i = 0;
			iClose = 8;
		} else {
			if (pageNamberItem > paginatorNamber - 7) {
				i = paginatorNamber - 9;
				iClose = paginatorNamber - 1;
			} else {
				i = pageNamberItem - 4;
				iClose = pageNamberItem + 4;
			}
		}
		for (i; i < iClose; i++) {
			$('.ask-sn-popup:visible').find('.page_namber_box .page_namber').eq(i).show();
		};
		return false;
	});
	$('.page_end').click(function(){
		$(this).parents('.pagination').find('.page_namber').removeClass('active');
		$(this).parents('.pagination').find('.page_namber').hide();
		$(this).addClass('active');
		$(this).parents('.ask-sn-popup').find('.sn-friend-cont').hide();
		$(this).parents('.ask-sn-popup').find('.sn-friend-cont').eq(paginatorNamber-1).show();
		$(this).parents('.ask-sn-popup').find('.pagination_position').text(paginatorNamber);

		i = paginatorNamber - 9;
		iClose = paginatorNamber;
		for (i; i < iClose; i++) {
			$(this).parents('.ask-sn-popup').find('.page_namber').eq(i).show();
		};
		return false;
	});
};