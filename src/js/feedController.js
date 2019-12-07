let token = sessionStorage.getItem('token');
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

    $.ajax({
        url: backendAdress + '/api/v1/images/discover/' + feedImageID,
        type: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        },
        success: function (response) {
            for (let i = 0; i < response.imageDTOS.length; i++) {
                let imageDiv = "<div class=\"post-container\" style=\"flex-direction: column\">\n" +
                    "                    <article class=\"post\">\n" +
                    "                        <header class=\"bd-post-title\">\n" +
                    "                            <img alt=\"\" class=\"bd-post-pp\" src=\"\data:image/jpeg;base64," + response.imageDTOS[i].userImage + "\">\n" +
                    "                            <span class=\"bd-post-name\">" + response.imageDTOS[i].user + "</span>\n" +
                    "                        </header>\n" +
                    "                        <div class=\"bd-post-img-container\">\n" +
                    "                            <img onclick='openImageModal(event)' id=\"image" + response.imageDTOS[i].id + "\" alt=\"\" class=\"bd-post-img\" src=\"\data:image/jpeg;base64," + response.imageDTOS[i].image + "\">\n" +
                    "                        </div>\n" +
                    "                        <div class=\"bd-post-stats\">\n" +
                    "                            <a class=\"bd-post-favtext\"><i class=\"material-icons bd-post-favicon\">favorite</i><span\n" +
                    "                                    class=\"bd-post-span\">" + response.imageDTOS[i].likes + "</span></a>\n" +
                    "                            <a class=\"bd-post-chattext\"><i class=\"material-icons bd-post-chaticon\">chat</i><span\n" +
                    "                                    class=\"bd-post-span\">" + response.imageDTOS[1].comments + "</span></a>\n" +
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
        }
    });
}
