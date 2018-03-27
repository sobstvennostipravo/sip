
$(document).ready(function() {

  "use strict";


  // ++++ Modal ++++

    $("#youtube").fancybox({
      'width'       : '75%',
      'height'      : '75%',
      'autoScale'     : false,
      'transitionIn'    : 'none',
      'transitionOut'   : 'none',
      'type'        : 'iframe',
      'padding' : 0
    });

    $(".js-form").fancybox({
      'padding' : 0,
      'showCloseButton' : false
    });




/////////////////////////////////////////////////////////////////
//Form validate
/////////////////////////////////////////////////////////////////

  var formValidate = $('.js_validate').on("click", ".js-submit", function(){
      return validate($(this).parents(".js_validate"));
  });

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


  // +++ ПЕРЕХОДЫ ПО ФОРМАХ +++

  // Анимация
  $.fn.extend({
      animateCss: function (animationName, callback) {
          var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
          this.addClass('animated ' + animationName).one(animationEnd, function() {
              $(this).removeClass('animated ' + animationName);
              if (callback) {
                callback();
              }
          });
          return this;
      }
  });


  // Звук
  function sound() {
    var audio = new Audio();
    audio.src = 'audio/sound.mp3';
    audio.autoplay = true;
  };



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







// ++++ File input customization ++++


//Reference: https://www.onextrapixel.com/2012/12/10/how-to-create-a-custom-file-input-with-jquery-css3-and-php/
		(function(inputCust)  {

				// Browser supports HTML5 multiple file?
				var multipleSupport = typeof $('<input/>')[0].multiple !== 'undefined',
						isIE = /msie/i.test( navigator.userAgent );

				$.fn.customFile = function() {

						return this.each(function() {

								var $file = $(this).addClass('custom-file-upload-hidden'), // the original file input
										$wrap = $('<div class="file-upload-wrapper">'),
										$input = $('<input type="text" class="file-upload-input" disabled="disabled"' + '" placeholder="'+ $(this).parents('.custom-file-upload').attr('data-pl') +'"/>'),
										// Button that will be used in non-IE browsers
										$button = $('<button type="button" class="file-upload-button"></button>'),
										// Hack for IE
										$label = $('<label class="file-upload-button" for="'+ $file[0].id +'"></label>');

								// Hide by shifting to the left so we
								// can still trigger events
								$file.css({
										position: 'absolute',
										left: '-9999px'
								});

								$wrap.insertAfter( $file )
										.append( $file, ( isIE ? $label : $button ), $input );

								// Prevent focus
								$file.attr('tabIndex', -1);
								$button.attr('tabIndex', -1);

								$button.click(function () {
										$file.focus().click(); // Open dialog
								});

								$file.change(function() {

										var files = [], fileArr, filename;

										// If multiple is supported then extract
										// all filenames from the file array
										if ( multipleSupport ) {
												fileArr = $file[0].files;
												for ( var i = 0, len = fileArr.length; i < len; i++ ) {
														files.push( fileArr[i].name );
												}
												filename = files.join(', ');

												// If not supported then just take the value
												// and remove the path to just show the filename
										} else {
												filename = $file.val().split('\\').pop();
										}

										$input.val( filename ) // Set the value
												.attr('title', filename) // Show filename in title tootlip
												.focus(); // Regain focus

								});

								$input.on({
										blur: function() { $file.trigger('blur'); },
										keydown: function( e ) {
												if ( e.which === 13 ) { // Enter
														if ( !isIE ) { $file.trigger('click'); }
												} else if ( e.which === 8 || e.which === 46 ) { // Backspace & Del
														// On some browsers the value is read-only
														// with this trick we remove the old input and add
														// a clean clone with all the original events attached
														$file.replaceWith( $file = $file.clone( true ) );
														$file.trigger('change');
														$input.val('');
												} else if ( e.which === 9 ){ // TAB
														return;
												} else { // All other keys
														return false;
												}
										}
								});

						});

				};

				// Old browser fallback
				if ( !multipleSupport ) {
						$( document ).on('change', 'input.customfile', function() {

								var $this = $(this),
										// Create a unique ID so we
										// can attach the label to the input
										uniqId = 'customfile_'+ (new Date()).getTime(),
										$wrap = $this.parent(),

										// Filter empty input
										$inputs = $wrap.siblings().find('.file-upload-input')
										.filter(function(){ return !this.value }),

										$file = $('<input type="file" id="'+ uniqId +'" name="'+ $this.attr('name') +'"/>');

								// 1ms timeout so it runs after all other events
								// that modify the value have triggered
								setTimeout(function() {
										// Add a new input
										if ( $this.val() ) {
												// Check for empty fields to prevent
												// creating new inputs when changing files
												if ( !$inputs.length ) {
														$wrap.after( $file );
														$file.customFile();
												}
												// Remove and reorganize inputs
										} else {
												$inputs.parent().remove();
												// Move the input so it's always last on the list
												$wrap.appendTo( $wrap.parent() );
												$wrap.find('input').focus();
										}
								}, 1);

						});
				}

		} (jQuery));


  $('input[type=file]').customFile();

  $('.btn-add').on('click', function() {
    $(this).parent('.documents-group__item').append('<div class="custom-file-upload new" data-pl="Добавить документ"><input type="file" name="myfiles[]" multiple /><span class="btn-del"><img src="/sip/img/ic-del.png" alt="img" /></span></div>');
    $('.custom-file-upload.new input[type=file]').customFile();
    $('.custom-file-upload').removeClass('new');
  });

  $('html').on('click', '.btn-del', function() {
    $(this).parent('.custom-file-upload').remove();
  });
	//  end of comment

});
