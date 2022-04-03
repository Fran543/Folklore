
var createPostEndPoint = "http://127.0.0.1:8091/createPost"
var getWarningsEndPoint = "http://127.0.0.1:8091/getWarnings"

$(document).ready(function () {
    $.ajax({
        url: getWarningsEndPoint,
        type: "GET",
        xhrFields: {
            withCredentials: true
        },
        success: function (response) {
            response.forEach(element => {
                $("#warnings").append("<option>" + element.WarningName + "</option>")
            });
        },
        error: function (error) {
            alert(error.responseText)
        }
    });
})

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

$("#btnCreate").on("click", async function (event) {
    event.preventDefault()
    let file = document.querySelector('#formFile').files[0]
    let image = null
    if (file != null) {
        image = await toBase64(file);
    }
    $.ajax({
        url: createPostEndPoint,
        type: "POST",
        xhrFields: {
            withCredentials: true
        },
        data: {
            "postName": $("#floatingTitle").val(),
            "content": $("#summary").val(),
            "summary": $("#content").val(),
            "image": image
        },
        success: function (response) {
            console.log(response)
        },
        error: function (error) {
            alert(error.responseText)
        }
    });
})