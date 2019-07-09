//Problem: No user interaction causes any change to the application
//Solution: When user interacts, cause changes appropriately

var color = document.querySelector('.selected').css("background-color");
var $canvas = document.querySelector('canvas');
var context = $canvas[0].getContext('2d');
var clearCanvas = document.getElementById("clearCanvas");
var lastEvent;
var mouseDown = false;

//When clicking on control list items
document.querySelector(".controls").addEventListener("click", "li", function() {
  //Deselect sibling elements
  $(this).siblings().removeClass('selected');
  //Select clicked element
  $(this).addClass('selected');
  //Cache current element
  color = $(this).css("background-color");
});

//Make colorSelect dissapear when clicking outside the box
document.querySelector('#revealColorSelect').click(function(event) {
	event.stopPropagation();
	changeColor();
	document.querySelector("#colorSelect").toggle();
});


$(document).click(function(e) {
	var targetbox = $("#colorSelect");
	if(!targetbox.is(e.target) && targetbox.has(e.target).length === 0) {
		targetbox.fadeOut('fast');
	}
});

//Update the newColor span
function changeColor() {
  var r = $("#red").val();
  var g = $("#green").val();
  var b = $("#blue").val();
  $("#newColor").css("background-color", "rgb(" + r + "," + g + ", " + b + ")");
}

//When color sliders change
$("input[type=range]").on("input", changeColor);

//When add color is pressed
$("#addNewColor").click(function() {
  //Append the new color to the list
  var $newColor = $("<li></li>");
  $newColor.css('background-color', $("#newColor").css("background-color"));
  $(".controls ul").append($newColor);
  //Select the new color  
  $newColor.click();
  $("#colorSelect").hide();
});

//On mouse events on the canvas
$canvas.mousedown(function(e) {
  lastEvent = e;
  mouseDown = true;
}).mousemove(function(e) {
  //Draw lines
  if(mouseDown) {
  context.beginPath();
  context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
  context.lineTo(e.offsetX, e.offsetY);
  context.strokeStyle = color;
  context.stroke();
  lastEvent = e;
  }  
}).mouseup(function() {
  mouseDown = false;
}).mouseleave(function() {
  mouseDown = false;
})

clearCanvas.addEventListener('click', function() {
  context.clearRect(0, 0, $canvas[0].width, $canvas[0].height);
});
