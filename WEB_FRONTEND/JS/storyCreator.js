$("#btnAdd").on('click',() => {
    $(".canvas").append(
        "<div class='storyPart' class='ui-widget-content'>"
            + "<textarea>sdfdsfsfsfsf</textarea>"
            + "<hr>"
            + "<button type='button' class='btn btn-secondary' title='sdfsf' data-bs-container='body' data-bs-toggle='popover' data-bs-placement='bottom' data-bs-content='sdfs' data-bs-original-title='OPTION 01'>OPTION 01</button>"
            + "<button type='button' class='btn btn-secondary' title='' data-bs-container='body' data-bs-toggle='popover' data-bs-placement='bottom' data-bs-content='' data-bs-original-title='OPTION 02'>OPTION 02</button>"
        +"</div>"
    )
    $( function() {
        $( ".storyPart" ).draggable();
    } );
})

var ms = 1000; // 1000 = 1 Sec | 60000 = 1 Min
var IdleTime;
$(document).ready(function () {
    IdleTime = 10;
    setIdleTimeout(IdleTime * ms);
});
document.onIdle = function () {
    console.log("user inactive")
}