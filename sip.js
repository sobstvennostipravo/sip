/*jslint browser:true */
/*global $, jQuery, alert*/

// var apiRoot = 'http://80.93.182.80:8008/';
var apiRoot = 'http://127.0.0.1:8008/';
var stageApi = {};

// $( "#button" ).button();
$( "#plus_sign" ).click(function(e) {
		console.log("pressed");
		e.preventDefault();
		$( "#pay_docs" ).append( '<br><input name="file[]" type="file" />"</br>' );

});

// $('#plus-gign').next('.ui-input-clear').bind('vclick',function(){});


// Use a named immediately-invoked function expression.
function retriever(current_state) {
		console.log("retriever top");

		justNext()

		// if (current_state != new_state) {
		// 		console.log("new state");
		// 		$("#ap_6").insertAfter('<div  class="fla collform"><p>Исполнение контракта на странной стадии.</p></div>');
		// }
    setTimeout(retriever, 5000);
};

function switchState(d){
		console.log(d);

		switch(d.st) {
		case 1:
				break;
		case 2:
				$('#token_price').html(d.token_price);
				$('#ether_price').html(d.ether_price);
				$('#pravo_tokens').html(d.pravo_tokens);
				$('#root_contract').html(d.root_contract);
				$('#needed_tokens').html(d.needed_tokens);
				$('#ether_to_pay').html(d.ether_to_pay);

				break;
		case 3:
				break;
		case 4:
				break;
		case 5:
				$('#contract_number').html(d.contract_number);
				break;
		case 6:
				retriever(6);
				break;
		default:
				console.log("unknown stage received from API");
				break;
		}

		var id = "#ap_" + d.st;
		$(".ghost").not(id).hide('slow');
		$(id).show('slow');

		if (d.st > 6 && $(id).size() == 0) {
				console.log("new state");
				var new_div = '<div class="fla collform" id="' + "ap_" + d.st + '"><p>Исполнение контракта на странной стадии.</p></div>';
				console.log(new_div);
				$("#auto_processing").append(new_div);
		}
}

function justNext(){
		console.log("justNext");
		$.ajax({
				url: apiRoot + "api/v1/wallet/SOBSTVENNOSTIPRAVO",
				type: 'POST',
				dataType: 'json',
				cache: false,
				processData: true,
				xhrFields: {
						withCredentials: true
				},
				success: function(d){
						console.log(d); //will alert ok
						switchState(d);
				},
				error: function(d){
						console.log(d); //will alert ok
				},
		});
}


var myRootEl = document.getElementById('automation_button');
myRootEl.addEventListener('click', function() {
		$('#auto_processing').toggle('slow')
		console.log("toop of script");
		$.ajax({
				url: apiRoot + "api/v1/wallet/SOBSTVENNOSTIPRAVO",
				type: 'GET',
				cache: false,
				contentType: false,
				processData: false,
				xhrFields: {
						withCredentials: true
				},
				success: switchState
		});
}, false);



var ap1ButtonEl = document.getElementById('ap_1_button');
ap1ButtonEl.addEventListener('click', function() {
		console.log("top ap1Button script");
		jss = JSON.stringify({'st':2, 'wallet': $('#walletField').val()});
		console.log(jss);
		$.ajax({
				url: apiRoot + "api/v1/wallet/SOBSTVENNOSTIPRAVO",
				type: 'POST',
				data: jss,
				dataType: 'json',
				cache: false,
				processData: true,
				contentType: 'application/json',
				xhrFields: {
						withCredentials: true
				},
				success: function(d){
						console.log(d); //will alert ok
						switchState(d);
				},
				error: function(d){
						console.log(d); //will alert ok
				},
		});
}, false);

var ap2ButtonEl = document.getElementById('ap_2_button');
// ap2ButtonEl.addEventListener('click', function() {
// 		console.log("top ap2Button script");
// 		jss = JSON.stringify({'st':3});
// 		console.log(jss);
// 		$.ajax({
// 				url: apiRoot + "api/v1/wallet/SOBSTVENNOSTIPRAVO",
// 				type: 'POST',
// 				data: jss,
// 				dataType: 'json',
// 				cache: false,
// 				processData: true,
// 				contentType: 'application/json',
// 				xhrFields: {
// 						withCredentials: true
// 				},
// 				success: function(d){
// 						console.log(d); //will alert ok
// 						switchState(d);
// 				},
// 				error: function(d){
// 						console.log(d); //will alert ok
// 				},
// 		});
// }, false);
ap2ButtonEl.addEventListener('click', justNext, false);

var ap3ButtonEl = document.getElementById('ap_3_button');
// ap3ButtonEl.addEventListener('click', function() {
// 		console.log("top ap3Button script");
// 		jss = JSON.stringify({'st':4});
// 		console.log(jss);
// 		$.ajax({
// 				url: apiRoot + "api/v1/wallet/SOBSTVENNOSTIPRAVO",
// 				type: 'POST',
// 				data: jss,
// 				dataType: 'json',
// 				cache: false,
// 				processData: true,
// 				contentType: 'application/json',
// 				xhrFields: {
// 						withCredentials: true
// 				},
// 				success: function(d){
// 						console.log(d); //will alert ok
// 						switchState(d);
// 				},
// 				error: function(d){
// 						console.log(d); //will alert ok
// 				},
// 		});
// }, false);
ap3ButtonEl.addEventListener('click', justNext, false);

var ap4ButtonEl = document.getElementById('ap_4_button');
// ap4ButtonEl.addEventListener('click', function() {
// 		console.log("top ap3Button script");
// 		jss = JSON.stringify({'st':5});
// 		console.log(jss);
// 		$.ajax({
// 				url: apiRoot + "api/v1/wallet/SOBSTVENNOSTIPRAVO",
// 				type: 'POST',
// 				data: jss,
// 				dataType: 'json',
// 				cache: false,
// 				processData: true,
// 				contentType: 'application/json',
// 				xhrFields: {
// 						withCredentials: true
// 				},
// 				success: function(d){
// 						console.log(d); //will alert ok
// 						switchState(d);
// 				},
// 				error: function(d){
// 						console.log(d); //will alert ok
// 				},
// 		});
// }, false);
ap4ButtonEl.addEventListener('click', justNext, false);

var ap5ButtonEl = document.getElementById('ap_5_button');
ap5ButtonEl.addEventListener('click', function() {
		console.log("top ap5Button script");
		// jss = JSON.stringify({'st':5});
		// console.log(jss);
		$.ajax({
				url: apiRoot + "api/v1/wallet/SOBSTVENNOSTIPRAVO",
				type: 'POST',
				data: new FormData($('#pravo_upload_form')[0]),
				cache: false,
				processData: false,
				contentType: false,
				xhrFields: {
						withCredentials: true
				},
				success: function(d){
						console.log(d); //will alert ok
						switchState(d);
				},
				error: function(d){
						console.log(d); //will alert ok
				},
		});
}, false);
