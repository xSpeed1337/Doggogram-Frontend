let backendAdress = 'https://cors-anywhere.herokuapp.com/http://88.214.57.214:6889';
let token = sessionStorage.getItem('token');
let bigLoadSpinner = "<div id='bigLoadSpinner' class=\"post-container\" style=\"flex-direction: column\" >" +
    "<div class=\"spinner-border\" style=\"width: 3rem; height: 3rem; flex-direction: column;\" role=\"status\">\n" +
    "  <span class=\"sr-only\">Loading...</span>\n" +
    "</div>" +
    "</div>";

$(document).ready(function () {
    let debug = true;
    let image;

    autoRedirect();
    loadProfilePic();

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
            let newImageModal = "<div class=\"modal fade  bd-image-modal\" id='imageModal" + response.id + "' tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"imageModalLabel\" aria-hidden=\"true\">\n" +
                "    <div class=\"modal-dialog modal-lg modal-dialog-centered\" role=\"document\">\n" +
                "        <div class=\"modal-content\">\n" +
                "            <div class=\"modal-body\">\n" +
                "                <div class=\"container-fluid\">\n" +
                "                    <div class=\"row no-gutters\">\n" +
                "                        <div class=\"col-8\">\n" +
                "                            <div class=\"bd-image-container-main-picture\">\n" +
                "                                <img class=\"bd-image-main-picture\" src=\"\data:image/jpeg;base64," + response.image + "\" alt=\"Content Picture\">\n" +
                "                            </div>\n" +
                "                        </div>\n" +
                "                        <div class=\"col-4\">\n" +
                "                            <header class=\"bd-image-header\">\n" +
                "                                <img class=\"bd-image-profile-picture\" src=\"\data:image/jpeg;base64," + response.userImage + "\" alt=\"Profile Picture\">\n" +
                "                                <span class=\"bd-image-profile-name\">" + response.user + "</span>\n" +
                "                                <span class=\"bd-image-profile-description\">" + response.bio + "</span>\n" +
                "                            </header>\n" +
                "                            <div class=\"bd-image-body\">\n" +
                "                                <div class=\"bd-image-container-comments\">\n" +
                "                                    <ul id='commentList" + response.id + "' class=\"bd-image-comment-list\">\n" +
                "                                    </ul>\n" +
                "                                </div>\n" +
                "                                <section class=\"bd-image-container-actions\">\n" +
                "                                     <a onclick='likingImage(" + response.id + ")' class=\"bd-post-favtext\"><i class=\"material-icons bd-post-favicon\">favorite</i><span\n" +
                "                                    id='imageLikes" + response.id + "' class=\"bd-post-span\">" + response.likes + "</span></a>\n" +
                "                                    <a class=\"bd-post-chattext\"><i class=\"material-icons bd-post-chaticon\">chat</i><span\n" +
                "                                   id='imageComments" + response.id + "' class=\"bd-post-span\">" + response.comments + "</span></a>\n" +
                "                                </section>\n" +
                "                                <section class=\"bd-image-section-form\">\n" +
                "                                    <div class=\"bd-image-container-form\">\n" +
                "                                        <form class=\"bd-image-form\">\n" +
                "                                            <textarea aria-label=\"Kommentar schreiben...\" placeholder=\"Kommentar schreiben...\" class=\"bd-image-form-textarea\" autocomplete=\"off\"></textarea>\n" +
                "                                            <button class=\"bd-image-form-button\" type=\"submit\"><i class=\"material-icons bd-image-button-icon\">send</i></button>\n" +
                "                                        </form>\n" +
                "                                    </div>\n" +
                "                                </section>\n" +
                "                            </div>\n" +
                "                        </div>\n" +
                "                    </div>\n" +
                "                </div>\n" +
                "            </div>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "</div>";

            $('#' + imageID).after(newImageModal);
            if (response.comments != 0) {
                loadModalComments(response.id);
            }
            $('#imageModal' + response.id).modal('toggle');
        }
    });
}

/**
 * Auto redirect to the loginPage if not logged in
 */
function autoRedirect() {
    if (token == '' || token == undefined) {
        location.href = "login.html";
    }
}

/**
 * Loads profile pic and sets in HTML
 */
function loadProfilePic() {
    $.ajax({
        url: backendAdress + '/api/v1/users/user/image/',
        type: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        },
        success: function (response) {
            if (response == "" || response == undefined) {
                $('#userImage').attr('src', 'resources/images/superthumb.jpg');
            } else {
                $('#userImage').attr('src', "data:image/png;base64," + response);
            }
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

/**
 * Loads the Comments from the Backend and adds them to the modal
 * @param imageID
 */
function loadModalComments(imageID) {

    let commentFormData = new FormData();
    commentFormData.append('imageId', imageID);

    $.ajax({
        url: backendAdress + '/api/v1/comment/image/comments/' + imageID,
        type: 'GET',
        processData: false,
        contentType: false,
        data: commentFormData,
        headers: {
            "Authorization": `Bearer ${token}`
        },
        success: function (response) {
            for (let i = 0; i < response.commentDTOs.length; i++) {
                let formattedDate = new Date(response.commentDTOs[i].created);
                let d = formattedDate.getDate();
                let m = formattedDate.getMonth();
                m += 1;
                let y = formattedDate.getFullYear();

                let commentHTML = "<li id='image" + imageID + "comment" + response.commentDTOs[i].id + "' class=\"bd-image-comment-list-item\">\n" +
                    "                                            <div class=\"bd-image-comment-user\">\n" +
                    "                                                <a><span>" + response.commentDTOs[i].user + "</span></a>\n" +
                    "                                                <span>" + response.commentDTOs[i].comment + "</span>\n" +
                    "                                            </div>\n" +
                    "                                            <div class=\"bd-image-comment-container-time\">\n" +
                    "                                                <div class=\"bd-image-comment-time\"><i class=\"material-icons bd-image-comment-time-icon\">schedule</i><span class=\"bd-image-comment-time-text\">" + d + "." + m + "." + y + "</span>></div>\n" +
                    "                                            </div>\n" +
                    "                                        </li>";
                $('#commentList' + imageID).append(commentHTML);
            }
        }
    });

}

/**
 * Sends the Comment to the backend
 * @param imageID
 */
function writeComment(imageID) {

}
