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
    $("#registerButton").on("click", function () {
        let registerAlert = '<div class="alert alert-warning alert-dismissible show" role="alert">\n' +
            '                                Dieses feld darf <strong>NICHT</strong> leer sein! \n' +
            '                                <button aria-label="Close" class="close" data-dismiss="alert" type="button">\n' +
            '                                    <span aria-hidden="true">&times;</span>\n' +
            '                                </button>\n' +
            '                            </div>';
        let registerUsername = $('#registerInputUsername').val();
        let registerPassword = $('#registerInputPassword').val();
        let registerFormData = new FormData();
        let registerBool = true;

        registerFormData.append('user', registerUsername);
        registerFormData.append('password', registerPassword);

        $(".alert").alert('close');

        if (registerUsername == undefined || registerUsername == "") {
            registerBool = false;
            $('#registerUsername').after(registerAlert);
        }

        if (registerPassword == undefined || registerPassword == "") {
            registerBool = false;
            $('#registerPassword').after(registerAlert);
        }

        if (registerBool) {
            $.ajax({
                url: backendAdress + '/api/v1/users/register',
                processData: false,
                contentType: false,
                type: 'POST',
                data: registerFormData,
                success: function (response) {
                    let registerSuccessAlert = "<div class=\"alert alert-success alert-dismissible fade show\" role=\"alert\">\n" +
                        "  <strong>Regestrierung erfolgreich.</strong> Du kannst dich jetzt einloggen.\n" +
                        "  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
                        "    <span aria-hidden=\"true\">&times;</span>\n" +
                        "  </button>\n" +
                        "</div>";
                    $('#registerPassword').after(registerSuccessAlert);
                }
            });
        }
    });

});
