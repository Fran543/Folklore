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
                $("#postsContainer").append(
                    "<div class='postCard'>"
                    + "<p>" + element.PubDate + "</p>"
                    + "<img src='" + element.ImageBlob + "'/>"
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
                    // + "<img src='data:image/png;base64," + element.ImageBlob + "' class='card__image' alt='' />"
                    // + "<h3 class='card__title'>" + element.PostName + "</h3>"
                    // + "<span class='card__pubDate'>" + element.PubDate + "</span>"
                    // + "<span class='card__summary'>" + element.Summary + "</span>"
                    // + "<p class='card__content'>" + element.Content + "</p >"
                    // + "<div>"
                    // + "</div >"
                )
            });
        },
        error: function (error) {
            alert(error.responseText)
        }
    });
})