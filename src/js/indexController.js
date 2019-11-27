$(document).ready(function () {
    let debug = true;
    let image;
    let that = this;
    let token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBZG1pbiIsImV4cCI6MTU4MDgzMjk0NCwiaWF0IjoxNTc0Nzg0OTQ0fQ.fiqLc8MlDktBO_sApYasiJZ5chNRbpmsfIO71FClMLutxRAEPDSAOTYZCFh6IPxMATGjvJm3VMMJGddZh1d1hA";

    /**
     * Saves the uploaded File for the call to the Backend
     */
    $("#customFile").on('change', function () {
        image = this.files[0];
    });

    /**
     * Shows the name of the file in the upload
     */
    $("#customFile").on("change", function () {
        var fileName = $(this).val().split("\\").pop();
        $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
    });

    /**
     * Uploads the from to the Backend
     */
    $("#uploadImage").click(function () {
        let formdata = new FormData();
        let file = image;
        let titel = $("#inputTitle").val();
        let bio = $("#textArea").val();
        formdata.append('title', titel);
        formdata.append('bio', bio);
        formdata.append('file', file);

        $.ajax({
            url: 'https://cors-anywhere.herokuapp.com/http://88.214.57.214:6889/api/v1/images/upload/',
            type: 'POST',
            processData: false,
            contentType: false,
            data: formdata,
            headers: {
                "Authorization": `Bearer ${token}`
            },
            success: function (response) {
                if (debug === true) {
                    console.log('succes: ' + JSON.stringify(response));
                }
                $("#exampleModal").modal('toggle');
            },
            error: function (response) {
                if (debug === true) {
                    console.log('error: ' + JSON.stringify(response));
                }
            }
        });
    });

    /**
     * Loads a Image from the Backend
     */
    $('#loadImage').on('click', function () {
        let imageData;
        $.ajax({
            url: 'https://cors-anywhere.herokuapp.com/http://88.214.57.214:6889/api/v1/images/image/1',
            type: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            success: function (response) {
                if (debug === true) {
                    console.log('succes: ' + JSON.stringify(response));
                }
                imageData = response;
            },
            error: function (response) {
                if (debug === true) {
                    console.log('succes: ' + JSON.stringify(response));
                }
            }
        }).always(function () {
            $('#bilder').after('<img id="image" class="img-fluid">');
            $("#image").attr("src", "data:image/png;base64," + imageData.image);
        });
    });

});