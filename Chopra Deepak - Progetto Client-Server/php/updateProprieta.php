<?php
	header("Content-type:application/json;charset=utf-8");
	require ("libreria.php");
	mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
	
	
	if($_SERVER["REQUEST_METHOD"] == "POST"){
		// 1. controllo parametri
		if(!isset($_POST["idProp"])){
			http_response_code(400);
			die("parametro mancante: idProp");
		}	
		// 2. connessione
		$con = _connection("elencocase");
		$idProp = $con->real_escape_string($_POST["idProp"]);
		
		// 3. query
		$sql = "update proprieta set Acquistata=1 where idProprieta=$idProp";
		// 5. close
		$con->close();
		
		echo(json_encode($idProp));
	}
?>