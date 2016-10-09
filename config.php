<?php
$apikey = '{YourDarkSkyAPIKey}';
if (($v) && ($v != "l")) $v = "";
$timeColor = ($v) ?  "EEE" : "222";
$bgcolor = ($v) ?  "FFF" : "000";
$color = ($v) ?  "B4B4B4" : "ABABAB";
$IOcolor = ($v) ?  "333333" : "ABABAB";
if (!$Lat) $Lat = "{Default_Lat}";
if (!$Lng) $Lng = "{Default_Lon}";
if (!$WUarea) $WUarea = "{Your Town, State}";
?>
