/*jslint browser:true */
/*global $, jQuery, alert*/

// var apiRoot = 'http://80.93.182.80:8008/';
// var apiRoot = 'http://127.0.0.1:8008/';
var apiRoot = 'http://185.158.154.144:8008/';
var stageApi = {};

// $( "#button" ).button();
$( "#plus_sign" ).click(function(e) {
		console.log("pressed");
		e.preventDefault();
		$( "#pay_docs" ).append( '<br><input name="file[]" type="file" />"</br>' );

});

// Звук
function sound() {
    var audio = new Audio();
    audio.src = 'audio/sound.mp3';
    audio.autoplay = true;
};


// var formValidate = $('.js_validate').on("click", ".js-submit", function(){
//     return validate($(this).parents(".js_validate"));
// });

function validate(form){
    var error_class = "has-error";
    var norma_class = "has-success";
    var item        = form.find("[required]");
    var e           = 0;
    var reg         = undefined;
    var pass        = form.find('.password').val();
    var pass_1      = form.find('.password_1').val();
    function mark (object, expression) {
        if (expression) {
            object.parent('div').addClass(error_class).removeClass(norma_class);
            e++;
        } else
            object.parent('div').addClass(norma_class).removeClass(error_class);
    }
    form.find("[required]").each(function(){
        switch($(this).attr("data-validate")) {
        case undefined:
            mark ($(this), $.trim($(this).val()).length === 0);
            break;
        case "purse":
            reg = /[x0-9A-Fa-f]{42}$/;
            mark ($(this), !reg.test($.trim($(this).val())));
            break;
        case "email":
            reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            mark ($(this), !reg.test($.trim($(this).val())));
            break;
        case "phone":
            reg = /[0-9 -()+]{10}$/;
            mark ($(this), !reg.test($.trim($(this).val())));
            break;
        case "pass":
            reg = /^[a-zA-Z0-9_-]+$/;
            mark ($(this), !reg.test($.trim($(this).val())));
            break;
        case "pass1":
            mark ($(this), (pass_1 !== pass || $.trim($(this).val()).length === 0));
            break;
        default:
            reg = new RegExp($(this).attr("data-validate"), "g");
            mark ($(this), !reg.test($.trim($(this).val())));
            break
        }
    })
    $('.js_valid_radio').each(function(){
				var inp = $(this).find('input.required');
        var rezalt = 0;
        for (var i = 0; i < inp.length; i++) {

						if ($(inp[i]).is(':checked') === true) {
								rezalt = 1;
								break;
						} else {
								rezalt = 0;
						}
        };
        if (rezalt === 0) {
            $(this).addClass(error_class).removeClass(norma_class);
            e==1;
        } else {
            $(this).addClass(norma_class).removeClass(error_class);
        }
    })
    if (e == 0) {
        // $('.form-1, .form-2').toggleClass("disabled active");
        return true;
    }
    else {
        form.find("."+error_class+" input:first").focus();
        $('.btn-action').animateCss('shake');
        sound();
        return false;
    }
}


function hideInfo(el, time) {
    setTimeout (function(){
				$(el).hide();
    }, time)
};

function showBlock(el, time) {
    setTimeout (function(){
				$(el).css("display", "block");
    }, time)
};

function modalResize() {
    $(window).bind('resize', function() {
				var top = ($(window).height() / 2) - ($("#fancybox-wrap").outerHeight() / 2);
				var left = ($(window).width() / 2) - ($("#fancybox-wrap").outerWidth() / 2);
				$("#fancybox-wrap").css({ top: top, left: left});
    }).trigger('resize');
}



// $('.form-3 .form-3__btn').on('click', function() {
//     hideInfo('#form3');
//     showBlock('#info-1');  // Ручная корректировка полей
//     setTimeout (function(){modalResize()});
//     hideInfo('#info-1', 3000);
//     showBlock('#info-2', 3000); // Системой заказана выписка из ЕГРН
//     hideInfo('#info-2', 6000);
//     showBlock('#info-3', 6000); // Иск выслан на email
//     hideInfo('#info-3', 9000);
//     setTimeout (function(){
// 				parent.$.fancybox.close();
//     }, 9000);
// });



var retrieverRun = 1;
// Use a named immediately-invoked function expression.
function retriever(current_state) {
		console.log("retriever top");

		justNext();

		// if (current_state != new_state) {
		// 		console.log("new state");
		// 		$("#ap_6").insertAfter('<div  class="fla collform"><p>Исполнение контракта на странной стадии.</p></div>');
		// }
		if (retrieverRun) {
				setTimeout(retriever, 5000);
		}
};

