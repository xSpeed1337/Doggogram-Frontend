$(document).ready(function () {
    let debug = true;
    let token = sessionStorage.getItem('token');
    let username;
    let picString;
    getUserName();

   // loadProfileImage();


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
                username=response;

                loadUserData();
                loadFollowers();
                loadFollowing();
                loadNumImages();
                loadUserImages();


            },
            error: function (response) {
                if (debug === true) {
                    alert('error');
                    console.log('error: ' + JSON.stringify(response));
                }
            }
        });
    }



    function loadUserData() {


        $.ajax({
            url: 'https://cors-anywhere.herokuapp.com/http://88.214.57.214:6889/api/v1/users/user/'+username,
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

                picString = "data:image/jpeg;base64,"+ response.userImage;
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

    function loadFollowing() {


        $.ajax({
            url: 'https://cors-anywhere.herokuapp.com/http://88.214.57.214:6889/api/v1/users/following/user/'+username,
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
    function loadFollowers() {


        $.ajax({
            url: 'https://cors-anywhere.herokuapp.com/http://88.214.57.214:6889/api/v1/users/followers/user/'+username,
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
    function loadUserImages() {


        $.ajax({
            url: 'https://cors-anywhere.herokuapp.com/http://88.214.57.214:6889/api/v1/images/user/'+username + '/0',
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

                //display pictures

                for (let i = 0; i < response.imageDTOS.length; i++) {
                    let imageDiv =


                        "                    <article class=\"post\">\n" +
                        "                        <header class=\"bd-post-title\">\n" +
                        "                            <img alt=\"\" class=\"bd-post-pp\" src=\"" + picString + "\">\n" +
                        "                            <span id=\"span" + response.imageDTOS[i].id + "\"  class=\"bd-post-name\">Mein Name</span>\n" +
                        "                        </header>\n" +
                        "                        <div>\n" +
                        "                            <img id=\"image" + response.imageDTOS[i].id + "\" alt=\"\" class=\"bd-post-img\" src=\"\data:image/jpeg;base64," + response.imageDTOS[i].image + "\">\n" +
                        "                        </div>\n" +
                        "                        <div class=\"bd-post-stats\">\n" +
                        "                            <a class=\"bd-post-favtext\"><i class=\"material-icons bd-post-favicon\">favorite</i><span\n" +
                        "                                    class=\"bd-post-span\">" + response.imageDTOS[i].likes + "</span></a>\n" +
                        "                            <a class=\"bd-post-chattext\"><i class=\"material-icons bd-post-chaticon\">chat</i><span\n" +
                        "                                    class=\"bd-post-span\">" + response.imageDTOS[1].comments + "</span></a>\n" +
                        "                        </div>\n" +
                        "                    </article>";


                                      //  \"" + picString + "\"






                        //"<img alt=\"content\" class=\"bd-main-content-img\" src=\"\data:image/jpeg;base64," + response.imageDTOS[i].image + "\">";



                    $('#idFeedContainerUserImages').append(imageDiv);

                    let spanID = "span" + response.imageDTOS[i].id;
                    document.getElementById(spanID).innerHTML=response.imageDTOS[0].title;

                }
                //end display pictures
                //update profile pic of imgs




            },
            error: function (response) {
                if (debug === true) {
                    alert('error');
                    console.log('error: ' + JSON.stringify(response));
                }
            }
        });
    }

    function loadNumImages() {


        $.ajax({
            url: 'https://cors-anywhere.herokuapp.com/http://88.214.57.214:6889/api/v1/images/$count/'+username,
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





});