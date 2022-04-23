var getUserLibraryEndPoint = "http://127.0.0.1:8091/getUserLibrary"
var removeStoryFromUserEndPoint = "http://127.0.0.1:8091/removeStoryFromUser"

function showPost(ID) {
    window.location.href = "../HTML/postFullScreen.html?idStory=" + ID;
}
function removeStory(storyID) {
    $.ajax({
        url: removeStoryFromUserEndPoint,
        type: "GET",
        xhrFields: {
            withCredentials: true
        },
        data: {
            storyID: storyID
        },
        success: function (response) {
            console.log(response)
            window.location.href = "../HTML/library.html"
        },
        error: function (error) {
            alert(error.responseText)
        }
    });
}

$(document).ready(function () {
    $.ajax({
        url: getUserLibraryEndPoint,
        type: "GET",
        xhrFields: {
            withCredentials: true
        },
        success: function (response) {
            response.forEach(element => {
                console.log(element)
                var image = element.ImageBlob ? element.ImageBlob : '../IMAGES/imgPlaceholder.png'
                $("#carouselContainer").append(
                    "<div class='carousel-item'>"
                    + "<div class= 'story_card' id = 'cardGlow' >"
                    + "<div class='info_section'>"
                    + "<div class='row'>"
                    + "<div class='col-12 d-md-none'>"
                    + "<img src='" + image + "' alt='image' class='img-fluid'>"
                    + "</div>"
                    + "<div class='col-12 col-md-6 text-start'>"
                    + "<h1 id='lbTitle'>"
                    + element.StoryName
                    + "</h1>"
                    + "<div class='warnings'>"
                    + "<span>Warning</span>"
                    + "<span> | </span>"
                    + "<span>Warning</span>"
                    + "<span> | </span>"
                    + "<span>Warning</span>"
                    + "<span> | </span>"
                    + "<span>Warning</span>"
                    + "</div>"
                    + "</div>"
                    + "</div>"
                    + "<div class='story_desc'>"
                    + "<p class='text'>"
                    + element.Summary
                    + "</p>"
                    + "</div>"
                    + "<div class='story_social'>"
                    + "<button onclick='showPost(" + element.IDStory + ")' class='btns first'>"
                    + "<i class='material-icons-outlined'> play_arrow</i>"
                    + "<p>Read</p>"
                    + "</button>"
                    + "<button onclick='removeStory(" + element.IDStory + ")' class='btns second'>"
                    + "<i class='material-icons-outlined'>remove</i>"
                    + "<p>Remove</p>"
                    + "</button>"
                    + "</div>"
                    + "</div>"
                    + "<div class='blur_back card_back'></div>"
                    + "</div>"
                    + "</div >"

                )
            });
        },
        error: function (error) {
            alert(error.responseText)
        }
    });
})