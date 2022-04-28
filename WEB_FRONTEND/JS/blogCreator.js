
$(document).ready(function () {
    $.ajax({
        url: getWarningsEndPoint,
        type: "GET",
        xhrFields: {
            withCredentials: true
        },
        success: function (response) {
            response.forEach(element => {
                $("#myMulti").append("<option>" + element.WarningName + "</option>")
            });
        },
        error: function (error) {
            alert(error.responseText)
        }
    });
})

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

$("#btnCreate").on("click", async function (event) {
    event.preventDefault()
    let file = document.querySelector('#formFile').files[0]
    let image = null
    if (file != null) {
        image = await toBase64(file);
    }
    $.ajax({
        url: createStoryEndPoint,
        type: "POST",
        xhrFields: {
            withCredentials: true
        },
        data: {
            "title": $("#floatingTitle").val(),
            "summary": $("#summary").val(),
            "image": image,
            'posts': $.parseJSON('[{"content":"' + $("#content").val() + '"}]')
        },
        success: function (response) {
            console.log(response)
        },
        error: function (error) {
            alert(error.responseText)
        }
    });
})

//PREVIEWING IMAGE
var loadFile = function (event, element) {
    var image = document.getElementById(element);
    //image.src = URL.createObjectURL(event.target.files[0]);
    $("#" + element).css('background-image', 'url(' + URL.createObjectURL(event.target.files[0]) + ')');
    $("#" + element).css('background-size', 'contain');
    $("#" + element).css('background-position', 'center');
    $("#" + element).css('background-repeat', 'no-repeat');
    $("#" + element).css('width', '100%');
    $("#" + element).css('height', '100%');
};

//ADD/REMOVE WARNINGS
$('#myMulti').change(() => {
    var e = document.getElementById("myMulti");
    var selectedWarning = e.value;

    $('.lblWarning').append(
        "<div class='btnWarning'>"
        + "<p>" + selectedWarning + "</p>"
        + "<i class='bx bx-x icon' onClick='removeWarning(this)' id='" + selectedWarning + "'></i>"
        + "</div>"
    )

    $('option:selected', '#myMulti').remove();
    
    	
    $('#' + selectedWarning).mouseenter(() => {$('#' + selectedWarning).addClass('bx-spin bx-rotate-90')})
                .mouseleave(() => {$('#' + selectedWarning).removeClass('bx-spin bx-rotate-90')});
})

function removeWarning(warning){
    $(warning).parent('div').remove();
    $('#myMulti').append("<option>" + $(warning).attr('id') + "</option>")
}

//DELETE POST
$("#btnDelete").click(function () {
    var answer = window.confirm("By countinuing your progress will be lost? Please confirm:");
    if (answer) {
        $('textarea').val('');
        $('input').val('');
        $('.lblWarning').empty().append('Warnings')
        $('#imgHolder').css('background-image', '');
    }
});