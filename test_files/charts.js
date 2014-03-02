var charts = {}, currentMonth = 5,
    months = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];


function generatePieData() 
 {
    return [{
		        "title": "Парки",
		        "value": Math.round(Math.random() * 100)
		    }, {
		        "title": "Природа",
		        "value": Math.round(Math.random() * 100)
		    },{
		        "title": "Развлечения",
		        "value": Math.round(Math.random() * 100)
		    },{
		        "title": "Транспорт",
		        "value": Math.round(Math.random() * 100)
		    },{
		        "title": "Проживание",
		        "value": Math.round(Math.random() * 100)
		    }];
 }		    


function generateChartData() {
	var chartData = [];
	var firstDate = new Date(2012, 0, 1);
	var d = Math.floor(Math.random()*500)+100;

	firstDate.setDate(firstDate.getDate() - d );
	firstDate.setHours(0, 0, 0, 0);

	for (var i = 0; i < 25; i++) {
		var newDate = new Date(firstDate);
		newDate.setDate(newDate.getDate() + i);

		var value = Math.round(Math.random() * (40 + i)) + 100 + i;

		chartData.push({
			date: newDate,
			value: value
		});
	}
	return chartData;
}



function getWeekDay(date) 
 {
   var weekday=['В','П','В','С','Ч','П','С'], d = new Date(date);
   if (!d) return ' '; 
   return weekday[d.getDay()]+" ";
 }


function pad(num, size) {  var s = "00000" + num;  return s.substr(s.length-size);  }

function getFormatedDate(date) 
 {
   var d = new Date(date), ourDate = d.getDate()
   return pad(ourDate,2);
 }


function setBaloon(balloon) 
 {
	balloon.adjustBorderColor = true;
	balloon.color = "#ffffff";
	balloon.cornerRadius = 3;
	balloon.fillColor = "#000000";
	balloon.borderColor = "#000000"; 
	balloon.borderAlpha = 0; 	
 }


function createGraph() 
 {
    var chartData = generateChartData();

    // The graph has been splitted into 4 layers:
    
    // Dates layer 
	var config =  {
			type: "stock", theme: "custom",
			dataSets: [{
				color: "#134d75",
				fieldMappings: [{ fromField: "value", toField: "value" }],
				dataProvider: chartData,
				categoryField: "date"
			}],

			panels: [{
				showCategoryAxis: true,
				title: "Value",
				eraseAll: false,
				valueAxes: [{ id : "g1",  gridAlpha : 0,  inside : true, labelFunction : function(value, valueText, valueAxis) { return ''; } }],			
				categoryAxis: { id : "g1", minPeriod : "DD", gridAlpha : 0, labelColor : 'white', "minorGridEnabled": false,
				   centerLabelOnFullPeriod : false, inside : true,
		           labelFunction : function(value, valueText, valueAxis) {  return getFormatedDate(valueText);  }
				 },			
			}],
			chartScrollbarSettings : { enabled : false },
			chartCursor: { cursorAlpha : 0, enabled : false, valueBalloonsEnabled: true,	zoomable: false	}
    };		

    // Weedays name layer 
	var config2 =  {
			type: "stock",
		    theme: "custom",
			dataSets: [{
				color: "#134d75",
				fieldMappings: [{ fromField: "value", toField: "value" }],
				dataProvider: chartData,
				categoryField: "date"
			}],
			panels: [{
				eraseAll: false,
				valueAxes: [{ id : "g1",  gridAlpha : 0,  inside : true, labelFunction : function(value, valueText, valueAxis) { return ''; } }],			
				categoryAxis: { id : "g1", minPeriod : "DD", gridAlpha : 0, labelColor : 'white', "minorGridEnabled": false,
				   centerLabelOnFullPeriod : false, inside : true,
		           labelFunction : function(value, valueText, valueAxis) {  return getWeekDay(valueText);  }
				 }
			}],

			chartScrollbarSettings : { enabled : false },
			chartCursor: { cursorAlpha : 0, enabled : false, valueBalloonsEnabled: true,	zoomable: false	}
    };		


    // The graph layer 
	var config3 =  {
			type: "stock",
		    theme: "custom",
			dataSets: [{
				color: "#134d75",
				fieldMappings: [{ fromField: "value", toField: "value" }],
				dataProvider: chartData,
				categoryField: "date"
			}],
			panels: [{
				eraseAll: false,
				valueAxes: [{ id : "g1",  gridAlpha : 0,  inside : true, labelFunction : function(value, valueText, valueAxis) { return ''; } }],			
				categoryAxis: { id : "g1", minPeriod : "DD", gridAlpha : 0, labelColor : 'white', "minorGridEnabled": false,
				   centerLabelOnFullPeriod : false, inside : true,
		           labelFunction : function(value, valueText, valueAxis) {  return '';  }
				 },
						
				stockGraphs: [{
					id: "g1",
					autoMargins : false,
					balloonText: "<div style='font-size:14px;'>[[value]]</span></b>",
					valueField: "value",
					useDataSetColors: false,
				    bullet: "round",
					bulletColor:"#1d91cc",
					bulletBorderAlpha: 1,
					bulletSize: 3,
					lineThickness: 1.5
				}]
			}],

			chartScrollbarSettings : { enabled : false }
			//chartCursor: { cursorAlpha : 0, enabled : false, valueBalloonsEnabled: true,	zoomable: false	}
    };		



   // Vertical lines layer   
	var config4 =  {
			type: "stock",
		    theme: "custom",
			dataSets: [{
				color: "#134d75",
				fieldMappings: [{ fromField: "value", toField: "value" }],
				dataProvider: chartData,
				categoryField: "date"
			}],

			panels: [{
				showCategoryAxis: true,
				title: "Value",
				eraseAll: false,
				valueAxes: [{ id : "g1",  gridAlpha : 0,  inside : true, labelFunction : function(value, valueText, valueAxis) { return ''; } }],			
				categoryAxis: { id : "g1", minPeriod : "DD", gridAlpha : 0.2, labelColor : 'white', "minorGridEnabled": false,
				   centerLabelOnFullPeriod : false, inside : true,
		           labelFunction : function(value, valueText, valueAxis) {  return '';  }
				 },			
				
			}],

			chartScrollbarSettings : { enabled : false },
			chartCursor: { cursorAlpha : 0, enabled : false, valueBalloonsEnabled: true, zoomable: false	}
    };		


	charts['graph']  = AmCharts.makeChart("chartdiv", config);
	charts['graph2'] = AmCharts.makeChart("chartdiv2", config2);
	charts['graph3'] = AmCharts.makeChart("chartdiv3", config3);
	charts['graph4'] = AmCharts.makeChart("chartdiv4", config4);
	
	setBaloon(charts['graph3'].balloon);

	charts['graph'].chartCursorSettings.enabled = false;
	charts['graph2'].chartCursorSettings.enabled = false;
	charts['graph3'].chartCursorSettings.enabled = true;
	charts['graph4'].chartCursorSettings.enabled = false;



	

 }	




