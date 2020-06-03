
(function ($) {
    "use strict";
    let _lblErrore = $("#lblError");

    _lblErrore.hide();
    /*==================================================================
    [ Focus input ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })
  
  
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(e){
        e.preventDefault(); //stop reload page on form sumbit

        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }
        if(check){
            inviaRq();
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function inviaRq(){
        let user = $('[name="username"]').val();
		// md5 restituisce una word esadecimale, quindi è obbligatorio .toString()
		let pass = CryptoJS.MD5($('[name="pass"]').val()).toString();
		let _richiestaSignUp= inviaRichiesta("POST", "../php/login.php", { "username":user, "password":pass });
		_richiestaSignUp.fail(function(jqXHR, test_status, str_error) {
			if (jqXHR.status == 401) { // unauthorized
				_lblErrore.show();
			} else
				error(jqXHR, test_status, str_error);
		});
		_richiestaSignUp.done(function(data) {
			//if(data.ris=="ok") // test inutile
			window.location.href = "../index.html";
		});
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
        _lblErrore.hide();
    }
    
    /*==================================================================
    [ Show pass ]*/
    var showPass = 0;
    $('.btn-show-pass').on('click', function(){
        if(showPass == 0) {
            $(this).next('input').attr('type','text');
            $(this).addClass('active');
            showPass = 1;
        }
        else {
            $(this).next('input').attr('type','password');
            $(this).removeClass('active');
            showPass = 0;
        }
        
    });


})(jQuery);