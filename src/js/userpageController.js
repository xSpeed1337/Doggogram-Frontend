let debug = false;
let picString;
let userId;


$(document).ready(function () {

    if (sessionStorage.getItem('searchUser') == "" || sessionStorage.getItem('searchUser') == undefined
        || sessionStorage.getItem('searchUser') == null || sessionStorage.getItem('searchUser') == sessionStorage.getItem('Username')) {
        getUserName();
        $('#followBtn').remove();
    } else {
        loadAllProfileData(sessionStorage.getItem('searchUser'));
        userId = sessionStorage.getItem('searchUser');
        sessionStorage.setItem('searchUser', '');
        getFollower(userId);
    }

});

function getUserName() {
    $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/http://88.214.57.214:6889/api/v1/users/username',
        type: 'GET',
        processData: false,
        contentType: false,
        headers: {
            "Authorization": `Bearer ${token}`
        },
        success: function (response) {
            if (debug === true) {
                console.log('succes: ' + JSON.stringify(response));
            }
            loadAllProfileData(response)
        },
        error: function (response) {
            if (debug === true) {
                alert('error');
                console.log('error: ' + JSON.stringify(response));
            }
        }
    });
}

function loadAllProfileData(username) {
    loadUserData(username);
    loadFollowers(username);
    loadFollowing(username);
    loadNumImages(username);
    loadUserImages(username);
}

function loadUserData(username) {
    $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/http://88.214.57.214:6889/api/v1/users/user/' + username,
        type: 'GET',
        processData: false,
        contentType: false,
        headers: {
            "Authorization": `Bearer ${token}`
        },
        success: function (response) {

            if (debug === true) {

                console.log('succes: ' + JSON.stringify(response));
            }
            if (!(response.bio == undefined || response.bio == "")) {
                document.getElementById("idBio").innerHTML = response.bio;
            }
            document.getElementById("idUserName").innerHTML = response.user;

            if (response.userImage == "" || response.userImage == undefined || response.userImage == null) {
                picString = "resources/images/superthumb.jpg";
            } else {
                picString = "data:image/jpeg;base64," + response.userImage;
            }
            $('#idProfileImage').attr("src", picString);
        },
        error: function (response) {
            if (debug === true) {
                alert('error');
                console.log('error: ' + JSON.stringify(response));
            }
        }
    });
}

function loadFollowing(username) {
    $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/http://88.214.57.214:6889/api/v1/users/following/user/' + username,
        type: 'GET',
        processData: false,
        contentType: false,
        headers: {
            "Authorization": `Bearer ${token}`
        },
        success: function (response) {
            if (debug === true) {
                console.log('succes: ' + JSON.stringify(response));
            }
            //document.getElementById("idFollower").innerHTML = response.userDTOS.length;
        },
        error: function (response) {
            if (debug === true) {
                alert('error');
                console.log('error: ' + JSON.stringify(response));
            }
        }
    });
}

function loadFollowers(username) {
    $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/http://88.214.57.214:6889/api/v1/users/followers/user/' + username,
        type: 'GET',
        processData: false,
        contentType: false,
        headers: {
            "Authorization": `Bearer ${token}`
        },
        success: function (response) {
            if (debug === true) {
                console.log('succes: ' + JSON.stringify(response));
            }
            document.getElementById("idFollower").innerHTML = response.userDTOS.length;
        },
        error: function (response) {
            if (debug === true) {
                alert('error');
                console.log('error: ' + JSON.stringify(response));
            }
        }
    });
}

