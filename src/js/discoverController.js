let token = sessionStorage.getItem('token');
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

function loadDiscoverFeed() {
    scrollLoad = false;

    $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/http://88.214.57.214:6889/api/v1/images/discover/' + discoverImageID,
        type: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        },
        success: function (response) {
            for (let i = 0; i < response.imageDTOS.length; i++) {
                let imageDiv = "</div>\n" +
                    "                        <div class=\"col\">\n" +
                    "                            <div class=\"card bd-searchcard\">\n" +
                    "                                <img id =\"image" + response.imageDTOS[i].id + "\" alt=\"\" " +
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
        }
    });
}

