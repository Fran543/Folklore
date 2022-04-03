
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
            $('.success').addClass("show");
            $('.success').removeClass("hide");
            $('.success').addClass("showAlert");
            $('.msg').empty()
            $('.msg').append(response)
            // $('.msg').append(response)
            setTimeout(function () {
                $('.success').removeClass("show");
                $('.success').addClass("hide");
            }, 5000);
        },
        error: function (error) {
            $('.alert').addClass("show");
            $('.alert').removeClass("hide");
            $('.alert').addClass("showAlert");
            $('.msg').empty()
            $('.msg').append(error.responseText)
            setTimeout(function () {
                $('.alert').removeClass("show");
                $('.alert').addClass("hide");
            }, 5000);
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
        success: function (response) {
            $('.success').addClass("show");
            $('.success').removeClass("hide");
            $('.success').addClass("showAlert");
            $('.msg').append(response)
            setTimeout(function () {
                $('.success').removeClass("show");
                $('.success').addClass("hide");
            }, 5000);
        },
        error: function (error) {
            $('.alert').addClass("show");
            $('.alert').removeClass("hide");
            $('.alert').addClass("showAlert");
            $('.msg').append(error.responseText)
            setTimeout(function () {
                $('.alert').removeClass("show");
                $('.alert').addClass("hide");
            }, 5000);
        }
    });
})