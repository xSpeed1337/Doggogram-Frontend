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
    $('#idUserFeed').append(bigLoadSpinner2);
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
                let imageDiv =
                    "                    <div class=\"col-4\">\n" +
                    "                    <article class=\"bd-user-post\">\n" +
                    "                        <div class=\"bd-user-post-img-container\">\n" +
                    "                            <img alt=\"\" class=\"bd-user-post-img\" src=\"\data:image/jpeg;base64," + response.imageDTOS[i].image + "\">\n" +
                    "                            <div onclick='openImageModal(event)' id=\"image" + response.imageDTOS[i].id + "\" class=\"bd-user-post-img-overlay\">" +
                    "                               <a onclick='likingImage(" + response.imageDTOS[i].id + ")' id=\"afav" + response.imageDTOS[i].id + "\" class=\"bd-user-post-favtext\"><i class=\"material-icons bd-user-post-favicon\">favorite</i><span id='imageLikes" + response.imageDTOS[i].id + "' class=\"bd-user-post-span\">" + response.imageDTOS[i].likes + "</span></a>\n" +
                    "                               <a class=\"bd-user-post-chattext\"><i class=\"material-icons bd-user-post-chaticon\">chat</i><span class=\"bd-user-post-span\">" + response.imageDTOS[i].comments + "</span></a>\n" +
                    "                            </div> " +
                    "                        </div>\n" +
                    "                    </article>\n" +
                    "                    </div>";
                $('#idUserFeed').append(imageDiv);
            }
            $('#bigLoadSpinner').remove();
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
        url: 'https://cors-anywhere.herokuapp.com/http://88.214.57.214:6889/api/v1/users/follow',
        type: 'POST',
        processData: false,
        contentType: false,
        data: followUserFormData,
        headers: {
            "Authorization": `Bearer ${token}`
        },
        success: function (response) {
            if (response) {
                let unfollowBtn = "<button type=\"button\" class=\"btn btn-bd-unfollow\" id=\"followBtn\" onclick=\"followUser()\">Entfolgen</button>";
                $('#followBtn').remove();
                $('#followBtnContainer').append(unfollowBtn);
                $('#idFollower').html(($('#idFollower').html() * 1) + 1);
            } else {
                let followBtn = "<button type=\"button\" class=\"btn btn-bd-follow\" id=\"followBtn\" onclick=\"followUser()\">Folgen</button>";
                $('#followBtn').remove();
                $('#followBtnContainer').append(followBtn);
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
        url: 'https://cors-anywhere.herokuapp.com/http://88.214.57.214:6889/api/v1/users/followers/user/' + username,
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
                        let unfollowBtn = "<button type=\"button\" class=\"btn btn-bd-unfollow\" id=\"followBtn\" onclick=\"followUser()\">Entfolgen</button>";
                        $('#followBtn').remove();
                        $('#followBtnContainer').append(unfollowBtn);
                    } else {
                        let followBtn = "<button type=\"button\" class=\"btn btn-bd-follow\" id=\"followBtn\" onclick=\"followUser()\">Folgen</button>";
                        $('#followBtn').remove();
                        $('#followBtnContainer').append(followBtn);
                    }
                }
            }
        }
    });
}
