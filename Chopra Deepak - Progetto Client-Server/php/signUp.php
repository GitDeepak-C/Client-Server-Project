<?php
    header("Content-type:application/json;charset=utf-8");
    require ("libreria.php");

	if($_SERVER["REQUEST_METHOD"] == "POST"){
		// 1. controllo parametri
		if(!isset($_POST["username"])){
			http_response_code(400);
			die("parametro mancante: username");
		}
		if(!isset($_POST["name"])){
			http_response_code(400);
			die("parametro mancante: name");
		}
		if(!isset($_POST["surname"])){
			http_response_code(400);
			die("parametro mancante: surname");
		}
		if(!isset($_POST["password"])){
			http_response_code(400);
			die("parametro mancante: password");
		}

		// 2. connessione
		$con = _connection("elencocase");
		$user = $con->real_escape_string($_POST["username"]);
		$name = $con->real_escape_string($_POST["name"]);
		$surname = $con->real_escape_string($_POST["surname"]);
		$password = $con->real_escape_string($_POST["password"]);

		//3. query
		$sql = "INSERT INTO `user` (`username`, `nome`, `cognome`, `password`) VALUES ('$user', '$name', '$surname', '$password');";
		$data= _eseguiQuery($con, $sql);
		// 4. creazione session e restituzione risultato
		session_start();
		echo(json_encode($data));
		$_SESSION["username"]= $data[0]["username"];
		$_SESSION["scadenza"] = time() + SCADENZA;
		setcookie(session_name(), session_id(), time() + SCADENZA, "/");
		//echo(json_encode(array("ris"=>"ok")));
	}
	//close
	$con->close();
?>