function loadUserImages(username) {
    $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/http://88.214.57.214:6889/api/v1/images/user/' + username + '/0',
        type: 'GET',
        processData: false,
        contentType: false,
        headers: {
            "Authorization": `Bearer ${token}`
        },
        success: function (response) {
            if (debug === true) {
                console.log('succes: ' + JSON.stringify(response));
            }

            for (let i = 0; i < response.imageDTOS.length; i++) {
                let imageDiv = "                    <article class=\"post\">\n" +
                    "                        <header class=\"bd-post-title\">\n" +
                    "                            <img alt=\"\" class=\"bd-post-pp\" src=\"" + picString + "\">\n" +
                    "                            <span id=\"span" + response.imageDTOS[i].id + "\"  class=\"bd-post-name\">" + response.imageDTOS[i].user + "</span>\n" +
                    "                        </header>\n" +
                    "                        <div>\n" +
                    "                            <img onclick='openImageModal(event)' id=\"image" + response.imageDTOS[i].id + "\" alt=\"\" class=\"bd-post-img\" src=\"\data:image/jpeg;base64," + response.imageDTOS[i].image + "\">\n" +
                    "                        </div>\n" +
                    "                        <div class=\"bd-post-stats\">\n" +
                    "                            <a onclick='likingImage(" + response.imageDTOS[i].id + ")' id=\"afav" + response.imageDTOS[i].id + "\" class=\"bd-post-favtext\"><i class=\"material-icons bd-post-favicon\">favorite</i><span\n" +
                    "                                   id='imageLikes" + response.imageDTOS[i].id + "' class=\"bd-post-span\">" + response.imageDTOS[i].likes + "</span></a>\n" +
                    "                            <a class=\"bd-post-chattext\"><i class=\"material-icons bd-post-chaticon\">chat</i><span\n" +
                    "                                    class=\"bd-post-span\">" + response.imageDTOS[i].comments + "</span></a>\n" +
                    "                        </div>\n" +
                    "                    </article>";
                $('#idFeedContainerUserImages').append(imageDiv);
            }
        },
        error: function (response) {
            if (debug === true) {
                alert('error');
                console.log('error: ' + JSON.stringify(response));
            }
        }
    });
}

function loadNumImages(username) {
    $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/http://88.214.57.214:6889/api/v1/images/$count/' + username,
        type: 'GET',
        processData: false,
        contentType: false,
        headers: {
            "Authorization": `Bearer ${token}`
        },
        success: function (response) {
            if (debug === true) {
                console.log('succes: ' + JSON.stringify(response));
            }
            document.getElementById("idBeitraege").innerHTML = response; //vorübergehende Lösung
        },
        error: function (response) {
            if (debug === true) {
                alert('error');
                console.log('error: ' + JSON.stringify(response));
            }
        }
    });
}

/**
 * Follows or Defollows the user
 */
function followUser() {
    let followUserFormData = new FormData();
    followUserFormData.append('followUser', userId);

    $.ajax({
        url: backendAdress + '/api/v1/users/follow',
        type: 'POST',
        processData: false,
        contentType: false,
        data: followUserFormData,
        headers: {
            "Authorization": `Bearer ${token}`
        },
        success: function (response) {
            if (response) {
                $('#followBtn').html('Unfollow');
                $('#idFollower').html(($('#idFollower').html() * 1) + 1);
            } else {
                $('#followBtn').html('Follow');
                $('#idFollower').html(($('#idFollower').html() * 1) - 1);
            }
        },
        error: function (response) {

        }
    });
}

/**
 * Loads all Users and if follow changes the follow Button
 * @param username
 */
function getFollower(username) {
    let getFollowerFD = new FormData();
    getFollowerFD.append('user', username);

    $.ajax({
        url: backendAdress + '/api/v1/users/followers/user/' + username,
        type: 'GET',
        processData: false,
        contentType: false,
        data: getFollowerFD,
        headers: {
            "Authorization": `Bearer ${token}`
        },
        success: function (response) {
            for (let i = 0; i < response.userDTOS.length; i++) {
                if (response.userDTOS[i].user.toString().toUpperCase() == sessionStorage.getItem('Username').toString().toUpperCase()) {
                    if (response) {
                        $('#followBtn').html('Unfollow');
                    } else {
                        $('#followBtn').html('Follow');
                    }
                }
            }
        }
    });
}
