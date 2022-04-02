
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

var registerEndPoint = "http://127.0.0.1:8091/register"
var loginEndPoint = "http://127.0.0.1:8091/login"

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
$("#registerForm").submit(function (event) {
    event.preventDefault()
    $.ajax({
        url: registerEndPoint,
        type: "POST",
        data: {
            "username": $("#username").val(),
            "email": $("#email").val(),
            "password": $("#password").val(),
            "passwordConfirm": $("#passwordConfirm").val()
        },
        success: function (response) {
            alert(response)
        },
        error: function (error) {
            alert(error.responseText)
        }
    });
})

$("#loginForm").submit(function (event) {
    event.preventDefault()
    $.ajax({
        url: loginEndPoint,
        type: "POST",
        data: {
            "email": $("#lEmail").val(),
            "password": $("#lPassword").val()
        },
        success: function (response, request) {
            console.log(response)
        },
        error: function (error) {
            alert(error.responseText)
        }
    });
})

