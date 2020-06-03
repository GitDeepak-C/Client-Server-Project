<?php
	header("Content-type:application/json;charset=utf-8");
	require ("libreria.php");
	mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
	
	$con = _connection("elencocase");
		

	$sql = "TRUNCATE TABLE vendite";
	$data= _eseguiQuery($con, $sql);

	$sql = "update proprieta set Acquistata=0";
	$data = _eseguiQuery($con, $sql);

	$con->close();		
?>