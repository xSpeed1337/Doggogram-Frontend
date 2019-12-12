let backendAdress = 'https://cors-anywhere.herokuapp.com/http://88.214.57.214:6889';
let token = sessionStorage.getItem('token');
let bigLoadSpinner = "<div id='bigLoadSpinner' class=\"post-container\" style=\"flex-direction: column\" >" +
    "<div class=\"spinner-border\" style=\"width: 3rem; height: 3rem; flex-direction: column;\" role=\"status\">\n" +
    "  <span class=\"sr-only\">Loading...</span>\n" +
    "</div>" +
    "</div>";
let notEmptyAlert = '<div class="alert alert-warning alert-dismissible show" role="alert">\n' +
    '                                Dieses feld darf <strong>NICHT</strong> leer sein! \n' +
    '                                <button aria-label="Close" class="close" data-dismiss="alert" type="button">\n' +
    '                                    <span aria-hidden="true">&times;</span>\n' +
    '                                </button>\n' +
    '                            </div>';

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

        let formdata = new FormData();
        let uploadTitle = $("#uploadTitle").val();
        let uploadBio = $("#uploadBio").val();
        let uploadImage = image;
        let uploadbool = true;

        $(".alert").alert('close');

        if (uploadTitle == undefined || uploadTitle == "") {
            uploadbool = false;
            $('#uploadTitle').after(notEmptyAlert);
        }
        if (uploadImage == undefined) {
            uploadbool = false;
            $('#uploadImage').after(notEmptyAlert)
        }
        if (uploadBio == undefined || uploadBio == "") {
            uploadbool = false;
            $('#uploadBio').after(notEmptyAlert)
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
    let userImage;

    $.ajax({
        url: backendAdress + '/api/v1/images/image/' + iID,
        type: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        },
        success: function (response) {
            if (response.userImage == "" || response.userImage == undefined || response.userImage == null) {
                userImage = "resources/images/superthumb.jpg";
            } else {
                userImage = "data:image/jpeg;base64," + response.userImage;
            }
            let username = response.user;

            let newImageModal = "<div class=\"modal fade  bd-image-modal\" id='imageModal" + response.id + "' tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"imageModalLabel\" aria-hidden=\"true\">\n" +
                "    <div class=\"modal-dialog modal-lg modal-dialog-centered\" role=\"document\">\n" +
                "        <div class=\"modal-content bd-image-modal-content\">\n" +
                "            <div class=\"modal-body\">\n" +
                "                <div class=\"container-fluid bd-image-modal-body-container\">\n" +
                "                    <div class=\"row no-gutters\">\n" +
                "                        <div class=\"col-8\">\n" +
                "                            <div class=\"bd-image-container-main-picture\">\n" +
                "                                <img class=\"bd-image-main-picture\" src=\"\data:image/jpeg;base64," + response.image + "\" alt=\"Content Picture\">\n" +
                "                            </div>\n" +
                "                        </div>\n" +
                "                        <div class=\"col-4\">\n" +
                "                            <header class=\"bd-image-header\">\n" +
                "                                <a onclick='goToUserpage(\"" + response.user + "\")'><img class=\"bd-image-profile-picture\" src=\"" + userImage + "\" alt=\"Profile Picture\">\n" +
                "                                <span id='username' class=\"bd-image-profile-name\">" + response.user + "</span></a>\n" +
                "                                <img class=\"bd-image-profile-picture\" src=\"\data:image/jpeg;base64," + response.userImage + "\" alt=\"Profile Picture\">\n" +
                "                                <span class=\"bd-image-profile-name\">" + response.user + "</span>\n" +
                "                                <button class=\"btn bd-image-profile-change-btn\"><i class=\"material-icons bd-image-profile-change-btn-icon\">create</i></button>" +
                "                                <button class=\"btn bd-image-profile-delete-btn\" type=\"button\"><i class=\"material-icons bd-image-profile-delete-btn-icon\">delete</i></button>" +
                "                                <div class=\"bd-image-profile-container-description\"><span class=\"bd-image-profile-description\">" + response.bio + "</span></div>\n" +
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
                "                                            <textarea id='textarea" + response.id + "' aria-label=\"Kommentar schreiben...\" placeholder=\"Kommentar schreiben...\" class=\"bd-image-form-textarea\" autocomplete=\"off\"></textarea>\n" +
                "                                        </form>\n" +
                "                                            <button onclick='writeComment(" + response.id + ")' class=\"bd-image-form-button\" type=\"submit\"><i class=\"material-icons bd-image-button-icon\">send</i></button>\n" +
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

    let loadCommentFormData = new FormData();
    loadCommentFormData.append('imageId', imageID);

    $.ajax({
        url: backendAdress + '/api/v1/comment/image/comments/' + imageID,
        type: 'GET',
        processData: false,
        contentType: false,
        data: loadCommentFormData,
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
                    "                                                <a><span class=\"bd-image-comment-user-name\">" + response.commentDTOs[i].user + "</span></a>\n" +
                    "                                                <span class=\"bd-image-comment-user-comment\">" + response.commentDTOs[i].comment + "</span>\n" +
                    "                                            </div>\n" +
                    "                                            <div class=\"bd-image-comment-container-time\">\n" +
                    "                                                <div class=\"bd-image-comment-time\"><i class=\"material-icons bd-image-comment-time-icon\">schedule</i><span class=\"bd-image-comment-time-text\">" + d + "." + m + "." + y + "</span></div>\n" +
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

    let commentFormData = new FormData();
    let comment = $('#textarea' + imageID).val();
    let commentBool = true;

    if (comment == undefined || comment == "") {
        commentBool = false;
        $('#textarea' + imageID).after(notEmptyAlert);
    }

    commentFormData.append('content', comment);
    commentFormData.append('imageId', imageID);

    if (commentBool) {
        $.ajax({
            url: backendAdress + '/api/v1/comment/add',
            type: 'POST',
            processData: false,
            contentType: false,
            data: commentFormData,
            headers: {
                "Authorization": `Bearer ${token}`
            },
            success: function (response) {
                let commendCreatedAlert = "<div class=\"alert alert-success alert-dismissible fade show\" role=\"alert\">\n" +
                    "  Commentar erfolgreich erstellt\n" +
                    "  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
                    "    <span aria-hidden=\"true\">&times;</span>\n" +
                    "  </button>\n" +
                    "</div>";
                $('#textarea' + imageID).append(commendCreatedAlert);
                $('#textarea' + imageID).val('');
                $('#commentList' + imageID).empty();
                loadModalComments(imageID);
            },
            error: function (response) {

            }
        });
    }
}

function goToUserpage(user) {
    sessionStorage.setItem('searchUser', user);
    location.href = "userpage.html";
}
