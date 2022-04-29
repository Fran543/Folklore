var searchItems = []

function showPost(ID) {
    window.location.href = "../HTML/postFullScreen.html?idStory=" + ID;
}

function toggleStars(id) {
    $('#star-rating' + id).toggle("slow");
}

function toggleComments(id) {
    $('#comment-rating' + id).toggle("slow");
}

function fillStories(Stories) {
    $(".cardGrid").empty()
    Stories.forEach(element => {
        var image = element.ImageBlob ? element.ImageBlob : '../IMAGES/imgPlaceholder.png'
        var warnings = ""
        console.log(element)
        $(".cardGrid").append(
            "<div class='card'>"
            + "<img class='card-img-top' src='" + image + "' alt='Card image cap'>"
            + "<div class='card-body'>"
            + "<h5 class='card-title'>" + element.StoryName + "</h5>"
            + "<p class='warnings'>"
            + warnings +
            + "</p>"
            + "<p class='card-text'>" + element.Summary + "</p>"
            + "<p class='card-text'>"
            + "<small class='text-muted'>"
            + "<i class='fas fa-star star' onClick='toggleStars(" + element.IDStory + ")'></i>1000"
            + "<i class='far fa-user'></i>admin"
            + "<i class='fas fa-calendar-alt'></i>" + new Date(element.PubDate).toDateString()
            + "<i class='fas fa-comment comment' onClick='toggleComments(" + element.IDStory + ")'></i> 4 comments"
            + "</small>"
            + "</p>"
            + "<div class='star-rating' id='star-rating" + element.IDStory + "'>"
            + "<input id='star-5' type='radio' name='rating' value='star-5' />"
            + "<label for='star-5' title='5 stars'>"
            + "<i class='active fa fa-star' aria-hidden='true'></i>"
            + "</label>"
            + "<input id='star-4' type='radio' name='rating' value='star-4' />"
            + "<label for='star-4' title='4 stars'>"
            + "<i class='active fa fa-star' aria-hidden='true'></i>"
            + "</label>"
            + "<input id='star-3' type='radio' name='rating' value='star-3' />"
            + "<label for='star-3' title='3 stars'>"
            + "<i class='active fa fa-star' aria-hidden='true'></i>"
            + "</label>"
            + "<input id='star-2' type='radio' name='rating' value='star-2' />"
            + "<label for='star-2' title='2 stars'>"
            + "<i class='active fa fa-star' aria-hidden='true'></i>"
            + "</label>"
            + "<input id='star-1' type='radio' name='rating' value='star-1' />"
            + "<label for='star-1' title='1 star'>"
            + "<i class='active fa fa-star' aria-hidden='true'></i>"
            + "</label>"
            + "</div>"
            + "<section class='mt-5 comments' id='comment-rating" + element.IDStory + "'>"
            + "<div class='container'>"
            + "<div class='row'>"
            + "<div class='col-sm-12'>"
            + "<form>"
            + "<p class='pull-left'>Add new Comment</p>"
            + "<textarea class='form-control' id='message' placeholder='Your message...' required='' maxlength='250'></textarea>"
            + "<button type='submit' class='btn btn-normal btnSubmit'>Submit</button>"
            + "</form>"
            + "<hr>"
            + "<p>Comments</p>"
            + " <div class='media'>"
            + "<h4>John Doe</h4>"
            + "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>"
            + "</div>"
            + "</div>"
            + "</div>"
            + "</div>"
            + "</section>"
            + "</div>"
            + "</div>"

        )
    });
}

function getStories() {
    $.ajax({
        url: getStoriesEndPoint,
        type: "GET",
        xhrFields: {
            withCredentials: true
        },
        success: function (response) {
            console.log(response)
            fillStories(response)
        },
        error: function (error) {
            alert(error.responseText)
        }
    });
}

