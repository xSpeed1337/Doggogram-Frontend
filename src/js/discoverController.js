let scrollLoad = true;
let discoverImageID = 0;
let discoverLastImageID = 0;

$(document).ready(function () {

    loadDiscoverFeed();

    /**
     * Loads new Content when User reaches the end of the Window
     */
    $(window).scroll(function () {
        if (scrollLoad && $(window).scrollTop() >= $(document).height() - $(window).height() - 300) {
            loadDiscoverFeed();
        }
    });

});

/**
 * Loads the Discover Feed
 */
function loadDiscoverFeed() {
    scrollLoad = false;
    $('#discoverFeed').append(bigLoadSpinner2);
    $.ajax({
        url: backendAdress + '/api/v1/images/discover/' + discoverImageID,
        type: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        },
        success: function (response) {
            for (let i = 0; i < response.imageDTOS.length; i++) {
                let imageDiv =
                    "                        <div class=\"col-4 bd-media\">\n" +
                    "                            <div class=\"card bd-searchcard\">\n" +
                    "                                <img onclick='openImageModal(event)' id =\"image" + response.imageDTOS[i].id + "\" alt=\"\" " +
                    "                                 class=\"bd-post-img\" src=\"\data:image/jpeg;base64," + response.imageDTOS[i].image + "\">\n" +
                    "                            </div>\n" +
                    "                        </div>";

                $('#discoverFeed').append(imageDiv);
                discoverLastImageID = response.imageDTOS[i].id;
            }
            if (discoverImageID != discoverLastImageID) {
                discoverImageID = discoverLastImageID;
                scrollLoad = true;
            }
            $('#bigLoadSpinner').remove();
        },
        error: function () {
            $('#bigLoadSpinner').remove();
        }
    });
}

/**
 * Searches the user and forwards to the userpage
 * @param event
 * @returns {boolean}
 */
function searchUser(event) {
    if (event.which == 13 || event.keyCode === 13) {
        let noUserFoundAlert = "<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\">\n" +
            "  <strong>Benutzername nicht gefunden</strong> Bitte überprüfen sie ihre eingabe\n" +
            "  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
            "    <span aria-hidden=\"true\">&times;</span>\n" +
            "  </button>\n" +
            "</div>";
        let searchFormData = new FormData();
        let searchUsername = $('#searchUserFeed').val();

        searchFormData.append('user', searchUsername);

        $.ajax({
            url: backendAdress + '/api/v1/users/search/' + searchUsername,
            type: 'GET',
            processData: false,
            contentType: false,
            data: searchFormData,
            headers: {
                "Authorization": `Bearer ${token}`
            },
            success: function (response) {
                sessionStorage.setItem('searchUser', response.userDTOS[0].user);
                $('#smallSpinner').remove();
                location.href = "userpage.html";
            },
            error: function (response) {
                $('#searchUserFeed').after(noUserFoundAlert);
            }
        });
        return false;
    }
    return true;
}
