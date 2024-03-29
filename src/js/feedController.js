let scrollLoad = true;
let feedImageID = 0;
let feedLastImageID = 0;

$(document).ready(function () {

    loadFeedImage();

    /**
     * Loads new Content when User reaches the end of the Window
     */
    $(window).scroll(function () {
        if (scrollLoad && $(window).scrollTop() >= $(document).height() - $(window).height() - 300) {
            loadFeedImage();
        }
    });

});

function loadFeedImage() {
    scrollLoad = false;
    let userImage;

    $('#feedContainer').append(bigLoadSpinner);

    $.ajax({
        url: backendAdress + '/api/v1/images/feed/' + feedImageID,
        type: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        },
        success: function (response) {
            for (let i = 0; i < response.imageDTOS.length; i++) {

                if (response.imageDTOS[i].userImage == "" || response.imageDTOS[i].userImage == undefined || response.imageDTOS[i].userImage == null) {
                    userImage = "resources/images/superthumb.jpg";
                } else {
                    userImage = "data:image/jpeg;base64," + response.imageDTOS[i].userImage;
                }

                let imageDiv = "<div class=\"post-container\" style=\"flex-direction: column\">\n" +
                    "                    <article class=\"post\">\n" +
                    "                        <header class=\"bd-post-title\">\n" +
                    "                           <a onclick='goToUserpage(\"" + response.imageDTOS[i].user + "\")'>" +
                    "                               <img alt=\"\" class=\"bd-post-pp\" src=\"" + userImage + "\">\n" +
                    "                               <span class=\"bd-post-name\">" + response.imageDTOS[i].user + "</span>" +
                    "                           </a>\n" +
                    "                        </header>\n" +
                    "                        <div class=\"bd-post-img-container\">\n" +
                    "                            <img onclick='openImageModal(event)' id=\"image" + response.imageDTOS[i].id + "\" alt=\"\" class=\"bd-post-img\" src=\"\data:image/jpeg;base64," + response.imageDTOS[i].image + "\">\n" +
                    "                        </div>\n" +
                    "                        <div class=\"bd-post-stats\">\n" +
                    "                            <a onclick='likingImage(" + response.imageDTOS[i].id + ")' class=\"bd-post-favtext\"><i class=\"material-icons bd-post-favicon\">favorite</i><span\n" +
                    "                                    class=\"bd-post-span\" id='imageLikes" + response.imageDTOS[i].id + "'>" + response.imageDTOS[i].likes + "</span></a>\n" +
                    "                            <a class=\"bd-post-chattext\"><i class=\"material-icons bd-post-chaticon\">chat</i><span\n" +
                    "                                    id='imageComments" + response.imageDTOS[i].id + "' class=\"bd-post-span\">" + response.imageDTOS[i].comments + "</span></a>\n" +
                    "                        </div>\n" +
                    "                    </article>\n" +
                    "                </div>";

                $('#feedContainer').append(imageDiv);
                feedLastImageID = response.imageDTOS[i].id;
            }
            if (feedImageID != feedLastImageID) {
                feedImageID = feedLastImageID;
                scrollLoad = true;
            }
            $('#bigLoadSpinner').remove();
        },
        error: function () {
            $('#bigLoadSpinner').remove();
        }
    });
}
