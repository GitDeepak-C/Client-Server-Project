<?php
    header("Content-type:application/json;charset=utf-8");
    require ("libreria.php");
	
	if($_SERVER["REQUEST_METHOD"] == "POST"){
		// 1. controllo parametri
		if(!isset($_POST["username"])){
			http_response_code(400);
			die("parametro mancante: username");
		}
		if(!isset($_POST["password"])){
			http_response_code(400);
			die("parametro mancante: password");
		}	
		// 2. connessione
		$con = _connection("elencocase");
		$user = $con->real_escape_string($_POST["username"]);
		$password = $con->real_escape_string($_POST["password"]);
		
		// 3. query
		$sql = "select * from user where username='$user'";
		$data= _eseguiQuery($con, $sql);
		if(count($data)==0){
			http_response_code(401);
			die("Credenziali non valide");
		}
		else if($data[0]['password']!= $password){
			http_response_code(401);
			die("Credenziali non valide");
		}
		// 4. creazione session e restituzione risultato
		else{
			session_start();
			echo(json_encode($data));
			$_SESSION["cUser"]=$data[0]['cUser'];
			$_SESSION["scadenza"] = time() + SCADENZA;
			setcookie(session_name(), session_id(), time() + SCADENZA, "/");

			//header("location:index.html");
			//echo(json_encode({"ris":"ok"}))
			//echo(json_encode(array("ris"=>"ok")));			
		}
		// 5. close
		$con->close();		
	}
	
?>