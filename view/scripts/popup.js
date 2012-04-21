// Scollbar
var scrollbarVisible = true;
$().ready(function() {
	$(".wrapper").bind("scroll", function() {updateScrollbar()});
	$(window).bind("resize", function() {updateScrollbar()});
	updateScrollbar();
});

function updateScrollbar() {
	contentHeight = $("#popup .content").outerHeight(true);
	wrapperHeight = $("#popup .wrapper").height();
	
	if(contentHeight <= wrapperHeight) {
		if(scrollbarVisible) {
			$("#popup .scrollbar").css({visibility: "hidden"});
			scrollbarVisible = false;
		}
	}
	else {
		if(!scrollbarVisible) {
			$("#popup .scrollbar").css({visibility: "visible"});
			scrollbarVisible = true;
		}
		// Size
		scrollbarHeight = (wrapperHeight*wrapperHeight)/contentHeight;
		$("#popup .scrollbar").css({height: scrollbarHeight});
		// Position
		//console.log(scrollPos = $("#popup .wrapper").scrollTop());
		s = $("#popup .wrapper").scrollTop();
		wrapperWithMargin = (wrapperHeight-10)
		scrollPos = (wrapperWithMargin-scrollbarHeight)*(s/(contentHeight-wrapperWithMargin))+10;
		$("#popup .scrollbar").css({top: scrollPos});
	}
}

// Display Data


// Get Data
function popup(json) {
	console.log("Not implemented yet...")
}
