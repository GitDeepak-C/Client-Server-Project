<?php
    header("Content-type:application/json;charset=utf-8");
    require ("libreria.php");
	
	_checkSession("cUser");
    	
	// 1. connessione
    $con=_connection("elencocase");
	
	// 2. Lettura parametri 
	$id = $_SESSION["cUser"];
	
	// 3. Query
    $sql="select username from user where username = $id;";
	$user = _eseguiQuery($con, $sql);
	/*$sql = "SELECT filiali.cFiliale, filiali.Nome FROM conti, filiali WHERE conti.cFiliale = filiali.cFiliale AND conti.cCorrentista = $id;";
    $data = _eseguiQuery($con, $sql);*/
	
	// $user è un vettore enumerativo del tipo [{"nome":"rossi"}, etc] contenente però un slo record
	//$data = array("name"=>$user[0]["nome"], "data"=>$data);
	echo json_encode($user);
    
	// 4. close
    $con->close();
?>