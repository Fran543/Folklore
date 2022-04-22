(function () {
    window.addEventListener('scroll', function (event) {
        var depth, layer, layers, movement, topDistance, translate3d, _i, _len;
        topDistance = this.pageYOffset;
        layers = document.querySelectorAll("[data-type='parallax']");
        for (_i = 0, _len = layers.length; _i < _len; _i++) {
            layer = layers[_i];
            depth = layer.getAttribute('data-depth');
            movement = -(topDistance * depth);
            translate3d = 'translate3d(0, ' + movement + 'px, 0)';
            layer.style['-webkit-transform'] = translate3d;
            layer.style['-moz-transform'] = translate3d;
            layer.style['-ms-transform'] = translate3d;
            layer.style['-o-transform'] = translate3d;
            layer.style.transform = translate3d;
        }
    });

}).call(this);

var getStoryByIdEndPoint = "http://127.0.0.1:8091/getStoryById"
var getPostByChoiceIdEndPoint = "http://127.0.0.1:8091/getPostByChoiceId"

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idStory = urlParams.get('idStory')

function getNextPost(idChoice) {
    $.ajax({
        url: getPostByChoiceIdEndPoint,
        type: "GET",
        xhrFields: {
            withCredentials: true
        },
        data: {
            "idChoice": idChoice,
        },
        success: function (response) {
            if (response[0].length === 0) {
                $("#postContainer").append("<a href=''>The End</a>");
                $("#optionRow").css("display", "none");
            } else {
                $("#postContainer").append("<p>" + response[0][0].Content + "</p>");
                if (response[1].length != 0) {
                    $("#option1").empty();
                    $("#option2").empty();
                    $("#option1").append(response[1][0].Content);
                    $("#option2").append(response[1][1].Content);
                    $("#option1").unbind('click');
                    $("#option2").unbind('click');
                    $("#option1").on("click", () => getNextPost(response[1][0].IDChoice));
                    $("#option2").on("click", () => getNextPost(response[1][1].IDChoice));
                }
                console.log(response)
            }
        },
        error: function (error) {
            alert(error.responseText)
        }
    });
}

$(document).ready(function () {
    $.ajax({
        url: getStoryByIdEndPoint,
        type: "GET",
        xhrFields: {
            withCredentials: true
        },
        data: {
            "idStory": idStory,
        },
        success: function (response) {
            $("#title").append(response[0][0].StoryName);
            $("#postContainer").append("<p>" + response[1][0].Content + "</p>");
            if (response[2].length != 0) {
                opt1ID = response[2][0].IDChoice
                opt2ID = response[2][1].IDChoice
                $("#option1").append(response[2][0].Content);
                $("#option2").append(response[2][1].Content);
                $("#option1").on("click", () => getNextPost(response[2][0].IDChoice));
                $("#option2").on("click", () => getNextPost(response[2][1].IDChoice));
            }
        },
        error: function (error) {
            alert(error.responseText)
        }
    });
})

$("#btnLogOut").on("click", () => {
    $.ajax({
        url: getLogOutPoint,
        type: "GET",
        xhrFields: {
            withCredentials: true
        },
        success: function (response) {
            alert(response)
        },
        error: function (error) {
            alert(error.responseText)
        }
    });
})

