"use strict"

$(document).ready(function() {
	//sticky navbar
	$("#banner").addClass("shrink");

	let isLogged = false,
		datiUtente;
	$("#userLog").hide();
	$("#logOut").hide();
	$("#btnCancelP").hide();
	$("#logOut").on("click", function(){
		logOut();
	});

	//caricamento proprieta
	initProprieties();

	///evento al check dei radio button
	$('input:radio[name="chk"]').change(
		function(){
			let r;
			if (this.checked && this.value == 'All') {
				$("#sectionHome").html("");
				initProprieties();
			}
			else if(this.checked)
			{
				$("#sectionHome").html("");
				r = inviaRichiesta("POST", "php/returnDataTipo.php", {"tipo": this.value});
				r.done(function(data){
					showProperties(data);
				});
			}
	});

	//controllo se l'utente si è loggato
	let checkLogin = inviaRichiesta("POST", "php/checkSession.php");
	checkLogin.done(function(data){
		if(data.length > 0){
			$("#noLog").hide();
			$("#userLog").html('<i class="fa fa-user"></i> ' + data[0]["username"]);
			$("#userLog").show();
			$("#logOut").show();
			if(data[0]["username"] == "admin"){
				$("#btnCancelP").show();
				$("#btnCancelP").on("click", function(){
					cancellaPrenotazioni();
				});
			}
			isLogged = true;
			datiUtente = data;
		}
	});

	//inizializzazione della mappa
	function initMap(){
		let location = {lat: 45.068371, lng: 7.683070};
		let map = new google.maps.Map(document.getElementById("map"), {
			zoom: 4,
			center: location
		});
	}

	//inizializzazione delle proprieta
	function initProprieties(){
		let _rq = inviaRichiesta("GET", "php/index.php" );
		_rq.fail(error);
		_rq.done(function (data) {
			//console.log(data);
			showProperties(data);
		});
	}

	//caricamento delle proprieta
	function showProperties(data){
		for (let proprieta of data) {
			let _card = $("<div>"), 
				_cardImg = $("<div>");
			_card.addClass("card");
			_cardImg.addClass("cardImg");
			_cardImg.css({
				background: 'url(images/imgProprieta/' + proprieta["idProprieta"] + '.jpg)', 
			}).appendTo(_card);
			_card.appendTo("#sectionHome");
			let _info = $("<div>").addClass("info"),
				_title = $("<div>"),
				_prezzo = $("<div>"),
				_desc = $("<div>"),
				_acquista = $("<button>Acquista</button>");
			_title.html(proprieta["Tipo"] + ", " + proprieta["Piano"]).appendTo(_info);
			_prezzo.html(parseFloat(proprieta["Prezzo"]).toLocaleString() + " €").appendTo(_info);
			_prezzo.css({
				"font-size": "20pt",
			});
			_desc.html(proprieta["Indirizzo"]).appendTo(_info);
			_acquista.attr("idProp", proprieta["idProprieta"]);
			if(parseInt(proprieta["Acquistata"]) == 1){
				_acquista.addClass("btnPrenotato").appendTo(_desc);
				_acquista.html("Prenotato");
				cercaUser(proprieta["idProprieta"], _acquista);
			}
			else{
				_acquista.addClass("btnAcquista").appendTo(_desc);
				_acquista.on("click", function(){
					controllaProprieta(this);
				});
			}
			_info.appendTo(_card);
		}
	}

	//funzione che controlla se l'utente è loggato ed eventualmente procede all'acquisto
	function controllaProprieta(sender){
		if(isLogged){
			if(datiUtente[0]["username"] != "admin"){
				let idProp = $(sender).attr("idProp");
				console.log(idProp);
				let rqCerca = inviaRichiesta("POST", "php/returnProprieta.php", { "idProp":idProp.toString() });
				rqCerca.fail(function(jqXHR, test_status, str_error){
					error(jqXHR, test_status, str_error);
				});
				rqCerca.done(function(data){
					console.log(data);
					acquistaProprieta(data);
					aggiornaTabelProprieta(data);
					$(sender).removeClass("btnAcquista");
					$(sender).addClass("btnPrenotato");
					$(sender).html("Prenotato");
					$(sender).attr("title", "Prenotato da: " + datiUtente[0]["nome"] + " " + datiUtente[0]["cognome"]);
					$(sender).unbind( "click" );
				});
			}
			else
				alert("Guarda che sei l'admin del sito!!");
		}
		else{
			alert("Per poter prenotare devi essere loggato");
		}
	}

	//funzione per cercare l'utente a cui e prenotata la proprieta dalla tabella vendite
	function cercaUser(id, btn){
		let rqCerca = inviaRichiesta("POST", "php/cercaUser.php", { "idProp": id.toString() });
		rqCerca.fail(function(jqXHR, test_status, str_error){
			error(jqXHR, test_status, str_error);
		});
		rqCerca.done(function(data){
			console.log(data);
			btn.attr("title", "Prenotato da: " + data[0]["Nome"] + " " + data[0]["Cognome"]);
		});
	}

	//funzione che mediante la chiamata ajax va ad aggiornare la tabella vendite all'acquisto
	function acquistaProprieta(data){
		let rqAcquista = inviaRichiesta("POST", "php/acquistaProprieta.php", { "username": datiUtente[0]["username"], "nome": datiUtente[0]["nome"], "cognome": datiUtente[0]["cognome"], "indirizzo": data[0]["Indirizzo"], "idProp": data[0]["idProprieta"]});
		rqAcquista.fail(function(jqXHR, test_status, str_error){
			error(jqXHR, test_status, str_error);
		});
		rqAcquista.done(function(data){
			console.log(data);
		});
	}

	//funzione che aggiorna il campo acquistata della tabella contenente le proprieta
	function aggiornaTabelProprieta(data){
		let rqUpdate = inviaRichiesta("POST", "php/updateProprieta.php", { "idProp": data[0]["idProprieta"]});
		rqUpdate.fail(function(jqXHR, test_status, str_error){
			error(jqXHR, test_status, str_error);
		});
		rqUpdate.done(function(data){
			//alert(data);
		});
	}

	//funzione che disconette l'utente
	function logOut(){
		let _richiestaLogout = inviaRichiesta("POST", "php/logout.php");		
		_richiestaLogout.fail(error);
		_richiestaLogout.done(function (data) { 
			if (data["ok"]==true){
				$("#userLog").hide();
				$("#logOut").hide();
				$("#noLog").show();
				$("#btnCancelP").hide();
				datiUtente = null;
				isLogged = false;
			}
		});
	};

	//funzione che cancella le prenotazioni rendendo possibile nuovamente l'acquisto delle proprieta
	function cancellaPrenotazioni(){
		let rqDelete = inviaRichiesta("GET", "php/deletePrenotation.php");
		rqDelete.done(function(){
			alert("All prenotations deleted");
			$("#sectionHome").html("");
			initProprieties();
		});
	}
	
});