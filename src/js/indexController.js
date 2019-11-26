$(document).ready(function () {
    let image;
    let that = this;
    let token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBZG1pbiIsImV4cCI6MTU4MDgzMjk0NCwiaWF0IjoxNTc0Nzg0OTQ0fQ.fiqLc8MlDktBO_sApYasiJZ5chNRbpmsfIO71FClMLutxRAEPDSAOTYZCFh6IPxMATGjvJm3VMMJGddZh1d1hA";

    $("#customFile").on('change', function () {
        image = this.files[0];
    });

    $("#customFile").on("change", function () {
        var fileName = $(this).val().split("\\").pop();
        $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
    });

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
                console.log('succes: ' + JSON.stringify(response));
                $("#exampleModal").modal('toggle');
            },
            error: function (response) {
                console.log('error: ' + JSON.stringify(response));
            }
        });
    });

});