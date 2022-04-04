$("#btnAdd").on('click',() => {
    $(".canvas").append(
        "<div class='holder'>"
            +"<div class='storyPart' class='ui-widget-content'>"
                + "<textarea>sdfdsfsfsfsf</textarea>"
                + "<hr>"
                +"<div class='options'>"
                    + "<button type='button' class='btn btn-secondary' title='sdfsf' data-bs-container='body' data-bs-toggle='popover' data-bs-placement='bottom' data-bs-content='sdfs' data-bs-original-title='OPTION 01'>OPTION 01</button>"
                    + "<button type='button' class='btn btn-secondary' title='' data-bs-container='body' data-bs-toggle='popover' data-bs-placement='bottom' data-bs-content='' data-bs-original-title='OPTION 02'>OPTION 02</button>"
                +"</div>"
            +"</div>"
            +"<div>"
                +"<select multiple='multiple' id='myMulti' class='ddlChoices'>"
                    +"<option>1</option>"
                    +"<option>2</option>"
                    +"<option>3</option>"
                    +"<option>4</option>"
                    +"<option>5</option>"
                +"</select>"
            +"</div>"
        +"</div>"
    )
    
    $( ".holder" ).draggable();

    dynamicallyLoadScript("../JS/multiselectDropDown.js")
})

var ms = 1000; // 1000 = 1 Sec | 60000 = 1 Min
var IdleTime;
$(document).ready(function () {
    IdleTime = 10;
    setIdleTimeout(IdleTime * ms);
});
document.onIdle = function () {
    console.log("user inactive")
    $(".ping").addClass('active')
    $(".menu").addClass('active')
}
$( "body" ).mousemove( ()=> {
    $(".ping").removeClass('active')
    $(".menu").removeClass('active')
  });



function dynamicallyLoadScript(url) {
    var script = document.createElement("script");  // create a script DOM node
    script.src = url;  // set its src to the provided URL
   
    document.head.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
}