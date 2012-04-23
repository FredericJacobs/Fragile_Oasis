// Scollbar
var scrollbarVisible = false;
var animation = true;

$().ready(function() {
	$(".wrapper").bind("scroll", function() {updateScrollbar()});
	$(window).bind("resize", function() {updateScrollbar()});
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
		wrapperWithMargin = (wrapperHeight-30)
		scrollPos = (wrapperWithMargin-scrollbarHeight)*(s/(contentHeight-wrapperWithMargin))+30;
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
	var loc = json[11].split(' ').join('');
	var imgs = $.parseJSON(json[18]);
	var link1 = json[6];
	var link2 = json[8];
	var links = [];
	if(link1 != "")
		links.push(link1);
	if(link2 != "")
		links.push(link2);
	var followers = $.parseJSON(json[15]);
	loadTweets(loc);
	
	var html = "";
	html += "<h1>"+location+" &mdash; "+type+"</h1>";
	html += "<h2>"+title+"</h2>";
	html += '<div class="imgs">';
	for(var i = 0; i < imgs.length; i++) {
		var img = imgs[i];
		html += '<a href="'+img.href+'"><img src="'+img.src+'" alt="'+img.alt+'"></a>';
	}
	html += "</div>";
	
	html += '<div class="followers">';
	for(key in followers) {
		html += '<a href="'+key+'">'+followers[key]+"</a> ";
	}

	html += "</div>";
	html += '<p class="description">'+description+"</p>";
	
	for(var i = 0; i < links.length; i++) {
		var link = links[i];
		html += '<iframe src="'+link+'"/>';
	}
	
	html += '<div class="tweets"><img src="img/loading-bar.gif" alt="Loading..."></div>';
	
	$("#popup .content").html(html);
	
	// Open Pop-up
	if(animation)
		var speed = "slow";
	else
		var speed = 0;
	
	$("#popup").css({display: "block"});
	var height = 200;
	var width = 280;
	var marginTop = $("body > .container").innerHeight()/2-height/2;
	var marginLeft = $("body > .container").innerWidth()/2-width/2;
	
	$("#popup .frame").css({
		top: marginTop,
		bottom: marginTop,
		left: marginLeft,
		right: marginLeft
	});
	
	// max-width: 875px;
	var containerW = $("body > .container").innerWidth();
	var newWidth = (containerW/2-20)*2;
	if(newWidth >= 875)
		newWidth = 875;

	var finalMarginLeft = (containerW-newWidth)/2;
		
	$("#popup").animate({opacity: 1}, speed, function() {
		$("#popup .frame").animate({top: 20, bottom: 20}, speed, function() {
			$("#popup .frame").animate({left: finalMarginLeft, right: finalMarginLeft}, speed, function() {
				updateScrollbar();
				$("#popup .content").animate({opacity: 1}, speed);
			});
		});
	});

	function loadTweets(loc) {
		var range = 30;
		var callback = addTweets;
		$("head").append('<script id="tweets" src="http://search.twitter.com/search.json?rpp=10&include_entities=true&result_type=mixed&geocode='+loc+','+range+'mi&callback=addTweets"></script>');
	}
}

function addTweets(tweetJson) {
	var mention = false;
	var tweetHtml = "";
	tweets = tweetJson.results;
	
	tweetHtml += "<h2>Twitter</h2>";
	var N = 10;
	var n = N;
	for(var i = 0; i < tweets.length && i < n; i++) {
		var id = tweets[i].id_str;
		var text = tweets[i].text;
		var date = tweets[i].created_at;
		var user = tweets[i].from_user;
		var userName = tweets[i].from_user_name;
		console.log(":",userName);
		var userId = tweets[i].from_user_id;
		var retweet = tweets[i].metadata.recent_retweets;
		var img = tweets[i].profile_image_url;
		
		if(text.charAt(0) != "@" || mention) {
			tweetHtml += '<blockquote class="twitter-tweet">';
			tweetHtml += '<p>'+text+'</p>';
			tweetHtml += '&mdash; '+userName+' (@'+user+') <a href="https://twitter.com/'+user+'/status/'+id+'">'+date+'</a>';
			tweetHtml += '</blockquote>';

			if((N-n+i)%2 === 1)
				tweetHtml += "<div style='clear:both;'></div>";
		}
		else
			n++;
	}
	tweetHtml += '<script src="//platform.twitter.com/widgets.js" charset="utf-8"></script>';
	tweetHtml += '</div>';
	$("#popup .tweets").html(tweetHtml);
}

function closePopup() {
	var height = 200;
	var width = 200;
	var marginTop = $("body > .container").innerHeight()/2-height/2;
	var marginLeft = $("body > .container").innerWidth()/2-width/2;
	
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
		$("#popup .scrollbar").css({visibility: "hidden"});
		scrollbarVisible = false;
	});
}
