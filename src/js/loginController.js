let debug = false;
let backendAdress = 'https://cors-anywhere.herokuapp.com/http://88.214.57.214:6889';

$(document).ready(function () {
    let notEmptyAlert = '<div class="alert alert-warning alert-dismissible show" role="alert">\n' +
        '                                Dieses feld darf <strong>NICHT</strong> leer sein! \n' +
        '                                <button aria-label="Close" class="close" data-dismiss="alert" type="button">\n' +
        '                                    <span aria-hidden="true">&times;</span>\n' +
        '                                </button>\n' +
        '                            </div>';
    let smallloadingSpinner = "<span class=\"spinner-border spinner-border-sm\" role=\"status\" aria-hidden=\"true\"></span>";

    /**
     * Login Method
     */
    $('#loginBtn').on('click', function () {
        let loginUsername = $('#loginInputUsername').val();
        let loginPassword = $('#loginInputPassword').val();
        let loginFormData = new FormData();
        let loginBool = true;

        loginFormData.append('user', loginUsername);
        loginFormData.append('password', loginPassword);

        $(".alert").alert('close');

        if (loginUsername == undefined || loginUsername == "") {
            loginBool = false;
            $('#loginUsernameForm').after(notEmptyAlert);
        }

        if (loginPassword == undefined || loginPassword == "") {
            loginBool = false;
            $('#loginPasswordForm').after(notEmptyAlert);
        }

        if (loginBool) {
            $('#loginBtn').text('');
            $('#loginBtn').append(smallloadingSpinner);

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
                    location.href = "feed.html";
                },
                error: function (response) {
                    $('#loginBtn').text('Einloggen');
                    $('#loginPasswordForm').after("<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\">\n" +
                        "  <strong>Login fehlgeschlagen!</strong> Bitte überprüfen sie Benutzername und Passwort!.\n" +
                        "  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
                        "    <span aria-hidden=\"true\">&times;</span>\n" +
                        "  </button>\n" +
                        "</div>");
                }
            });
        }
    });

    /**
     * Register Method
     */
    $("#registerButton").on("click", function () {

        let registerUsername = $('#registerInputUsername').val();
        let registerPassword = $('#registerInputPassword').val();
        let registerFormData = new FormData();
        let registerBool = true;

        registerFormData.append('user', registerUsername);
        registerFormData.append('password', registerPassword);

        $(".alert").alert('close');

        if (registerUsername == undefined || registerUsername == "") {
            registerBool = false;
            $('#registerUsername').after(notEmptyAlert);
        }

        if (registerPassword == undefined || registerPassword == "") {
            registerBool = false;
            $('#registerPassword').after(notEmptyAlert);
        }

        if (registerBool) {
            $('#registerButton').text('');
            $('#registerButton').append(smallloadingSpinner);

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
                    $('#registerButton').text('Registrieren');
                },
                error: function () {
                    $('#registerButton').text('Registrieren');
                    $('#registerPassword').after("<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\">\n" +
                        "  <strong>Registrierung fehlgeschlagen!</strong> Bitte überprüfen sie Benutzername und Passwort!.\n" +
                        "  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
                        "    <span aria-hidden=\"true\">&times;</span>\n" +
                        "  </button>\n" +
                        "</div>");
                }
            });
        }
    });

});
