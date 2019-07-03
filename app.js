//Problem: No user interaction causes any change to the application
//Solution: When user interacts, cause changes appropriately

var color = $(".selected").css("background-color");
var $canvas = $("canvas");
var context = $canvas[0].getContext("2d");
var lastEvent;
var mouseDown = false;

//When clicking on control list items
$(".controls").on("click", "li", function() {
  //Deselect sibling elements
  $(this).siblings().removeClass('selected');
  //Select clicked element
  $(this).addClass('selected');
  //Cache current element
  color = $(this).css("background-color");
});
  

//When new color is pressed
//$("#revealColorSelect").click(function() {
  //Show color select or hide the color select
//  changeColor();
// $("#colorSelect").toggle();
//});

//Make colorSelect dissapear when clicking outside the box
$(document).ready(function() {
	$('#revealColorSelect').click(function(event) {
		event.stopPropagation();
		$("#colorSelect").toggle();
	});
});


$(document).click(function(e) {
	var targetbox = $('#colorSelect');
	if(!targetbox.is(e.target) && targetbox.has(e.target).length === 0) {
		$("#colorSelect").toggle();
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
});;
