"use strict"

$(document).ready(function() {
	//sticky navbar
	$("#banner").addClass("shrink");

	initProprieties();

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
			}
		});
	}
	
});