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
		$con = _connection("4b_banche");
		$user = $con->real_escape_string($_POST["username"]);
		$password = $con->real_escape_string($_POST["password"]);
		
		// 3. query
		$sql = "select * from correntisti where Nome='$user'";
		$data= _eseguiQuery($con, $sql);
		if(count($data)==0){
			http_response_code(401);
			die("username non valido");
		}
		else if($data[0]['Pwd']!= $password){
			http_response_code(401);
			die("password non valido");
		}
		// 4. creazione session e restituzione risultato
		else{
			session_start();
			$_SESSION["cCorrentista"]=$data[0]['cCorrentista'];
			$_SESSION["scadenza"] = time() + SCADENZA;
			setcookie(session_name(), session_id(), time()+SCADENZA, "/");
			//echo(json_encode({"ris":"ok"}))
			echo(json_encode(array("ris"=>"ok")));			
		}
		// 5. close
		$con->close();		
	}
	
?>