function switchState(d){
		console.log("top of switchCase", d);

		switch(d.st) {
		case 1:
				$('#form1').css("display", "block");
				$('#token_price').html(d.token_price);
				$('#ether_price').html(d.ether_price);
				// $('#form1').toggleClass("disabled active");
				// showBlock('#form1');
				hideInfo('#form2');
				console.log("enabling form 1");

				// $('.form-1').toggleClass("disabled active");
				// hideInfo('#info-5', 3000); // Странная штука с песочными часами
				// showBlock('#form4', 3000); // ПЕРЕВОД ETH ПРОШЕЛ УСПЕШНО!
				// hideInfo('#form4', 6000); // ПЕРЕВОД ETH ПРОШЕЛ УСПЕШНО!
				// showBlock('#form2', 6000); // Ваш текущий баланс токенов PRAVO составляет, переведите ...
				break;
		case 2:
				if (d.changed) {
						hideInfo('#form-1');
						showBlock('#form2');   // Ваш текущий баланс токенов PRAVO составляет, переведите ...
						hideInfo('#info-5'); // Странная штука с песочными часами
						$('#pravo_tokens').html(d.pravo_tokens);
						$('#root_contract').html(d.root_contract);
						$('#ether_to_pay').html(d.ether_price);
						// $('.form-1').toggleClass("disabled active");
						// $('.form-2').toggleClass("disabled active");
						showBlock('#form2');
						hideInfo('#form1');
				}
				else {
						hideInfo('#form2');
						showBlock('#info-5'); // Странная штука с песочными часами
						justNext();
				}
				break;
		case 3:
				$('#contract_number').html(d.contract_number);
				hideInfo('#info-5'); // Странная штука с песочными часами
				$('#form1').hide();
				$('#form4').css("display", "block");
				hideInfo('#form4', 2000); // ПЕРЕВОД ETH ПРОШЕЛ УСПЕШНО!
				showBlock('#form2', 2000)
				// $('.form-2').toggleClass("disabled active");
				// $('#form2').css("display", "block");
				// $('.form-2 .btn-second').removeClass('disabled').removeAttr('disabled');
				break;
		case 4:
				retriever(4);
				break;
		case 5:
		case 6:
		case 7:
				$('#form1').hide();
				$('#form2').hide();
				hideInfo('#form3');
				hideInfo('#info-5');
				showBlock('#info-1');
				break;
		case 8:
				hideInfo('#info-1');
				hideInfo('#info-2');
				showBlock('#info-2');
				break;
		case 9:
				retrieverRun = 0
				hideInfo('#info-1');
				hideInfo('#info-2');

				showBlock('#info-3', 2000);
				hideInfo('#info-3', 2000);
				showBlock('#form2', 2000)
				break;
		default:
				console.log("unknown stage received from API");
				break;
		}

		// var id = "#ap_" + d.st;
		// $(".ghost").not(id).hide('slow');
		// $(id).show('slow');

		// if (d.st > 4 && $(id).size() == 0) {
		// 		console.log("new state");
		// 		var new_div = '<div class="fla collform" id="' + "ap_" + d.st + '"><p>Исполнение контракта на странной стадии.</p></div>';
		// 		console.log(new_div);
		// 		$("#auto_processing").append(new_div);
		// }
}

function justNext(){
		console.log("justNext");
		$.ajax({
				url: apiRoot + "api/v2/wallet/SOBSTVENNOSTIPRAVO",
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
						$('#info-5').hide(); // Странная штука с песочными часами
						console.log(d); //will alert ok
				},
		});
}


var myRootEl = document.getElementById('automation_button');
myRootEl.addEventListener('click', function() {
		$('#auto_processing').toggle('slow')
		console.log("top of scripttt");
		$.ajax({
				url: apiRoot + "api/v2/wallet/SOBSTVENNOSTIPRAVO",
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
//  ввод кошелька
ap1ButtonEl.addEventListener('click', function() {
		console.log("top ap1Button script");

		if (!validate($('#form1'))) {
				return;
		}

		jss = JSON.stringify({'st':2, 'wallet': $('#walletField').val()});

    $(this).addClass('disabled').attr("disabled", "disabled");
		hideInfo('#form1');
    showBlock('#info-5'); // Странная штука с песочными часами

		console.log(jss);
		$.ajax({
				url: apiRoot + "api/v2/wallet/SOBSTVENNOSTIPRAVO",
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
						console.log(d);
						switchState(d);
				},
				error: function(d){
						console.log(d);
				},
		});
}, false);

var ap2ButtonEl = document.getElementById('ap_2_button');
// Подтвердите перевод ETH
ap2ButtonEl.addEventListener('click', function() {

		console.log("ap_2_button");

		if (!validate($('#form2'))) {
				return;
		}

    $(this).addClass('disabled').attr("disabled", "disabled");
    $('.form-2 .btn-second').removeClass('disabled').removeAttr('disabled');
		hideInfo('#form2');   // Ваш текущий баланс токенов PRAVO составляет, переведите ...
    showBlock('#info-5'); // Странная штука с песочными часами

		justNext();

}, false);


$('.form-2 .btn-second').on("click", function() {  // Отправить документы по квартире
    hideInfo('#form2');
    showBlock('#form3');
    setTimeout (function(){modalResize()});
});


var ap3ButtonEl = document.getElementById('ap_3_button');
ap3ButtonEl.addEventListener('click', function() {
    // hideInfo('#form2');
    // showBlock('#form3');

		hideInfo('#form3');   // Ваш текущий баланс токенов PRAVO составляет, переведите ...
    showBlock('#info-5'); // Странная штука с песочными часами

		console.log("top ap3Button script");
		// jss = JSON.stringify({'st':5});
		// console.log(jss);
		// $('#info-5').show(); // Странная штука с песочными часами
		fd = new FormData($('#form3')[0]);
		fd.append("email", $('#email').val());
		// jss = JSON.stringify({'email': $('#walletField').val(), 'formdata': fd});
		$.ajax({
				url: apiRoot + "api/v2/wallet/SOBSTVENNOSTIPRAVO",
				type: 'POST',
				// data: new FormData($('#form3 .documents-group__item')[0]),  // pravo_upload_form
				data: fd,  // pravo_upload_form
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
