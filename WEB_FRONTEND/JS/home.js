var getStoriesEndPoint = "http://127.0.0.1:8091/getStories"
var getLogOutPoint = "http://127.0.0.1:8091/logout"

function showPost(ID) {
    window.location.href = "../HTML/postFullScreen.html?idStory=" + ID;
}

$(document).ready(function () {
    $.ajax({
        url: getStoriesEndPoint,
        type: "GET",
        xhrFields: {
            withCredentials: true
        },
        success: function (response) {
            response.forEach(element => {
                console.log(element)
                var image = element.ImageBlob ? element.ImageBlob : '../IMAGES/imgPlaceholder.png'
                $("#postsContainer").append(
                    "<div class='story_card' id='cardGlow'>"
                    + "<div class='info_section' onClick='showPost(" + element.IDStory + ")'>"
                    + "<div class='row'>"
                    + "<div class='col-12 d-md-none'>"
                    + "<img src='" + image + " 'alt='image' class='img-fluid'>"
                    + "</div>"
                    + "<div class='col-12 col-md-6 text-center'>"
                    + "<h1>" + element.StoryName + "</h1>"
                    //+ "<h4>" + element.PubDate + "</h4>"
                    + "<div class='warnings'>"
                    + "<button type=button' class='btn btn-success disabled' disabled>Success</button>"
                    + "<button type='button' class='btn btn-info disabled' disabled>Info</button>"
                    + "<button type='button' class='btn btn-warning disabled' disabled>Warning</button>"
                    + "<button type='button' class='btn btn-danger disabled' disabled>Danger</button>"
                    + "</div>"
                    + "</div>"
                    + "</div>"
                    + "<div class='story_desc'>"
                    + "<p class='text'>" + element.Summary + "</p>"
                    + "</div>"
                    + "<div class='story_social'>"
                    + "<ul>"
                    + "<li><i class='material-icons-outlined'><span class='material-icons'>share</span></i></li>"
                    + "<li><i class='material-icons-outlined'><span class='material-icons'>favorite_border</span></i></li>"
                    + "<li><i class='material-icons-outlined'><span class= 'material-icons' > chat_bubble_outline</span ></i ></li >"
                    + "</ul>"
                    + "</div>"
                    + "</div>"
                    + "<div class='blur_back card_back'></div>"
                    + "</div>"

                )
            });
        },
        error: function (error) {
            alert(error.responseText)
        }
    });
})

$("#option1").on("click", () => {
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