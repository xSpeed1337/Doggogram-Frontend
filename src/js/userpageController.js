$(document).ready(function () {
    let debug = true;
    let token = sessionStorage.getItem('token');
    let username;

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


                document.getElementById("idBio").innerHTML = response.bio;

                document.getElementById("idUserName").innerHTML = response.user;

                let picString = "data:image/jpeg;base64,"+ response.userImage;
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
                    let imageDiv = "<img alt=\"content\" class=\"bd-main-content-img\" src=\"\data:image/jpeg;base64," + response.imageDTOS[i].image + "\">";

                    "data:image/jpeg;base64,"+ response.imageDTOS[i].image

                    $('#idFeedContainerUserImages').append(imageDiv);

                }

                //end display pictures


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
                document.getElementById("idBeitraege").innerHTML = response.imageDTOS.length; //vorübergehende Lösung

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