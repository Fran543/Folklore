var createPostEndPoint = "http://127.0.0.1:8091/createPost"

$("#btnCreate").on("click", function (event) {
    event.preventDefault()
    $.ajax({
        url: createPostEndPoint,
        type: "POST",
        data: {
            "postName": "Novi post",
            "content": "jfisadsadsad sd a sasm jm ojgoidsadas egj grg",
            "summary": "jm ojgoi egj grg"
        },
        success: function (response) {
            console.log(response)
        },
        error: function (error) {
            alert(error.responseText)
        }
    });
})