<?php
	header("Content-type:application/json;charset=utf-8");
	require ("libreria.php");
	mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
	
	if($_SERVER["REQUEST_METHOD"] == "POST"){
		// 1. controllo parametri
		if(!isset($_POST["tipo"])){
			http_response_code(400);
			die("parametro mancante: tipo");
		}	
		// 2. connessione
		$con = _connection("elencocase");
		$tipo = $con->real_escape_string($_POST["tipo"]);
		
		// 3. query
		$sql = "select * from proprieta where Tipo='$tipo'";
		$data= _eseguiQuery($con, $sql);
		if(count($data)==0){
			http_response_code(401);
			die("Proprieta non trovata");
		}
		// 4. creazione session e restituzione risultato
		else{
			echo(json_encode($data));			
		}
		// 5. close
		$con->close();		
	}
?>