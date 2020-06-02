<?php
	
	session_start();
	session_unset();     
	session_destroy(); 
	
	setcookie(session_name(), "", -1, "/");
	
	// Se il servizio non invia una risposta, $.ajax() va in errore e passa dal fail
	$data = array("ok"=>true);
	echo json_encode($data);
?>