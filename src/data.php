<?php
//Haal de data op
$DataJSON = $_REQUEST['answerData'];
$antwoorden = json_decode($DataJSON, true);

//Maak een unieke filename
$uniquestring = uniqid("data");
$filename = "./gurudata/". $uniquestring . ".txt";

//Open de file name en schrijf
$fh = fopen($filename, "w");
fwrite($fh, $DataJSON);
fclose($fh);
?>