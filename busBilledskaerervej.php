<?php
//ini_set('display_errors', 1);
date_default_timezone_set("Europe/Copenhagen");
$date = date("d.m.Y");
$time = date("H:i");
$json = file_get_contents("http://xmlopen.rejseplanen.dk/bin/rest.exe/departureBoard?id=461810500&date=$date&time=$time&useTog=0&format=json");
// http://xmlopen.rejseplanen.dk/bin/rest.exe/departureBoard?id=461810500&date=23-06-2023&time=14:00&useTog=0&format=json
header('Content-type: application/json');
echo $json;