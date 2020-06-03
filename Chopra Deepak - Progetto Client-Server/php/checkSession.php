<?php
    header("Content-type:application/json;charset=utf-8");
    require ("libreria.php");
	
	_checkSession("cUser");
    	
	// 1. connessione
    $con=_connection("elencocase");
	
	// 2. Lettura parametri 
	$id = $_SESSION["cUser"];
	
	// 3. Query
    $sql ="select * from user where cUser = $id;";
	$data = _eseguiQuery($con, $sql);
	
	echo (json_encode($data));
    
	// 4. close
    $con->close();
?>