function getSearchItems() {
    $.ajax({
        url: getSearchItemsEndPoint,
        type: "GET",
        xhrFields: {
            withCredentials: true
        },
        success: function (response) {
            for (const user of response[0]) {
                searchItems.push({ IDUser: user.IDUser, Username: user.Username, isUser: true })
            }
            autocomplete()
            for (const story of response[1]) {
                searchItems.push({ IDStory: story.IDStory, StoryName: story.StoryName, Summary: story.Summary, Username: story.Username, isUser: false })
            }
        },
        error: function (error) {
            alert(error.responseText)
        }
    });
}

function getTrendingStories() {
    $.ajax({
        url: getTrendingStoriesEndPoint,
        type: "GET",
        xhrFields: {
            withCredentials: true
        },
        success: function (response) {
            response.forEach(element => {
                var image = element.ImageBlob ? element.ImageBlob : '../IMAGES/imgPlaceholder.png'
                $("#postHolder").append(
                    "<div class='story_card trendingCard' id='cardGlow'>"
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
            animation()
        },
        error: function (error) {
            alert(error.responseText)
        }
    });
}

$(document).ready(function () {
    getStories();
    getTrendingStories();
    getSearchItems();
})



// searchItems.push({ id: 1, name: "Ime", isUser: true })
// searchItems.push({ id: 2, name: "Pero", isUser: true })
// searchItems.push({ id: 3, name: "Ivo", isUser: true })
// searchItems.push({ id: 4, name: "Ana", isUser: true })
// searchItems.push({ id: 5, name: "Prica", summary: "blabla", isUser: false })
// searchItems.push({ id: 6, name: "oohsad", summary: "blabla", isUser: false })
// searchItems.push({ id: 7, name: "Jasjdhs", summary: "blabla", isUser: false })


// $().ready(() => {
//     autocomplete()
// })

///////////SEARCH//////////////
//////////////////////////////
function autocomplete() {
    const searchBox = document.getElementById("searchBox")
    searchBox.onkeyup = (e) => {
        if (!$(searchBox).val()) {
            $('.autocomBox').empty();
            $('.autocomBox').css('display', 'none');
        }

        let userData = e.target.value;
        let emptyArray = [];

        if (userData) {
            emptyArray = searchItems.filter((data) => {
                if (data.isUser) {
                    return (data.Username).toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
                } else {
                    return (data.StoryName).toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
                }
            })
            emptyArray = emptyArray.map((data) => {
                if (!data.isUser) {
                    return data = '<li class="match" onClick="replace(this)" value="' + data.StoryName + '">' + data.StoryName + ' by ' + data.Username + '</li>';
                } else {
                    return data = '<li class="match" onClick="replace(this)" value="' + data.Username + '">' + data.Username + '</li>';
                }
            });
            ShowSuggestions(emptyArray);
        }
    }
}

function ShowSuggestions(list) {
    let listData;
    listData = list.join('');
    $('.autocomBox').html(listData);
    $('.autocomBox').css('display', 'block');
}

function replace(element) {
    console.log(element.getAttribute("value"))
    searchBox.value = element.getAttribute("value");
}

$('#btnSearch').on('click', () => {
    var items = []
    searchItems.forEach(element => {
        if (element.isUser) {
            if (element.Username.toLocaleLowerCase() === searchBox.value.toLocaleLowerCase()) {
                console.log(element);
                items.push(element);
            }
        } else {
            if (element.StoryName.toLocaleLowerCase() === searchBox.value.toLocaleLowerCase()) {
                console.log(element);
                items.push(element);
            }
        }

    })
    fillStories(items);
})

//////////// TRENDING CONTAINER
function animation() {
    CSSPlugin.defaultTransformPerspective = 400;
    gsap.to(".trendingTitle", { duration: 3, repeat: -1, rotationX: 360 });

    gsap.to(".trendingCard", {
        duration: 20,
        ease: "none",
        x: "+=500", //move each box 500px to right
        modifiers: {
            x: gsap.utils.unitize(x => parseFloat(x) % 500) //force x value to be between 0 and 500 using modulus
        },
        repeat: -1
    });
}