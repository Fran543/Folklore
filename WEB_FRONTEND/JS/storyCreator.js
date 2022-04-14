var createStoryEndPoint = "http://127.0.0.1:8091/createStory"
var getWarningsEndPoint = "http://127.0.0.1:8091/getWarnings"


// ADDING PARAGRAPHS
var numberOfOptions = 2;
var counter = 1;
var imgPlaceholder = 'imgHolder' + counter ;
$("#btnAdd").on('click', () => {
    $(".canvas").append(
        "<div class='movableParagraph'>"
            + "<div id='imgHolder"+ counter +"'></div>"
            + "<div class='paragraphImg'>"
                + "<input type='file' id='paragraphImg' accept='image/*' onchange='loadFile(event,\""+imgPlaceholder+"\")'></input>"
            + "</div>"
            + "<div class='holder'>"
                + "<div name='ddlHolder' class='ddlHolder'>"
                    + "<select multiple='multiple' id='chooser" + counter + "' class='ddlChoices'>"
                    + "</select>"
                + "</div>"
                + "<div class='storyPart' class='ui-widget-content'>"
                    + "<textarea id='paragraph" + counter + "' class='paragraph'></textarea>"
                    + "<hr>"
                    + "<div class='options'>"
                        + "<div class='number'>" + counter + "</div>"
                        + "<textarea class='option' id='option" + counter + "'></textarea>"
                        + "<div class='number'>" + (++counter) + "</div>"
                        + "<textarea class='option' id='option" + counter + "'></textarea>"
                    + "</div>"
                + "</div>"
            + "</div>"
        + "</div>"
    )
    counter++
    imgPlaceholder = 'imgHolder' + counter 
    $(".movableParagraph").draggable({
        containment: 'body'
    });

    $(".ddlChoices").empty()
    for (var i = 1; i <= numberOfOptions; i++) {

        $(".ddlChoices").append(
            "<option value='" + i + "'>" + i + "</option>"
        )
    }
    numberOfOptions += 2;
})


// DETECT USER ACTIVE/INACTIVE
var ms = 1000; // 1000 = 1 Sec | 60000 = 1 Min
var IdleTime;
$(document).ready(function () {
    IdleTime = 10;
    setIdleTimeout(IdleTime * ms);
});
document.onIdle = function () {
    console.log("user inactive")
    $(".ping").addClass('active')
    $(".myMenu").addClass('active')
}
$("body").mousemove(() => {
    $(".ping").removeClass('active')
    $(".myMenu").removeClass('active')
});


//PREVIEWING IMAGE
var loadFile = function(event, element) {
	var image = document.getElementById(element);
	//image.src = URL.createObjectURL(event.target.files[0]);
    $("#" + element).css('background-image', 'url(' + URL.createObjectURL(event.target.files[0]) + ')');
    $("#" + element).css('background-size', 'cover');
    $("#" + element).css('background-position', 'center');
    $("#" + element).css('background-repeat', 'no-repeat');
    $("#" + element).css('width', '600px');
    $("#" + element).css('height', '200px');
};


// ADD SCRIPTS DYNAMICALLY
function dynamicallyLoadScript(url) {
    var script = document.createElement("script");  // create a script DOM node
    script.src = url;  // set its src to the provided URL

    document.head.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
}

// GATHERING VARIABLES FOR UPLOAD
var holders;

function createJsonString(holders) {
    var json = '[';
    holders.forEach(function (holder, i) {
        json += '{'
            + '"content":"' + $(holder[0].children[1].children[2]).val() + '",'
            + '"choices":[{ "choiceValue":"' + $(holder[0].children[1].children[4].children[1]).val() + '"},'
            + '{"choiceValue":"' + $(holder[0].children[1].children[4].children[3]).val() + '"}],'
            + '"conditions":['

        for (let j = 0; j < $(holder[0].children[0].children[0]).find(":selected").length; j++) {
            json += $(holder[0].children[0].children[0]).find(":selected")[j].value - 1;
            if (!(j === $(holder[0].children[0].children[0]).find(":selected").length - 1)) json += ',';
        }
        json += ']}'
        if (!(i === holders.length - 1)) json += ',';
    })
    json += ']';
    console.log(json);
    return json;
}

$("#btnCreate").on('click', () => {
    $("textarea").map(function () {
        if ($(this).val().trim().length === 0) {
            $(this).css("background-color", "red");
        }
    });
    holders = $(".holder").map(function () {
        return $(this);
    }).get();



    $.ajax({
        url: createStoryEndPoint,
        type: "POST",
        xhrFields: {
            withCredentials: true
        },
        data: {
            'title': $("#floatingTitle").val(),
            'summary': $("#summary").val(),
            'posts': $.parseJSON(createJsonString(holders))
        },
        success: function (response) {
            alert(response)
        },
        error: function (error) {
            alert(error.responseText)
        }
    });
})