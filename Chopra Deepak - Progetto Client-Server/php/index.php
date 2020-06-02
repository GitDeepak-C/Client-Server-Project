<?php
	header("Content-type:application/json;charset=utf-8");
	require ("libreria.php");
	mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
	
	try
    {
		//connessione
		$con = _connection("elencocase");
			
		//query
		$sql = "select * from proprieta";
		$data = _eseguiQuery($con, $sql);

		echo json_encode($data);
    	$con->close();
	}
	catch (mysqli_sql_exception $ex)
    {
        die ("Errore connessione db: <br>" . $ex->getMessage());
    }
?>