// ADDING DIVS
var numberOfOptions=2;
var counter=1;
$("#btnAdd").on('click',() => {
    $(".canvas").append(
        "<div class='holder'>"
            +"<div name='ddlHolder'>"
                +"<select multiple='multiple' id='chooser" + counter + "' class='ddlChoices'>"
                +"</select>"
            +"</div>"
            +"<div class='storyPart' class='ui-widget-content'>"
                + "<textarea id='paragraph" + counter + "'>sdfdsfsfsfsf</textarea>"
                + "<hr>"
                +"<div class='options'>"
                    + "<div class='number'>" + counter + "</div>"
                    + "<textarea class='option' id='option" + counter + "'></textarea>"
                    + "<div class='number'>" + (++counter) + "</div>"
                    + "<textarea class='option' id='option" + counter + "'></textarea>"
                +"</div>"
            +"</div>"
        +"</div>"
    )
    counter++
    $( ".holder" ).draggable();
    
    $(".ddlChoices").empty()
    for(var i=1; i<=numberOfOptions; i++){

        $(".ddlChoices").append(
            "<option>" + i + "</option>"
        )
    }
    numberOfOptions+=2;







    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ej2_diagrams_1 = require("@syncfusion/ej2-diagrams");
    var port1 = {
        style: {
            strokeColor: '#366F8C',
            fill: '#366F8C'
        }
    };
    port1.shape = 'Circle';
    port1.id = 'nodeportnew';
    port1.visibility = ej2_diagrams_1.PortVisibility.Visible;
    port1.id = 'port';
    port1.offset = {
        x: 1,
        y: 1
    };
    var port2 = {
        style: {
            strokeColor: '#366F8C',
            fill: '#366F8C'
        }
    };
    port2.offset = {
        x: 1,
        y: 0.5
    };
    port2.id = 'port1';
    port2.visibility = ej2_diagrams_1.PortVisibility.Visible;
    port2.shape = 'Circle';
    var port3 = {
        style: {
            strokeColor: '#366F8C',
            fill: '#366F8C'
        }
    };
    port3.offset = {
        x: 0,
        y: 1
    };
    port3.id = 'newnodeport1';
    port3.visibility = ej2_diagrams_1.PortVisibility.Visible;
    port3.shape = 'Circle';
    var nodes = [{
            id: 'node',
            width: 100,
            height: 100,
            offsetX: 100,
            offsetY: 100,
            ports: [port1]
        },
        {
            id: 'node1',
            width: 100,
            height: 100,
            offsetX: 300,
            offsetY: 100,
            ports: [port2, port3]
        },
    ];
    var connectors = {
        id: "connector1",
        sourcePoint: {
            x: 100,
            y: 100
        },
        type: 'Orthogonal',
        targetPoint: {
            x: 200,
            y: 200
        },
        sourceID: 'node',
        targetID: 'node1',
        sourcePortID: 'port',
        targetPortID: 'port1'
    };
    var diagram = new ej2_diagrams_1.Diagram({
        width: 900,
        height: 900,
        nodes: nodes,
        connectors: [connectors],
        getNodeDefaults: function (node) {
            node.height = 100;
            node.width = 100;
            node.style.fill = '#6BA5D7';
            node.style.strokeColor = 'white';
            return node;
        },
    });
    diagram.appendTo('body');
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
    $(".menu").addClass('active')
}
$( "body" ).mousemove( ()=> {
    $(".ping").removeClass('active')
    $(".menu").removeClass('active')
  });


// ADD SCRIPTS DYNAMICALLY
function dynamicallyLoadScript(url) {
    var script = document.createElement("script");  // create a script DOM node
    script.src = url;  // set its src to the provided URL
   
    document.head.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
}