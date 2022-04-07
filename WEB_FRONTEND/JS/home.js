var getStoriesEndPoint = "http://127.0.0.1:8091/getStories"



$(document).ready(function () {
    $.ajax({
        url: getStoriesEndPoint,
        type: "GET",
        xhrFields: {
            withCredentials: true
        },
        success: function (response) {
            response.forEach(element => {
                var image = element.ImageBlob ? element.ImageBlob : '../IMAGES/imgPlaceholder.png'
                $("#postsContainer").append(
                    "<div class='postCard'>"
                    + "<p>" + element.PubDate + "</p>"
                    + "<img src='" + image + "'/>"
                    + "<h2>" + element.StoryName + "</h2>"
                    + "<div class='warnings'>"
                    + "<button type=button' class='btn btn-success disabled' disabled>Success</button>"
                    + "<button type='button' class='btn btn-info disabled' disabled>Info</button>"
                    + "<button type='button' class='btn btn-warning disabled' disabled>Warning</button>"
                    + "<button type='button' class='btn btn-danger disabled' disabled>Danger</button>"
                    + "</div>"
                    + "<textarea readonly>" + element.Summary + "</textarea>"
                    + "<div class='btns'>"
                    + "<button><i class='fa fa-comment'></i></button>"
                    + "<button><i class='fa fa-star'></i></button>"
                    + "<button><i class='fa fa-book'></i></button>"
                    + "</div>"
                    + "</div>"

                )
            });
        },
        error: function (error) {
            alert(error.responseText)
        }
    });
})