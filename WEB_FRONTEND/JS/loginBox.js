const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

var endPoint = "http://127.0.0.1:8091/register"

$(document).ready(function () {
    console.log("ready!");

    console.log($("#username").val());
});

// $.getJSON(endpoint, function (data) {
//     var podaci = []
//     for (var i = 0; i < data.length;i++) {
//         podaci.push
//     }
// })
$("#loginForm").submit(function (event) {
    event.preventDefault()
    $.ajax({
        url: endPoint,
        type: "POST",
        data: {
            "username": $("#username").val(),
            "email": $("#email").val(),
            "password": $("#password").val(),
            "passwordConfirm": $("#passwordConfirm").val()
        },
        success: function (response) {
            console.log(response)
        },
        error: function (error) {
            console.log(error.responseText)
        }
    });
})

