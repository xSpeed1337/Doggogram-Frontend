let debug = false;
let backendAdress = 'https://cors-anywhere.herokuapp.com/http://88.214.57.214:6889';

$(document).ready(function () {

    /**
     * Login Method
     */
    $('#loginBtn').on('click', function () {
        let loginAlert = '<div class="alert alert-warning alert-dismissible show" role="alert">\n' +
            '                                Dieses feld darf <strong>NICHT</strong> leer sein! \n' +
            '                                <button aria-label="Close" class="close" data-dismiss="alert" type="button">\n' +
            '                                    <span aria-hidden="true">&times;</span>\n' +
            '                                </button>\n' +
            '                            </div>';
        let loginUsername = $('#loginInputUsername').val();
        let loginPassword = $('#loginInputPassword').val();
        let loginFormData = new FormData();
        let loginBool = true;

        loginFormData.append('user', loginUsername);
        loginFormData.append('password', loginPassword);

        $(".alert").alert('close');

        if (loginUsername == undefined || loginUsername == "") {
            loginBool = false;
            $('#loginUsernameForm').after(loginAlert);
        }

        if (loginPassword == undefined || loginPassword == "") {
            loginBool = false;
            $('#loginPasswordForm').after(loginAlert);
        }

        if (loginBool) {
            $.ajax({
                url: backendAdress + '/api/v1/auth/login',
                processData: false,
                contentType: false,
                type: 'POST',
                data: loginFormData,
                success: function (response) {
                    if (debug) {
                        console.log('succes: ' + JSON.stringify(response));
                    }
                    sessionStorage.setItem('token', response.token);
                    sessionStorage.setItem('Username', loginUsername);
                    location.href = "../html/feed.html";
                },
                error: function (response) {
                    if (debug) {
                        console.log('error: ' + JSON.stringify(response));
                    }
                }
            });
        }
    });

    /**
     * Register Method
     */
    $("#RegisterButton").on("click", function () {
        let registerJSON = {
            user: $('#exampleInputEmail1').val(),
            pass: $('#exampleInputPassword1').val()
        };

        $.ajax({
            url: backendAdress + '/api/v1/users/register/',
            contentType: "application/json",
            type: 'POST',
            data: JSON.stringify(registerJSON),
            success: function (response) {
                if (debug) {
                    console.log('success: ' + JSON.stringify(response));
                }
            }
        });
    });

});
