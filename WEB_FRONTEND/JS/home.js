var getStoriesEndPoint = "http://127.0.0.1:8091/getStories"
var getSearchItemsEndPoint = "http://127.0.0.1:8091/getSearchItems"
var getLogOutPoint = "http://127.0.0.1:8091/logout"

var searchItems = []

// function showPost(ID) {
//     window.location.href = "../HTML/postFullScreen.html?idStory=" + ID;
// }

// $(document).ready(function () {
//     $.ajax({
//         url: getStoriesEndPoint,
//         type: "GET",
//         xhrFields: {
//             withCredentials: true
//         },
//         success: function (response) {
//             response.forEach(element => {
//                 console.log(element)
//                 var image = element.ImageBlob ? element.ImageBlob : '../IMAGES/imgPlaceholder.png'
//                 $("#postsContainer").append(
//                     "<div class='story_card' id='cardGlow'>"
//                     + "<div class='info_section' onClick='showPost(" + element.IDStory + ")'>"
//                     + "<div class='row'>"
//                     + "<div class='col-12 d-md-none'>"
//                     + "<img src='" + image + " 'alt='image' class='img-fluid'>"
//                     + "</div>"
//                     + "<div class='col-12 col-md-6 text-center'>"
//                     + "<h1>" + element.StoryName + "</h1>"
//                     //+ "<h4>" + element.PubDate + "</h4>"
//                     + "<div class='warnings'>"
//                     + "<button type=button' class='btn btn-success disabled' disabled>Success</button>"
//                     + "<button type='button' class='btn btn-info disabled' disabled>Info</button>"
//                     + "<button type='button' class='btn btn-warning disabled' disabled>Warning</button>"
//                     + "<button type='button' class='btn btn-danger disabled' disabled>Danger</button>"
//                     + "</div>"
//                     + "</div>"
//                     + "</div>"
//                     + "<div class='story_desc'>"
//                     + "<p class='text'>" + element.Summary + "</p>"
//                     + "</div>"
//                     + "<div class='story_social'>"
//                     + "<ul>"
//                     + "<li><i class='material-icons-outlined'><span class='material-icons'>share</span></i></li>"
//                     + "<li><i class='material-icons-outlined'><span class='material-icons'>favorite_border</span></i></li>"
//                     + "<li><i class='material-icons-outlined'><span class= 'material-icons' > chat_bubble_outline</span ></i ></li >"
//                     + "</ul>"
//                     + "</div>"
//                     + "</div>"
//                     + "<div class='blur_back card_back'></div>"
//                     + "</div>"

//                 )
//             });
//         },
//         error: function (error) {
//             alert(error.responseText)
//         }
//     });
//     $.ajax({
//         url: getSearchItemsEndPoint,
//         type: "GET",
//         xhrFields: {
//             withCredentials: true
//         },
//         success: function (response) {
//             for (const user of response[0]) {
//                 searchItems.push({ id: user.IDUser, name: user.Username, isUser: true })
//             }
//             autocomplete()
//             for (const story of response[1]) {
//                 searchItems.push({ id: story.IDStory, name: story.StoryName, summary: story.Summary, isUser: false })
//             }
//             console.log(searchItems)
//         },
//         error: function (error) {
//             alert(error.responseText)
//         }
//     });
// })

// $("#option1").on("click", () => {
//     $.ajax({
//         url: getLogOutPoint,
//         type: "GET",
//         xhrFields: {
//             withCredentials: true
//         },
//         success: function (response) {
//             alert(response)
//         },
//         error: function (error) {
//             alert(error.responseText)
//         }
//     });
// })

searchItems.push({ id: 1, name: "Ime", isUser: true })
searchItems.push({ id: 2, name: "Pero", isUser: true })
searchItems.push({ id: 3, name: "Ivo", isUser: true })
searchItems.push({ id: 4, name: "Ana", isUser: true })
searchItems.push({ id: 5, name: "Prica", summary: "blabla", isUser: false })
searchItems.push({ id: 6, name: "oohsad", summary: "blabla", isUser: false })
searchItems.push({ id: 7, name: "Jasjdhs", summary: "blabla", isUser: false })
$().ready(() => {
    autocomplete()
})
function autocomplete() {
    const searchBox = document.getElementById("searchBox")
    searchBox.onkeyup = (e) => {
        if (!$(searchBox).val()) {
            $('.autocom-box').empty();
        }

        let userData = e.target.value;
        let emptyArray = [];

        if (userData) {
            emptyArray = searchItems.filter((data) => {
                return (data.name).toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
            })
            emptyArray = emptyArray.map((data) => {
                return data = '<li class="match">' + data.name + '</li>';
            });
            ShowSuggestions(emptyArray);
        }
    }
}

function ShowSuggestions(list) {
    let listData;
    listData = list.join('');
    $('.autocom-box').html(listData);
    $('.autocom-box').css('display', 'block');
}

$(".match").on('click', () => {
    alert(this);
    searchBox.value = this.innerHTML;
});


//////////// TRENDING CONTAINER
CSSPlugin.defaultTransformPerspective = 400; 
gsap.to(".trendingTitle", {duration: 3, repeat: -1, rotationX: 360});

gsap.to(".trendingCard", {
  duration: 20,
  ease: "none",
  x: "+=500", //move each box 500px to right
  modifiers: {
    x: gsap.utils.unitize(x => parseFloat(x) % 500) //force x value to be between 0 and 500 using modulus
  },
  repeat: -1
});