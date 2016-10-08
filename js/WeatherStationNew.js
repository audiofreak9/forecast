// GeoLocation
function success(position) {
	//Make a call to the Google maps api to get the name of the location
	jQuery.ajax({
		url: 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+position.coords.latitude+','+position.coords.longitude,
		type: 'POST',
		dataType: 'json',
		success: function(data) {
			if (screen.width > 767) {
				var w = document.getElementById("map-lightning");
				var x = document.getElementById("ForecastIO");
				var y = document.getElementById("map-rain");
				var z = document.getElementById("currArea");
				z.innerHTML = data.results[0].address_components[2].long_name + ', ' + data.results[0].address_components[5].short_name;
				x.innerHTML= '<iframe id="forecast_embed" type="text/html" frameborder="0" height="245" width="100%" src="http://forecast.io/embed/#lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&name=' + data.results[0].address_components[2].long_name + ',%20' + data.results[0].address_components[5].short_name + '&text-color=#' + IOcolor + '&color=#' + IOcolor + '"></iframe>';
				y.innerHTML = '<div class="map-widget"><img src="http://api.wunderground.com/api/8d7a298b0ff974db/radar/image.gif?centerlat=' + position.coords.latitude + '&centerlon=' + position.coords.longitude + '&radius=100&width=240&height=240&newmaps=1" alt="Weather" class="map-image" /><a href="http://www.wunderground.com/wundermap/?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&zoom=9&type=ter&units=english&tl.play=1&tl.spd=3&lightning=1&rad=1&rad.num=1&rad.spd=25&rad.opa=50&rad.stm=1&rad.type=N0R&rad.smo=1&rad.mrg=0&wxsn=1&wxsn.mode=tw&svr=0&cams=0&sat=0&sat.opa=50&&sat.gtt1=255&sat.gtt2=255&sat.type=IR4&riv=0&mm=0&hur=0&fire=0&tor=0&ndfd=0&pix=0" target="_blank" title="Open Weather Underground Wundermap"><img src="images/map-mask-140' + v + '.png" class="mask" /></a></div>';
				w.innerHTML = '<div class="map-widget"><img src="http://images.blitzortung.org/Images/image_b_us.png" alt="Lightning" class="map-image" /><a href="http://www.lightningmaps.org/realtime?lang=en"  title="Open LightningMaps.org lightning" target="_blank"><img src="images/map-mask-140' + v + '.png" class="mask" /></a></div>';
			}
			var positionLatLng = "" + position.coords.latitude + "," + position.coords.longitude + "";
			loadData(positionLatLng);
		}
	});
}
function error() {
	if (screen.width > 767) {
		var w = document.getElementById("map-lightning");
		var x = document.getElementById("ForecastIO");
		var y = document.getElementById("map-rain");
		var z = document.getElementById("currArea");
		z.innerHTML = WUarea;
		x.innerHTML = '<iframe id="forecast_embed" type="text/html" frameborder="0" height="245" width="100%" src="http://forecast.io/embed/#lat=' + Lat + '&lon=' + Lng + '&name=Cape%20May%20Court%20House,%20NJ&text-color=#' + IOcolor + '&color=#' + IOcolor + '"></iframe>';
		y.innerHTML = '<div class="map-widget"><img src="http://api.wunderground.com/api/8d7a298b0ff974db/animatedradar/q/PA/Philadelphia.gif?newmaps=1&num=8&delay=30&width=240&height=240&radius=150" alt="Weather" class="map-image" /><a href="http://www.wunderground.com/wundermap/?lat=39.44574&lon=-74.86633&zoom=9&type=ter&units=english&tl.play=1&tl.spd=3&lightning=1&rad=1&rad.num=1&rad.spd=25&rad.opa=50&rad.stm=1&rad.type=N0R&rad.smo=1&rad.mrg=0&wxsn=1&wxsn.mode=tw&svr=0&cams=0&sat=0&sat.opa=50&&sat.gtt1=255&sat.gtt2=255&sat.type=IR4&riv=0&mm=0&hur=0&fire=0&tor=0&ndfd=0&pix=0" target="_blank" title="Open Weather Underground Wundermap"><img src="images/map-mask-140' + v + '.png" class="mask" /></a></div>';
		w.innerHTML = '<div class="map-widget"><img src="http://images.blitzortung.org/Images/image_b_us.png" alt="Lightning" class="map-image" /><a href="http://www.lightningmaps.org/realtime?lang=en"  title="Open LightningMaps.org lightning" target="_blank"><img src="images/map-mask-140' + v + '.png" class="mask" /></a></div>';
	}
	var positionLatLng = Lat + ',' + Lng;
	loadData(positionLatLng);
}
function ISODateString(d){
	function pad(n){return n<10 ? '0'+n : n}
	return d.getFullYear()+'-'
			+ pad(d.getMonth()+1)+'-'
			+ pad(d.getDate())+'T'
			+ pad(d.getHours())+':'
			+ pad(d.getMinutes())+':'
			+ pad(d.getSeconds())
}
function loadData(positionLatLng) {
	// Set some variables
	var date = new Date();
	date.setHours(0);
	date.setMilliseconds(0);
	date.setMinutes(0);
	date.setSeconds(0);
	var minus1 = ISODateString(date);
	date.setDate(date.getDate() - 1);
	var minus2 = ISODateString(date);
	var apikey = "88bcfda3d45a0238f96e6b702f440978";
	$.when(
		$.ajax({
			url: "https://api.darksky.net/forecast/" + apikey + "/" + positionLatLng + "," + minus1 + "?extend=hourly&units=us&callback=?",
			type: 'GET',
			dataType: 'jsonp',
			error: errorHandler
		}),
		$.ajax({
			url: "https://api.darksky.net/forecast/" + apikey + "/" + positionLatLng + "," + minus2 + "?extend=hourly&units=us&callback=?",
			type: 'GET',
			dataType: 'jsonp',
			error: errorHandler
		}),
		$.ajax({
			url: "https://api.darksky.net/forecast/" + apikey + "/" + positionLatLng + "?extend=hourly&units=us&callback=?",
			type: 'GET',
			dataType: 'jsonp',
			error: errorHandler
		})
	).done(
		function(a1, a2, a3){
			mergeData(a1[0], a2[0], a3[0]);
	});
}
function mergeData(minus1, minus2, forecast) {
	hourlyspan = Array();
	for(var i = 1; i < minus2.hourly.data.length; i ++) {
		if(minus2.hourly.data[i].time < minus1.hourly.data[0].time) {
			hourlyspan.push(minus2.hourly.data[i])
		}
	}
	for(var i = 0; i < minus1.hourly.data.length; i ++) {
		if(minus1.hourly.data[i].time < forecast.hourly.data[0].time) {
			hourlyspan.push(minus1.hourly.data[i])
		}
	}
	for(var i = 0; i <  forecast.hourly.data.length; i ++) {
		hourlyspan.push(forecast.hourly.data[i])
	}
	dailyspan = Array();
	for(var i = 0; i < minus2.daily.data.length; i ++) {
		if(minus2.daily.data[i].time < minus1.daily.data[0].time) {
			dailyspan.push(minus2.daily.data[i])
		}
	}
	for(var i = 0; i < minus1.daily.data.length; i ++) {
		if(minus1.daily.data[i].time < forecast.daily.data[0].time) {
			dailyspan.push(minus1.daily.data[i])
		}
	}
	for(var i = 0; i <  forecast.daily.data.length; i ++) {
		dailyspan.push(forecast.daily.data[i])
	}
	current = forecast.currently;
	forecastdata = forecast.hourly.data;
	renderData(hourlyspan, forecast.hourly.data, current, dailyspan);
}
function renderData(hourly, forecast, current, daily) {
	$('#loading,#loading2').hide();
	if (screen.width <= 767) {
		$("#current-conditions").html(daily[1+(1*oset)].summary);
		$("#current-precip").html(Math.round(current['precipProbability']*100));
		$("#current-humid").html(Math.round(current['humidity']*100));
		$("#current-high").html(Math.round(daily[1+(1*oset)].temperatureMax));
		$("#current-low").html(Math.round(daily[1+(1*oset)].temperatureMin));
		$("#temp-morning").html(Math.round(hourly[31+(24*oset)].temperature));
		$("#temp-midday").html(Math.round(hourly[35+(24*oset)].temperature));
		$("#temp-afternoon").html(Math.round(hourly[39+(24*oset)].temperature));
		$("#temp-evening").html(Math.round(hourly[43+(24*oset)].temperature));
		$("#temp-overnight").html(Math.round(hourly[47+(24*oset)].temperature));
		var skycons = new Skycons({"color": "#F1F1F1"});
		if (oset > 0) {
			$("#current-temp").html(Math.round(hourly[39+(24*oset)].temperature));
			skycons.add("icon-image", hourly[35+(24*oset)].icon);
		}else{
			$("#current-temp").html(Math.round(current['temperature']));
			skycons.add("icon-image", current.icon);
		}
		skycons.add("icon-morning", hourly[31+(24*oset)].icon);
		skycons.add("icon-midday", hourly[35+(24*oset)].icon);
		skycons.add("icon-afternoon", hourly[39+(24*oset)].icon);
		skycons.add("icon-evening", hourly[43+(24*oset)].icon);
		skycons.add("icon-overnight", hourly[47+(24*oset)].icon);
		skycons.play();
		placeDate('dateE');
	}else{
		$('.title').show();
		pieTemperature('pie-temperature', current);
		piePressure('pie-pressure', current);
		pieRiseSet('pie-riseset', current, daily, daily);
		show('map-rain');
		show('map-lightning');
		plotRain('chart-rain', hourly, daily);
		plotWindSpeed('chart-wind', hourly, daily);
		plotTemperature('chart-temp', hourly, daily);
		plotPressure('chart-pressure', hourly, current, daily);
		placeDate('dateW');
	}
}
function  errorHandler(e) {
	console.log(e.status +' '+e.statusText);
}
//Functions
function hide(chartName) {
	$('#' + chartName).hide();
}
function show(chartName) {
	$('#' + chartName).show();
}
function pieTemperature(chartName, forecast) {
	var tmp = Array();
	tmp.push(Math.round(forecast.temperature*10)/10);
	var chart = new Highcharts.Chart({
		chart: {
			renderTo: chartName,
			type: 'pie'
		},
		plotOptions: {
			pie: {
				colors: ['#FF3333', '#1C3575'],
				startAngle: -180,
				endAngle: 180,
				size: 140,
				center: ['50%', '50%'],
				borderColor: 'transparent',
				dataLabels: {
					enabled: false,
				}
			}
		},
		title: {
				text: ''+Math.round(forecast.temperature)+'°F',
				style: {
					fontSize: '26px'
				},
				align: 'center',
				verticalAlign: 'middle',
				y: 8
		},
		tooltip: {
			enabled: false
		},
		credits: {
			enabled: false
		},	
		series: [{
			type: 'pie',
			innerSize: '142%',
			data: [
					['',   Math.round(forecast.temperature)],
					['',   110 - Math.round(forecast.temperature)]
			]
		}]
	});
}
function piePressure(chartName, forecast) {
	var pressure = Array();
	pressure.push(forecast.pressure);
	var chart = new Highcharts.Chart({
		chart: {
			renderTo: chartName,
			type: 'pie'
		},	    
		plotOptions: {
			pie: {
				colors: ['#00B000', '#FF0103'],
				startAngle: -180,
				endAngle: 180,
				size: 140,
				center: ['50%', '50%'],
				borderColor: 'transparent',
				dataLabels: {
					enabled: false,
				}
			}
		},
		title: {
				text: ''+Math.round(forecast.pressure)+'hPa<br />'+Math.round(forecast.pressure / 33.8653)+'inHg',
				align: 'center',
				verticalAlign: 'middle',
				y: -2
		},
		tooltip: {
			enabled: false
		},
		credits: {
			enabled: false
		},	
		//min: 945, max: 1055
		series: [{
			type: 'pie',
			innerSize: '142%',
			data: [
					['',   (Math.round(forecast.pressure) - 945)],
					['',   110 - (Math.round(forecast.pressure) - 945)]
			]
		}]
	});
}
function pieRiseSet(chartName, forecast, daily) {
	//Convert Unix forcast.time to 24hour time
	var fTime = new Date(forecast.time * 1000).toTimeString().replace(/(\d+.\d+).*/, "$1").replace(":","");
	//Get unix timestamp for today @ 00:00:00
	var fUnix = new Date();
	var unixMin = Math.round(new Date(fUnix.getFullYear(),fUnix.getMonth(),fUnix.getDate(),0,0,0,0).getTime() / 1000);
	var unixMax = unixMin + 86400;  //Add one day's seconds
	//Get Sunrise for today
	var fRise = new Date(daily[1]['sunriseTime'] * 1000).toTimeString().replace(/(\d+.\d+).*/, "$1").replace(":","");
	//Get Sunset for today
	var fSet = new Date(daily[1]['sunsetTime'] * 1000).toTimeString().replace(/(\d+.\d+).*/, "$1").replace(":","");
	//Get Unix now from forecast
	var useTime = Array();
	if(forecast.time < unixMin) {
		useTime.push(unixMin);
	}else if(forecast.time > unixMax){
		useTime.push(unixMax);
	}else{
		useTime.push(forecast.time);
	}
	var chart = new Highcharts.Chart({
		chart: {
			renderTo: chartName,
			type: 'pie'
		},	    
		plotOptions: {
			pie: {
				colors: [timeColor, '#FFFF0E', '#999966', timeColor],
				startAngle: -180,
				endAngle: 180,
				size: 140,
				center: ['50%', '50%'],
				borderColor: 'transparent',
				dataLabels: {
					enabled: false,
				}
			}
		},
		title: {
				text: 'Rise: '+fRise+'<br />Now: '+fTime+'<br />Sets: '+fSet+'',
				align: 'center',
				verticalAlign: 'middle',
				y: -10
		},
		tooltip: {
			enabled: false
		},
		credits: {
			enabled: false
		},	
		series: [{
			type: 'pie',
			innerSize: '142%',
			data: [
					['',   Math.round(fRise)],
					['',   Math.round(fTime) - Math.round(fRise)],
					['',   Math.round(fSet) - Math.round(fTime)],
					['',   2400 - Math.round(fSet)]
			]
		}]
	});
}
function plotTemperature(chartName, forecast, daily) {
	var tmp = new Array();
	for(var i = 0; i <  forecast.length; i ++){
		tmp.push([
			milliSeconds(fixTimezone(forecast[i].time)),
			forecast[i].temperature
		]);
	}
	chart = new Highcharts.Chart({
		chart: {
			renderTo: chartName,
			type: 'area',
		},
		credits: {
			enabled: false
		},
		title: {
			text: null
		},
		xAxis: {
			type: 'datetime',
			tickInterval: 24 * 3600 * 1000,
			labels: {
				formatter: function() {
					return Highcharts.dateFormat('%a<br />%b %e', this.value);
				}
			},
			plotLines: stripeNow(),
		},
		yAxis: {
			title: {
				text: null,
				style: {
					color: '#333'
				}
			},
		},
		plotOptions: {
			series: {
				threshold: 32,
			}
		},
		series: [{
			showInLegend: false,
			name: 'Temperature',
			data: tmp,
			color: '#FF3333',
			negativeColor: '#0076E2',
			tooltip: {
				valueSuffix: '°F'
			},
			fillOpacity: 0.2
		}]
	});
}
function plotWindSpeed(chartName, forecast, daily) {
	var wind = new Array();
	for(var i = 0; i <  forecast.length; i ++){
		wind.push([
				milliSeconds(fixTimezone(forecast[i].time)),
				forecast[i].windSpeed
			]);
	}
	chart = new Highcharts.Chart({
		chart: {
			renderTo: chartName,
			type: 'area',
		},
		credits: {
			enabled: false
		},
		title: {
			text: null
		},
		xAxis: {
			type: 'datetime',
			tickInterval: 24 * 3600 * 1000,
			labels: {
				formatter: function() {
					return Highcharts.dateFormat('%a<br />%b %e', this.value);
				}
			},
			plotLines: stripeNow(),
		},
		yAxis: [{
			title: {
				text: null
			}
		}],
		series: [{
			showInLegend: false,
			name: 'Wind Speed',
			data: wind,
			color: '#EB662A',
			tooltip: {
				valueSuffix: 'mph'
			},
			fillOpacity: 0.2
		}]
	});
}
function plotPressure(chartName, forecast, current, daily) {
	var tmp = new Array();
	var threshold = current.pressure;

	for(var i = 0; i <  forecast.length; i ++){
		tmp.push([
			milliSeconds(fixTimezone(forecast[i].time)),
			forecast[i].pressure
		]);
	}

	chart = new Highcharts.Chart({
		chart: {
			renderTo: chartName,
			type: 'area',
		},
		credits: {
			enabled: false
		},
		title: {
			text: null
		},
		xAxis: {
			type: 'datetime',
			tickInterval: 24 * 3600 * 1000,
			labels: {
				formatter: function() {
					return Highcharts.dateFormat('%a<br />%b %e', this.value);
				},
			},
			plotLines: stripeNow(),
		},
		yAxis: {
			title: {
				text: null
			}
		},
		plotOptions: {
			series: {
				threshold: threshold,
			}
		},
		series: [{
			showInLegend: false,
			name: 'Pressure',
			data: tmp,
			color: '#00B000',
			negativeColor: '#B00000',
			tooltip: {
				valueSuffix: ' hPa'
			},
			fillOpacity: 0.2
		}]
	});
}
function plotRain(chartName, forecast, daily) {
	var precip = new Array();
	var cloud = new Array();

	for(var i = 0; i <  forecast.length; i ++){
		if(typeof forecast[i].precipProbability != 'undefined') {
			if(forecast[i].temperature < 32) {
				precip.push({
					x: milliSeconds(fixTimezone(forecast[i].time)),
					y: Math.round(forecast[i].precipProbability * 100),
					color: 'white',
					borderColor: '#A8C4FF'
				});
			}
			else {
				precip.push([
					milliSeconds(fixTimezone(forecast[i].time)),
					Math.round(forecast[i].precipProbability * 100)
				]);
			}
		}
		else {
			precip.push([
				milliSeconds(fixTimezone(forecast[i].time)),
				0
			]);
		}
		if(typeof forecast[i].cloudCover != 'undefined')
			cloud.push([
				milliSeconds(fixTimezone(forecast[i].time)),
				Math.floor(forecast[i].cloudCover*100)
			]);
		else
			cloud.push([
				milliSeconds(fixTimezone(forecast[i].time)),
				Math.floor(0)
			]);
	}
	chart = new Highcharts.Chart({
		chart: {
			renderTo: chartName,
			type: 'area',
		},
		credits: {
			enabled: false
		},
		title: {
			text: null
		},
		xAxis: {
			type: 'datetime',
			tickInterval: 24 * 3600 * 1000,
			labels: {
				formatter: function() {
					return Highcharts.dateFormat('%a<br />%b %e', this.value);
				}
			},
			plotLines: stripeNow(),
		},
		yAxis: [
			{
				min: 0,
				max: 100,
				title: {
					text: null
				}
			},{
				opposite: true,
				min: 0,
				max: 100,
				title: {
					text: null
				}
			}
		],
		tooltip: {
			shared: true
		},
		series: [
			{
				showInLegend: false,
				name: 'Cloud Cover',
				yAxis: 1,
				data: cloud,
				color: '#808080',
				tooltip: {
					valueSuffix: '%'
				},
				fillOpacity: 0.2
			},
			{
				showInLegend: false,
				name: 'Precipitation',
				type: 'column',
				pointWidth: 4,
				yAxis: 0,
				data: precip,
				tooltip: {
					valueSuffix: '%'
				},
				color: '#4D759E'
			}
		]
	});
}
function placeDate(chartName) {
	var date = new Date();
	if (oset > 0) {
		date.setDate(date.getDate() + oset);
	  	$('#' + chartName).html(date.toLocaleString());
	}else{
	  	$('#' + chartName).html(date.toLocaleString());
	}
}
function stripeNow() {
	return Array({
		color: 'rgba(0, 0, 255, .8)',
		width: 1,
		value: Math.round((new Date()).getTime() - 12960000)
	});
}
function milliSeconds(timestamp) {
	return 1000 * timestamp;
}
function fixTimezone(timestamp) {
	return timestamp - (new Date().getTimezoneOffset()*60);
}