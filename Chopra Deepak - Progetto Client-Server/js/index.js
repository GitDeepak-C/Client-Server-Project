"use strict"

$(document).ready(function() {
	//sticky navbar
	$("#banner").addClass("shrink");

	initProprieties();
	let rq = inviaRichiesta("GET", "php/checkSession.php");
	rq.done(function(user){
		console.log(user);
	});

	function initMap(){
		let location = {lat: 45.068371, lng: 7.683070};
		let map = new google.maps.Map(document.getElementById("map"), {
			zoom: 4,
			center: location
		});
	}

	function initProprieties(){
		let _rq = inviaRichiesta("GET", "php/index.php" );
		_rq.fail(error);
		_rq.done(function (data) {
			console.log(data);
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
				_acquista.addClass("btnAcquista").appendTo(_desc);
				_info.appendTo(_card);
			}
		});
	}

	$("#btnLogout").on("click", function(){
		let _richiestaLogout = inviaRichiesta("POST", "../php/logout.php");		
		_richiestaLogout.fail(error);
		_richiestaLogout.done(function (data) { 
			if (data["ok"]==true){
				/*alert("Sei stato disconnesso correttamente");	
			    window.location.href="login.html";*/
			}
		});
	})
	
});