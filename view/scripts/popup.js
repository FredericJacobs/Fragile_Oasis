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
		s = $("#popup .wrapper").scrollTop();
		wrapperWithMargin = (wrapperHeight-10)
		scrollPos = (wrapperWithMargin-scrollbarHeight)*(s/(contentHeight-wrapperWithMargin))+10;
		$("#popup .scrollbar").css({top: scrollPos});
	}
}

// Get Data
function popup(json) {
	// Content
	var title = json[0];
	var type = json[1].charAt(0).toUpperCase() + json[1].slice(1);
	var location = json[7]+((json[5] == "" || json[7] == "") ? "" : ", ")+json[5];
	var description = json[9];
	var imgs = $.parseJSON(json[17]);
	var link1 = json[6];
	var link2 = json[8];
	var links = [];
	if(link1 != "")
		links.push(link1);
	if(link2 != "")
		links.push(link2);
	
	var html = "";
	html += "<h1>"+location+" – "+type+"</h1>";
	html += "<h2>"+title+"</h2>";
	html += '<div class="imgs">';
	if(imgs != null) {
		for(var i = 0; i < imgs.length; i++) {
			var img = imgs[i];
			html += '<a href="'+img.href+'"><img src="'+img.src+'" alt="'+img.alt+'"></a> ';
		}
	}
	
	html += "</div>";
	html += "<p>"+description+"</p>";

	for(var i = 0; i < links.length; i++) {
		var link = links[i];
		html += '<iframe src="'+link+'"/>';
	}
	
	$("#popup .content").html(html);
	
	// Open Pop-up
	var speed = "slow";
	$("#popup").css({display: "block"});
	var height = 200;
	var width = 200;
	var marginTop = $("body>.container").innerHeight()/2-height/2;
	var marginLeft = $("body>.container").innerWidth()/2-width/2;
	
	$("#popup .frame").css({
		top: marginTop,
		bottom: marginTop,
		left: marginLeft,
		right: marginLeft
	});
	$("#popup").animate({opacity: 1}, speed, function() {
		$("#popup .frame").animate({top: 20, bottom: 20}, speed, function() {
			$("#popup .frame").animate({left: 20, right: 20}, speed, function() {
				$("#popup .content").animate({opacity: 1}, speed);
			});
		});
	});
}

function closePopup() {
	var height = 200;
	var width = 200;
	var marginTop = $("body>.container").innerHeight()/2-height/2;
	var marginLeft = $("body>.container").innerWidth()/2-width/2;
	
	$("#popup .content").html("");
	$("#popup").animate({opacity: 0}, "slow", function() {
		$("#popup .content").css({opacity: 0});
		$("#popup").css({display: "none"});
		$("#popup .frame").css({
			top: marginTop,
			bottom: marginTop,
			left: marginLeft,
			right: marginLeft
		});
	});
}
