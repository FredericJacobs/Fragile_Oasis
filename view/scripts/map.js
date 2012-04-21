function initialize() {
	var options = {
		center: new google.maps.LatLng(46.520263,6.564758),
		zoom: 13,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map_canvas"), options);
}
