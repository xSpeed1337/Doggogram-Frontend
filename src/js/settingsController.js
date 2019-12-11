$(document).ready(function () {

let token = sessionStorage.getItem('token');
let debug = false;
let newProfileImage;

loadProfileImage();

    function loadProfileImage() {

        $.ajax({
            url: 'https://cors-anywhere.herokuapp.com/http://88.214.57.214:6889/api/v1/users/user/image',
            type: 'GET',
            processData: false,
            contentType: false,
            headers: {
                "Authorization": `Bearer ${token}`
            },
            success: function (response) {

               if(response==""){
                   return;
                    //setUserImgageDefault()
                }
                if (debug === true) {
                    alert('success');
                    console.log('succes: ' + JSON.stringify(response));
                }

                let newPicString = "data:image/jpeg;base64,"+ response;
                $('#idOldProfileImage').attr("src", newPicString);


            },
            error: function (response) {
                if (debug === true) {
                    alert('error');
                    console.log('error: ' + JSON.stringify(response));
                }
            }
        });



    }

    $("#newProfileImage").on('change', function () {
        newProfileImage = this.files[0];
    });

/*    function setUserImgageDefault() {
        let defaultUserImage="../resources/images/defaultuserimage.jpg"

        let defaultUserImageFormData = new FormData();
        defaultUserImageFormData.append('file', defaultUserImage);

        $.ajax({
            url: 'https://cors-anywhere.herokuapp.com/http://88.214.57.214:6889/api/v1/users/image',
            type: 'POST',
            processData: false,
            contentType: false,
            data: defaultUserImageFormData,
            headers: {
                "Authorization": `Bearer ${token}`
            },
            success: function (response) {


                if (debug === true) {
                    alert('User Image set to default');
                    console.log('succes: ' + JSON.stringify(response));
                }


            },
            error: function (response) {
                if (debug === true) {
                    alert('Failed to set default image');
                    console.log('error: ' + JSON.stringify(response));
                }
            }
        });



    }*/

$("#uploadUserPictureBtn").on('click', function () {



    let uploadAlert = '<div class="alert alert-warning alert-dismissible show" role="alert">\n' +
        '                                Dieses feld darf <strong>NICHT</strong> leer sein! \n' +
        '                                <button aria-label="Close" class="close" data-dismiss="alert" type="button">\n' +
        '                                    <span aria-hidden="true">&times;</span>\n' +
        '                                </button>\n' +
        '                            </div>';
    let uploadImageFormData = new FormData();

    let uploadProfileImage = newProfileImage;
    let uploadbool = true;

    $(".alert").alert('close');


    if (uploadProfileImage == undefined) {
        uploadbool = false;
        $('#newProfileImage').after(uploadAlert)
    }


    if (uploadbool) {

        uploadImageFormData.append('file', uploadProfileImage);

        $.ajax({
            url: 'https://cors-anywhere.herokuapp.com/http://88.214.57.214:6889/api/v1/users/image',
            type: 'POST',
            processData: false,
            contentType: false,
            data: uploadImageFormData,
            headers: {
                "Authorization": `Bearer ${token}`
            },
            success: function (response) {



                alert('Profilbild wurde geändert.');
                if (debug === true) {
                    console.log('succes: ' + JSON.stringify(response));
                }
                $("#myModal").modal('toggle');

                showMessageToastSuccess();

                loadProfileImage();
            },
            error: function (response) {
                if (debug === true) {
                    console.log('error: ' + JSON.stringify(response));
                }
                showMessageToastFail()
            }
        });
    }





});

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
                    alert('success');
                    console.log('succes: ' + JSON.stringify(response));
                }

                showMessageToastSuccess();



            },
            error: function (response) {
                if (debug === true) {
                    alert('error');
                    console.log('error: ' + JSON.stringify(response));
                }

                showMessageToastFail();

            }
        });

});


    $("#idChangeBio").on('click', function () {

        let newBio = $("#idTextArea").val();
        let bioformdata = new FormData();
        bioformdata.append('content', newBio);

        $.ajax({
            url: 'https://cors-anywhere.herokuapp.com/http://88.214.57.214:6889/api/v1/users/update/bio',
            type: 'POST',
            processData: false,
            contentType: false,
            data: bioformdata,
            headers: {
                "Authorization": `Bearer ${token}`
            },
            success: function (response) {
                if (debug === true) {
                    alert('success');
                    console.log('succes: ' + JSON.stringify(response));
                }
                showMessageToastSuccess();


            },
            error: function (response) {
                if (debug === true) {
                    alert('error');
                    console.log('error: ' + JSON.stringify(response));
                }
                showMessageToastFail();
            }
        });

    });

    function showMessageToastSuccess() {
        var x = document.getElementById("snackbarSuccess");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }
    function showMessageToastFail() {
        var x = document.getElementById("snackbarFail");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }



});