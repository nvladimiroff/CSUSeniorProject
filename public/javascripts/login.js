var Login = function() {

    var handleLogin = function() {

        $('.login-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            rules: {
                username: {
                    required: true
                },
                password: {
                    required: true
                }
            },

            messages: {
                username: {
                    required: "Username is required."
                },
                password: {
                    required: "Password is required."
                }
            },

            invalidHandler: function(event, validator) { //display error alert on form submit   
                $('.alert-danger', $('.login-form')).show();
            },

            highlight: function(element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            errorPlacement: function(error, element) {
                error.insertAfter(element.closest('.input-icon'));
            },

            submitHandler: function(form) {
		$.ajax({
		    cache: false,
		    type: "GET",
		    url: "/users",
		    data: {
			username: $('#username').val(),
			password: $('#password').val()
		    },
		    success: function(response){
			if (response == 'success') {
			    window.location.href = '/';
			} else {
			    $('#errorMsg').css("display", "block");
			}
		    },
		    error: function(XMLHttpRequest, textStatus, errorThrown) {
			$('#errorMsg').css("display", "block");
		    }
		});
            }
        });

        $('.login-form input').keypress(function(e) {
            if (e.which == 13) {
                if ($('.login-form').validate().form()) {
                    $('.login-form').submit(); //form validation success, call ajax form submit
                }
                return false;
            }
        });
    }

    var handleForgetPassword = function() {
        $('.forget-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                email: {
                    required: true,
                    email: true
                }
            },

            messages: {
                email: {
                    required: "Email is required."
                }
            },

            invalidHandler: function(event, validator) { //display error alert on form submit   

            },

            highlight: function(element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            errorPlacement: function(error, element) {
                error.insertAfter(element.closest('.input-icon'));
            },

            submitHandler: function(form) {
		$('#fp_successMsg').css('display', 'none');
		$('#fp_errorMsg').css("display", "none");
                $.ajax({
		    cache: false,
		    type: "PUT",
		    url: "/users/forgot",
		    data: {
			email: $('#fp_email').val()
		    },
		    success: function(response){
			if (response == 'success') {
			    $('#fp_email').val('');
			    $('#fp_successMsg').css('display', 'block');
			} else {
			    $('#fp_errorMsg').css("display", "block");
			}
		    },
		    error: function(XMLHttpRequest, textStatus, errorThrown) {
			$('#fp_errorMsg').css("display", "block");
		    }
		});
            }
        });

        $('.forget-form input').keypress(function(e) {
            if (e.which == 13) {
                if ($('.forget-form').validate().form()) {
                    $('.forget-form').submit();
                }
                return false;
            }
        });

        jQuery('#forget-password').click(function() {
            jQuery('.login-form').hide();
            jQuery('.forget-form').show();
        });

        jQuery('#back-btn').click(function() {
            jQuery('.login-form').show();
            jQuery('.forget-form').hide();
        });

    }

    var handleRegister = function() {

        $('.register-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            rules: {
                firstname: {
                    required: true
                },
		lastname: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                username: {
                    required: true,
		    minlength: 5,
		    uniqueUserName: true
                },
                password: {
                    required: true
                },
                rpassword: {
                    equalTo: "#register_password"
                },
                tnc: {
                    required: true
                }
            },

            messages: { // custom messages for radio buttons and checkboxes
                tnc: {
                    required: "Please accept TNC first."
                }
            },

            invalidHandler: function(event, validator) { //display error alert on form submit   
		$('.alert-danger', $('.register-form')).show();
            },

            highlight: function(element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            errorPlacement: function(error, element) {
                if (element.attr("name") == "tnc") { // insert checkbox errors after the container                  
                    error.insertAfter($('#register_tnc_error'));
                } else if (element.closest('.input-icon').size() === 1) {
                    error.insertAfter(element.closest('.input-icon'));
                } else {
                    error.insertAfter(element);
                }
            },

            submitHandler: function(form) {
		$('#reg_errorMsg').css("display", "none");
                $.ajax({
		    cache: false,
		    type: "POST",
		    url: "/users",
		    data: {
			firstname: $('#firstname').val(),
			lastname: $('#lastname').val(),
			email: $('#new_email').val(),
			username: $('#new_username').val(),
			password: $('#register_password').val(),
			role: $('#role').val()
		    },
		    success: function(response){
			if (response == 'success') {
			    window.location.href = '/login';
			} else {
			    $('#reg_errorMsg').css("display", "block");
			}
		    },
		    error: function(XMLHttpRequest, textStatus, errorThrown) {
			$('#reg_errorMsg').css("display", "block");
		    }
		});
            }
        });

        $('.register-form input').keypress(function(e) {
            if (e.which == 13) {
                if ($('.register-form').validate().form()) {
                    $('.register-form').submit();
                }
                return false;
            }
        });

        jQuery('#register-btn').click(function() {
            jQuery('.login-form').hide();
            jQuery('.register-form').show();
        });

        jQuery('#register-back-btn').click(function() {
            jQuery('.login-form').show();
            jQuery('.register-form').hide();
        });
    }

    return {
        //main function to initiate the module
        init: function() {

            handleLogin();
            handleForgetPassword();
            handleRegister();

        }

    };

}();

jQuery(document).ready(function() {
    var response = true;
    $.validator.addMethod(
	"uniqueUserName", 
	function(value, element) {
	    $.ajax({
		type: "GET",
		url: "/users/checkUsername",
		data: { username: value },
		success: function(msg) {
		    //If username exists, set response to true
		    response = ( msg == 'true' ) ? false : true;
		}
	     });
	    return this.optional(element) || response;
	},
	"Username is Already Taken"
    );
    
    Login.init();
});