function createRightDonut() 
 {
	charts['pieRight'] = AmCharts.makeChart("rightDonut", {
		    "type": "pie",
		    "theme": "none",
		    "outlineAlpha": 0,
		    "outlineThickness" : 6,
		    "startDuration" : 0,
		    "pullOutRadius" : 0,
		    "sequencedAnimation": false,
		    "colors" : ["#1d91cc","#43e2e2","#ff9804","#f15a23"],
			"legend": {
					"divId":"rightLegend",
			        "markerType": "square",
					"marginRight": 80,		
					"autoMargins": false,
					"color": "#ffffff"
			    },		    
		    "dataProvider": generatePieData(),
		    "titleField": "title",
		    "valueField": "value",
		    "labelRadius": 5,
		    "color" : "#ffffff",
		    "balloon" : { enabled : false },
		    "radius": "32%",
		    "innerRadius": "70%",
		    "labelText": "[[value]]%"
	});

 }





function createLeftDonut() 
 {
	charts['pieLeft'] = AmCharts.makeChart("leftDonut", {
		    "type": "pie",
		    "theme": "none",
		    "pullOutRadius" : 0,
		    "colors" : ["#1d91cc","#43e2e2","#ff9804","#f15a23"],
			"legend": {
					"divId":"leftLegend",
			        "markerType": "square",
					"marginRight": 80,		
					"autoMargins": false,
					"color": "#ffffff"
			    },		    
		    "dataProvider": generatePieData(),
		    "startDuration" : 0,
		    "titleField": "title",
		    "valueField": "value",
		    "labelRadius": 5,
		    "color" : "#ffffff",
		    "balloon" : { enabled : false },
		    "radius": "32%",
		    "innerRadius": "70%",
		    "labelText": "[[value]]%"
	});

 }




function reloadData()
 {

 	// Как-бы запрашиваем данные 
 	/*
 	$.ajax({ 
        url: "/olol", 
        settings : { month : 1  }, 
        type: 'POST'  })
     .always(function(data) {  

     		// Пока обновляем рандомными данными 
     }); 
    */ 

    		// Updating charts 
		    charts['pieLeft'].dataProvider = generatePieData();
		    charts['pieLeft'].validateData();
		    
		    charts['pieRight'].dataProvider = generatePieData();
		    charts['pieRight'].validateData();

		    charts['chart1'].clear();
		    charts['chart2'].clear();
		    charts['chart3'].clear();
		    charts['chart4'].clear();
		    createGraph();


		    // update month names 
		    var next = currentMonth+1; if (next>11) { next = 0; }
		    var prev = currentMonth-1; if (prev<0) { prev = 11; }
		    $(".leftText").html(months[prev]);
		    $(".rightText").html(months[next]);



 }



function nextMonth() 
 {
    currentMonth++; if (currentMonth>11) { currentMonth = 0; }
    reloadData();
 }

function prevMonth() 
 {
    currentMonth--; if (currentMonth<0) { currentMonth = 11; }	
    reloadData();

 }



function init()
 {
	 createRightDonut(); 
	 createLeftDonut(); 
	 createGraph(); 
	 //createSimpleGraph() 
	 //reloadData();

	 $('.rightArrow').on('click',nextMonth); 
	 $('.leftArrow').on('click',prevMonth); 
 }




init();
 
