let backendAdress = 'https://cors-anywhere.herokuapp.com/http://88.214.57.214:6889';

$(document).ready(function () {
    let debug = true;
    let image;
    let token = sessionStorage.getItem('token');

    /**
     * Loads profile pic and sets in HTML
     */
    $.ajax({
        url: backendAdress + '/api/v1/users/user/image/',
        type: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        },
        success: function (response) {
            if (response == "" || response == undefined) {
                $('#userImage').attr('src', '../resources/images/superthumb.jpg');
            } else {
                $('#userImage').attr('src', "data:image/png;base64," + response);
            }
        }
    });

    /**
     * Close Alerts when Modal gets Called
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
                url: backendAdress + '/api/v1/images/upload/',
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

/**
 * Opens Modal when clicked on a Image
 * @param event
 */

function openImageModal(event) {
    let imageID = $(event.target)[0].id;
    let iID = imageID.substr(5);

    $.ajax({
        url: backendAdress + '/api/v1/images/image/' + iID,
        type: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        },
        success: function (response) {
            let modal = "<div id='imageModal' class=\"modal fade bd-example-modal-lg\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myLargeModalLabel\" aria-hidden=\"true\">\n" +
                "  <div class=\"modal-dialog modal-lg\">\n" +
                "    <div class=\"modal-content\">\n" +
                "     <div class=\"post-container\" style=\"flex-direction: column\">\n" +
                "                    <article class=\"post\">\n" +
                "                        <header class=\"bd-post-title\">\n" +
                "                            <img alt=\"\" class=\"bd-post-pp\" src=\"\data:image/jpeg;base64," + response.userImage + "\">\n" +
                "                            <span class=\"bd-post-name\">" + response.user + "</span>\n" +
                "                        </header>\n" +
                "                        <div class=\"bd-post-img-container\">\n" +
                "                            <img id=\"image" + response.id + "\" alt=\"\" class=\"bd-post-img\" src=\"\data:image/jpeg;base64," + response.image + "\">\n" +
                "                        </div>\n" +
                "                        <div class=\"bd-post-stats\">\n" +
                "                            <a id='imageLikes' class=\"bd-post-favtext\"><i class=\"material-icons bd-post-favicon\">favorite</i><span\n" +
                "                                    class=\"bd-post-span\">" + response.likes + "</span></a>\n" +
                "                            <a class=\"bd-post-chattext\"><i class=\"material-icons bd-post-chaticon\">chat</i><span\n" +
                "                                    class=\"bd-post-span\">" + response.comments + "</span></a>\n" +
                "                        </div>\n" +
                "                    </article>\n" +
                "                </div> \n" +
                "    </div>\n" +
                "  </div>\n" +
                "</div>";

            $('#' + imageID).after(modal);
            $('#imageModal').modal('toggle');
        }
    });
}

/**
 * Inkrements the amount of likes
 * @param event
 */
function likingImage(imageID) {
    let likeFormData = new FormData();
    likeFormData.append('imageId', imageID);

    $.ajax({
        url: backendAdress + '/api/v1/images/liked',
        type: 'POST',
        processData: false,
        contentType: false,
        data: likeFormData,
        headers: {
            "Authorization": `Bearer ${token}`
        },
        success: function (response) {
            let currentLikes = $('#imageLikes' + imageID).html() * 1;
            if (response) {
                $('#imageLikes' + imageID).text(currentLikes + 1);
            } else {
                $('#imageLikes' + imageID).text(currentLikes - 1);
            }
        }
    });
}
