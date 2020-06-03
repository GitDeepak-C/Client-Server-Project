<?php
    header("Content-type:application/json;charset=utf-8");
    require ("libreria.php");

	if($_SERVER["REQUEST_METHOD"] == "POST"){
		// 1. controllo parametri
		if(!isset($_POST["username"])){
			http_response_code(400);
			die("parametro mancante: username");
		}
		if(!isset($_POST["nome"])){
			http_response_code(400);
			die("parametro mancante: nome");
		}
		if(!isset($_POST["cognome"])){
			http_response_code(400);
			die("parametro mancante: cognome");
		}
		if(!isset($_POST["indirizzo"])){
			http_response_code(400);
			die("parametro mancante: indirizzo");
		}
		if(!isset($_POST["idProp"])){
			http_response_code(400);
			die("parametro mancante: idProprieta");
		}

		// 2. connessione
		$con = _connection("elencocase");
		$username = $con->real_escape_string($_POST["username"]);
		$nome = $con->real_escape_string($_POST["nome"]);
		$cognome = $con->real_escape_string($_POST["cognome"]);
		$indirizzo = $con->real_escape_string($_POST["indirizzo"]);
		$idProp = $con->real_escape_string($_POST["idProp"]);

		//3. query
		$sql = "INSERT INTO `vendite` (`username`, `Nome`, `Cognome`, `Indirizzo`, `idProprieta`) VALUES ('$username', '$nome', '$cognome', '$indirizzo', $idProp);";
		$data= _eseguiQuery($con, $sql);

		echo(json_encode($data));
	}
	//close
	$con->close();
?>