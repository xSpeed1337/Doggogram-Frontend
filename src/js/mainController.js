$(document).ready(function () {
    let debug = true;
    let image;
    let token = sessionStorage.getItem('token');

    /**
     *
     */
    $("#openUploadModalBtn").on('click', function () {
        $(".alert").alert('close');
    });

    /**
     * Saves the uploaded File for the call to the Backend
     */
    $("#uploadImage").on('change', function () {
        image = this.files[0];
    });

    /**
     * Shows the name of the file in the upload
     */
    $("#uploadImage").on("change", function () {
        let fileName = $(this).val().split("\\").pop();
        $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
    });

    /**
     * Uploads the from to the Backend
     */
    $("#uploadImageBtn").on('click', function () {
        let uploadAlert = '<div class="alert alert-warning alert-dismissible show" role="alert">\n' +
            '                                Dieses feld darf <strong>NICHT</strong> leer sein! \n' +
            '                                <button aria-label="Close" class="close" data-dismiss="alert" type="button">\n' +
            '                                    <span aria-hidden="true">&times;</span>\n' +
            '                                </button>\n' +
            '                            </div>';
        let formdata = new FormData();
        let uploadTitle = $("#uploadTitle").val();
        let uploadBio = $("#uploadBio").val();
        let uploadImage = image;
        let uploadbool = true;

        $(".alert").alert('close');

        if (uploadTitle == undefined || uploadTitle == "") {
            uploadbool = false;
            $('#uploadTitle').after(uploadAlert);
        }
        if (uploadImage == undefined) {
            uploadbool = false;
            $('#uploadImage').after(uploadAlert)
        }
        if (uploadBio == undefined || uploadBio == "") {
            uploadbool = false;
            $('#uploadBio').after(uploadAlert)
        }

        if (uploadbool) {
            formdata.append('title', uploadTitle);
            formdata.append('bio', uploadBio);
            formdata.append('file', uploadImage);

            $.ajax({
                url: 'https://cors-anywhere.herokuapp.com/http://88.214.57.214:6889/api/v1/images/upload/',
                type: 'POST',
                processData: false,
                contentType: false,
                data: formdata,
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                success: function (response) {
                    if (debug === true) {
                        console.log('succes: ' + JSON.stringify(response));
                    }
                    $("#exampleModal").modal('toggle');
                },
                error: function (response) {
                    if (debug === true) {
                        console.log('error: ' + JSON.stringify(response));
                    }
                }
            });
        }
    });

});
