$(document).ready(function () {
    let token = sessionStorage.getItem('token');

    $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/http://88.214.57.214:6889/api/v1/discover/feed/0',
        type: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        },
        success: function (response) {
            for (let i = 0; i < response.imageDTOS.length; i++) {
                let imageDiv = "<div class=\"post-container\" style=\"flex-direction: column\">\n" +
                    "                    <article class=\"post\">\n" +
                    "                        <header class=\"bd-post-title\">\n" +
                    "                            <img alt=\"\" class=\"bd-post-pp\" src=\"../resources/images/superthumb.jpg\">\n" +
                    "                            <span class=\"bd-post-name\">Mein Name</span>\n" +
                    "                        </header>\n" +
                    "                        <div class=\"bd-post-img-container\">\n" +
                    "                            <img id=\"image" + response.imageDTOS[i].id + "\" alt=\"\" class=\"bd-post-img\" src=\data:image/png;base64" + response.imageDTOS[i].image + "\">\n" +
                    "                        </div>\n" +
                    "                        <div class=\"bd-post-stats\">\n" +
                    "                            <a class=\"bd-post-favtext\"><i class=\"material-icons bd-post-favicon\">favorite</i><span\n" +
                    "                                    class=\"bd-post-span\">" + response.imageDTOS[i].likes + "</span></a>\n" +
                    "                            <a class=\"bd-post-chattext\"><i class=\"material-icons bd-post-chaticon\">chat</i><span\n" +
                    "                                    class=\"bd-post-span\">" + response.imageDTOS[1].comments.length + "</span></a>\n" +
                    "                        </div>\n" +
                    "                    </article>\n" +
                    "                </div>";

                $('#feedContainer').append(imageDiv);
            }
        }
    });
});