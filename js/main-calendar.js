$(document).ready(function() {  


    $('#external-events div.external-event').each(function() { 
        var eventObject = {
            title: $.trim($(this).find('.city').text()), // use the element's text as the event title
            img: $.trim($(this).find('img').attr('src'))  
        };  
        $(this).data('eventObject', eventObject);  
        $(this).draggable({
            zIndex: 999,
            revert: true,      // will cause the event to go back to its
            revertDuration: 0,  //  original position after the drag
        }); 
    });

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
        
    $('#tour-calendar').fullCalendar({
        header: {
            left: '',
            right: 'prev,next',
            center: '',
        },
        height : 600,
        defaultView: 'agendaWeek', 
        editable: true,
        allDaySlot: false,
        slotMinutes: 60,
        axisFormat: 'h:mm tt',
        firstDay: 1,
        firstHour: 9,
        dayNamesShort: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'],
        /*events: [ 
                {
                    title: 'Место номер один',
                    start: new Date(y, m, d, 6,0),
                    end: new Date(y, m, d, 7, 0),
                    allDay: false,
                    img: 'images/calendar/place4.jpg'
                },  
                {
                    title: 'Место номер два',
                    start: new Date(y, m, d+1, 6,0),
                    end: new Date(y, m, d+1, 7, 0),
                    allDay: false,
                    img: 'images/calendar/place4.jpg'
                },  
                {
                    title: 'Место номер три',
                    start: new Date(y, m, d, 12, 0),
                    end: new Date(y, m, d, 13, 0),
                    allDay: false,
                    img: 'images/calendar/place3.jpg'
                },
                {
                    title: 'Место номер четыре',
                    start: new Date(y, m, d+1, 19, 0),
                    end: new Date(y, m, d+1, 22, 0),
                    allDay: false,
                    img: 'images/calendar/place1.jpg'
                } 
        ],  */
        eventRender: function(event, element) {
            /*element.find('.fc-event-title').before($("<div class=\"fc-event-icon\"><img src="+event.img+" /></span>")); 
            element.find('.fc-event-time').hide(); */
        }, 
        eventColor: '#a5c6e5', /*'transparent'*/
        eventBorderColor : '#4993c0',
        droppable: true, // this allows things to be dropped onto the calendar !!!
        drop: function(date, allDay) { // this function is called when something is dropped
            var originalEventObject = $(this).data('eventObject'); 
			var copiedEventObject = $.extend({}, originalEventObject); 
            copiedEventObject.start = date;  
            copiedEventObject.allDay = allDay; 
			$('#tour-calendar').fullCalendar('renderEvent', copiedEventObject, true); 
        },
		viewDisplay: function(view) {  
			$('.fc-agenda-days').next().find('div:first').jScrollPane();
        }
        /*,
        eventClick: function (calEvent, jsEvent, view) {           
            $('#tour-calendar').fullCalendar('removeEvents', calEvent._id);
        }*/
    }); 
		
    $('.content_tabs .content:not(:first)').hide();
		

    $('.tour-calendar-header li a').on('click',function(){
        $(this).parents('ul').find('a').removeClass('active');
        $(this).addClass('active');  
        if ($(this).hasClass('week')){
            $('.tour-agenda').fadeOut(100);
            $('.tour-calendar').fadeIn(100); 
            $('.tour-calendar-options-popup').fadeIn(100); 
        }
        if ($(this).hasClass('agenda')){
            $('.tour-agenda').fadeIn(100);
            $('.tour-calendar').fadeOut(100);
            $('.tour-calendar-options-popup').fadeOut(100); 
        } 
        $('.route_day_list_scroll').jScrollPane(); 
        return false;
    })
    $('.tour-agenda-nav li a').on('click',function(){
        $(this).parents('ul').find('a').removeClass('active');
        $(this).addClass('active'); 
        if ($(this).hasClass('days')){
            $('.tour-agenda-days').fadeOut(100);
            $('.tour-agenda-alldays').fadeIn(100); 
        }
        if ($(this).hasClass('all-days')){
            $('.tour-agenda-days').fadeIn(100);
            $('.tour-agenda-alldays').fadeOut(100); 
        }  
        $('.route_day_list_scroll').jScrollPane(); 
        return false;
    })
    $('.route_day_head_days a').on('click',function(){
        var indDay = $(this).index();
        var widthList = $('.route_day_long .route_day_list_scroll').width();
        var indList = 1;
        var curLeft = $('.route_day_list-wrapper').attr('style').replace('left: ','').replace('px',''); 
        $(this).parents('.route_day_long').find('.route_day_list-wrapper').animate({"left": (-widthList*indDay)+"px"}, 400); 
        return false;
    });

    // Листание дней повестки дня
    var dateWidth = 0;
    var dateAllWidth = 0;
    var dateListing = 0;
    var dateWidthListing = 0;
    dateWidth = $('.route_day_head_days a').width();
    dateAllWidth = $('.route_day_head_days a').length * dateWidth;
    dateListing = Math.round( dateAllWidth / dateWidth / 7 ).toFixed(0);
    var  dateListingNamber = dateListing;
    dateWidthListing = dateWidth * 7;
    if (dateListing >= 1) {
        $('.route_day_pointer_r').show();
    } else {
         $('.route_day_pointer_r').hide();
    }

    var dateWidthListingLeft = 0;

    $('.route_day_pointer_r').click(function(){
        dateWidthListingLeft = dateWidthListingLeft - dateWidthListing;
        $('.route_day_in_position').animate({ 'left' : dateWidthListingLeft + 'px'});
        dateListing = --dateListing;
        if (dateListing >= 1) {
            $('.route_day_pointer_r').show();
        } else {
             $('.route_day_pointer_r').hide();
        };
        $('.route_day_pointer_l').show();
        console.log(dateListing);
    });

    $('.route_day_pointer_l').click(function(){
        dateWidthListingLeft = dateWidthListingLeft + dateWidthListing;
        $('.route_day_in_position').animate({ 'left' : dateWidthListingLeft + 'px'});
        dateListing = ++dateListing;
        if (dateListing < dateListingNamber) {
            $('.route_day_pointer_l').show();
        } else {
             $('.route_day_pointer_l').hide();
        };
        $('.route_day_pointer_r').show();
        console.log(dateListing);
    });


});
 