var chartData = generateChartData();

var pieData = [{
		        "title": "New",
		        "value": 45
		    }, {
		        "title": "Returning",
		        "value": 22
		    },{
		        "title": "Returning",
		        "value": 17
		    },{
		        "title": "Returning",
		        "value": 22
		    },{
		        "title": "Returning",
		        "value": 17
		    }];

function generateChartData() {
	var chartData = [];
	var firstDate = new Date(2012, 0, 1);
	firstDate.setDate(firstDate.getDate() - 500);
	firstDate.setHours(0, 0, 0, 0);

	for (var i = 0; i < 15; i++) {
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

   var out = "<div style='width:10px;color:white'><span>"+d.getDate()+"</span><span>"+weekday[d.getDay()]+"</span></div>";

   return weekday[d.getDay()]+" ";
 }






function createGraph() 
 {

		var ourChart = AmCharts.makeChart("chartdiv", {

			type: "stock",
		    theme: "custom",
		    pathToImages: "http://www.amcharts.com/lib/3/images/",

			dataSets: [{
				color: "#134d75",
				fieldMappings: [{
					fromField: "value",
					toField: "value"
				}],
				dataProvider: chartData,
				categoryField: "date"
			}],

			panels: [{
				showCategoryAxis: true,
				title: "Value",
				eraseAll: false,

				valueAxes: [{ id : "g1",  gridAlpha : 0,  inside : true,
		           labelFunction : function(value, valueText, valueAxis) { return ''; }
				 }],			

				categoryAxis: { id : "g1", minPeriod : "DD", gridAlpha : .2, labelColor : 'white', "minorGridEnabled": false,
				   centerLabelOnFullPeriod : false, inside : true,
		           labelFunction : function(value, valueText, valueAxis) { 
		           	 return getWeekDay(valueText); 
		           },
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

			chartScrollbarSettings : { enabled : false },
			chartCursor: {
				valueBalloonsEnabled: true,
				zoomable: false,
			}
			
		});


		var balloon = ourChart.balloon; 

		balloon.adjustBorderColor = true;
		balloon.color = "#ffffff";
		balloon.cornerRadius = 3;
		balloon.fillColor = "#000000";
		balloon.borderColor = "#000000"; 
		balloon.borderAlpha = 0;
	}	




function createRightDonut() 
 {
	AmCharts.makeChart("leftDonut", {
		    "type": "pie",
		    "theme": "none",
		    "outlineAlpha": 0,
		    "outlineThickness" : 6,
		    "sequencedAnimation": false,
		    "colors" : ["#1d91cc","#43e2e2","#ff9804","#f15a23"],
			"legend": {
					"divId":"leftLegend",
			        "markerType": "square",
					"marginRight": 80,		
					"autoMargins": false,
					"color": "#ffffff"
			    },		    
		    "dataProvider": pieData,
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
	AmCharts.makeChart("rightDonut", {
		    "type": "pie",
		    "theme": "none",
		    "colors" : ["#1d91cc","#43e2e2","#ff9804","#f15a23"],
			"legend": {
					"divId":"rightLegend",
			        "markerType": "square",
					"marginRight": 80,		
					"autoMargins": false,
					"color": "#ffffff"
			    },		    
		    "dataProvider": pieData,
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



 createRightDonut(); 
 createLeftDonut(); 
 createGraph(); 
 
