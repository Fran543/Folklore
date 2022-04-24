
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
        url: createStoryEndPoint,
        type: "POST",
        xhrFields: {
            withCredentials: true
        },
        data: {
            "title": $("#floatingTitle").val(),
            "summary": $("#summary").val(),
            "image": image,
            'posts': $.parseJSON('[{"content":"' + $("#content").val() + '"}]')
        },
        success: function (response) {
            console.log(response)
        },
        error: function (error) {
            alert(error.responseText)
        }
    });
})