$(document).ready(function () {

let token = sessionStorage.getItem('token');
let debug = true;

$("#idChangePassword").on('click', function () {

    let oldPw = $("#idInputOldPassword").val();
    let newPw = $("#idInputNewPassword").val();
    let pwformdata = new FormData();
 pwformdata.append('oldPassword', oldPw);
pwformdata.append('newPassword', newPw);

        $.ajax({
            url: 'https://cors-anywhere.herokuapp.com/http://88.214.57.214:6889/api/v1/users/update/password',
            type: 'POST',
            processData: false,
            contentType: false,
            data: pwformdata,
            headers: {
                "Authorization": `Bearer ${token}`
            },
            success: function (response) {
                if (debug === true) {
                    console.log('succes: ' + JSON.stringify(response));
                }

            },
            error: function (response) {
                if (debug === true) {
                    console.log('error: ' + JSON.stringify(response));
                }
            }
        });

});

});