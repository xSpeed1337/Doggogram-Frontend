$(document).ready(function () {
    let token = sessionStorage.getItem('token');
    let imageDiv = "<div class=\"post-container\" style=\"flex-direction: column\">\n" +
        "                    <article class=\"post\">\n" +
        "                        <header class=\"bd-post-title\">\n" +
        "                            <img class=\"bd-post-pp\" src=\"../resources/images/superthumb.jpg\" alt=\"\">\n" +
        "                            <span class=\"bd-post-name\">Mein Name</span>\n" +
        "                        </header>\n" +
        "                        <div class=\"bd-post-img-container\">\n" +
        "                            <img id='image' class=\"bd-post-img\" alt=\"\">\n" +
        "                        </div>\n" +
        "                        <div class=\"bd-post-stats\">\n" +
        "                            <a class=\"bd-post-favtext\"><i class=\"material-icons bd-post-favicon\">favorite</i><span class=\"bd-post-span\">1000</span></a>\n" +
        "                            <a class=\"bd-post-chattext\"><i class=\"material-icons bd-post-chaticon\">chat</i><span class=\"bd-post-span\">1000</span></a>\n" +
        "                        </div>\n" +
        "                    </article>\n" +
        "                </div>"

    $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/http://88.214.57.214:6889/api/v1/images/all',
        type: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        },
        success: function (response) {

        }
    });
});