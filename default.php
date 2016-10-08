<?php
extract($_GET);
//Set Defaults
if (($v) && ($v != "l")) $v = "";
$timeColor = ($v) ?  "EEE" : "222";
$bgcolor = ($v) ?  "FFF" : "000";
$color = ($v) ?  "B4B4B4" : "ABABAB";
$IOcolor = ($v) ?  "333333" : "ABABAB";
if (!$Lat) $Lat = "39.0877";
if (!$Lng) $Lng = "-74.8413";
if (!$WUarea) $WUarea = "Cape May Court House, NJ";
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<link href="images/favicon-152.png" media="(device-width: 320px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
<link rel="apple-touch-icon" href="images/favicon-152.png" />
<title>Weather Forecast</title>
<link href="css/WeatherStationNew.css" rel="stylesheet" />
<?php If ($v) { ?><link href="css/light.css" rel="stylesheet" /><?php } ?>
<link href="css/WeatherStationMedia.css" rel="stylesheet" />
<link rel="icon" sizes="32x32" href="images/favicon-152.png" />
</head>
<body>
	<div id="weatherwrap">
		<div id="graphs">
			<div class="row">
				<div id="ForecastIO"><div id="loading"><canvas id="icon-loading" width="150" height="150"></canvas><br /><br />Loading...</div></div>
			</div>			
			<div class="row span12">
				<div class="title">Precip &amp; Cloud Cover</div>
				<div id="chart-rain" class="widget"></div>
			</div>	
			<div class="row span12">
				<div class="title">Temps</div>
				<div id="chart-temp" class="widget"></div>
			</div>
			<div class="row span12">
				<div class="title">Winds</div>
				<div id="chart-wind" class="widget"></div>
			</div>
			<div class="row span12">
				<div class="title">Pressure</div>
				<div id="chart-pressure" class="widget"></div>
			</div>
		</div>
		<div id="gauges">
			<div class="padtop"></div>
			<div class="row span5">
				<div class="title">&nbsp;</div>
				<div id="pie-riseset" class="gauge"></div>
			</div>
			<div class="row span5">
				<div class="map gauge">
					<div id="map-rain"></div>
				</div>			
			</div>
			<div class="row span5">
				<div class="title">&nbsp;</div>
				<div id="pie-temperature" class="gauge"></div>
			</div>
			<div class="row span5">
				<div class="map gauge">
					<div id="map-lightning"></div>
				</div>
			</div>
			<div class="row span5">
				<div class="title">&nbsp;</div>
				<div id="pie-pressure" class="gauge"></div>
			</div>
		</div>
		<div class="row clear">
			<div id="footer"><a href="https://darksky.net/poweredby/">Powered by Dark Sky</a> | <span id="dateW"></span> | Switch to: <a href="/<?php if ($v) { ?>">Dark<?php }else{ ?>?v=l">Light<?php } ?> Theme</a></div>
		</div>
	</div>
	<div id="ecobeewrap">
		<h1 class="Owhite">Weather</h1>
		<hr />
		<div class="datawrap">
			<div id="currArea" class="Owhite"><span id="loading2">Loading...</span></div>
			<div class="Ogray"><a id="dm" href="#">&lt;</a>&nbsp;<span id="dateE"></span>&nbsp;<a id="dp" href="#">&gt;</a></div>
			<canvas id="icon-image" class="left" width="260" height="260"></canvas>
			<div id="current-temp" class="left Owhite"></div>
			<div id="current-conditions" class="clear Owhite"></div>
			<div class="left Ogray">
				POP&nbsp;<span id="current-precip"></span>%&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				HUM.&nbsp;<span id="current-humid"></span>%
			</div>
			<div class="right Ogray">
				<span id="current-high"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<span id="current-low"></span>
			</div>
			<div class="clear"></div>
		</div>
		<hr />
		<div class="datawrap Ogray">
			<div class="fcast left">Morning</div><canvas id="icon-morning" class="left" width="22" height="22"></canvas><div id="temp-morning" class="Owhite tcast right"></div>
			<div class="clear fcast left">Midday</div><canvas id="icon-midday" class="left" width="22" height="22"></canvas><div id="temp-midday" class="Owhite tcast right"></div>
			<div class="clear fcast left">Afternoon</div><canvas id="icon-afternoon" class="left" width="22" height="22"></canvas><div id="temp-afternoon" class="Owhite tcast right"></div>
			<div class="clear fcast left">Evening</div><canvas id="icon-evening" class="left" width="22" height="22"></canvas><div id="temp-evening" class="Owhite tcast right"></div>
			<div class="clear fcast left">Overnight</div><canvas id="icon-overnight" class="left" width="22" height="22"></canvas><div id="temp-overnight" class="Owhite tcast right"></div>
		</div>
		<div id="footer2" class="clear Ogray"><br />Powered by: <a href="https://darksky.net/poweredby/">Powered by Dark Sky</a> | Inspired by <a href="http://ecobee.com">ecobee<sub>3</sub></a></div>
	</div>
</body>
<script type="text/javascript" src="js/jquery-2.1.1.min.js"></script>
<script type="text/javascript" src="js/highcharts.js"></script>
<script type="text/javascript" src="js/highcharts-more.js"></script>
<script type="text/javascript" src="js/solid-gauge.src.js"></script>
<script type="text/javascript" src="js/skycons.js"></script>
<script type="text/javascript" src="js/WeatherStationNew.js"></script>
<script>
	//** Default variables ********************************************
	var timeColor = '#<?php echo $timeColor; ?>';
	var color = '<?php echo $color; ?>';
	var IOcolor = '<?php echo $IOcolor; ?>';
	var Lat = '<?php echo $Lat; ?>';
	var Lng = '<?php echo $Lng; ?>';
	var WUarea = '<?php echo $WUarea; ?>';
	var v = '<?php echo $v; ?>';
	var oset = 0;
	//** Loading Skycon ********************************************
	var skyconsL = new Skycons({"color": "#" + color});
	skyconsL.add("icon-loading", "clear-day");
	skyconsL.play();
	//** Weather theme for Highcharts JS ********************************************
	Highcharts.theme={chart:{backgroundColor:'#<?php echo $bgcolor; ?>'},title:{style:{color:"#"+IOcolor,fontFamily:"Helvetica"}},xAxis:{gridLineWidth:1,lineColor:"#"+color,tickColor:"#"+color,labels:{style:{color:"#"+color}}},yAxis:{gridLineColor:"#"+color,labels:{style:{color:"#"+color}}},plotOptions:{area:{marker:{enabled:false}},series:{lineWidth:1}},labels:{style:{color:"#"+color}}}
	var highchartsOptions = Highcharts.setOptions(Highcharts.theme);
$(document).ready(function () {
	//** Load the Data ********************************************
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(success, error);
		var refreshIntervalId = setInterval(function(){
			navigator.geolocation.getCurrentPosition(success, error);
		}, 600000);
	} else {
		error();
	}
	$("#dp").click(function() {
		if(oset < 6) {
			oset++;
			$("#dm").show();
			renderData(hourlyspan, forecastdata, current, dailyspan);
			if(oset == 6) {
				$("#dp").hide();
			}
		}
		return false;
	});
	$("#dm").click(function() {
		if(oset > -1) {
			oset--;
			$("#dp").show();
			renderData(hourlyspan, forecastdata, current, dailyspan);
			if(oset == 0) {
				$("#dm").hide();
			}
		}
		return false;
	});
});
</script>
</html>