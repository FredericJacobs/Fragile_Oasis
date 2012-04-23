function initialize() {
	positionColumn = 4;
	categoryColumn = 1;
	markersArray = [];
	UnSelectedCategories = new Array();
	
	if(isMobile) {
		popoverIsDisplayed = new Boolean();
		popoverIsDisplayed = false;
	}
	
	var myOptions = {
		center: new google.maps.LatLng(46.519776,6.565533),
		zoom: 3,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById("map_canvas"),
	myOptions);

	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			map.setCenter(pos);
		}, function() {
			handleNoGeolocation(true);
		});
	} else {
		// Browser doesn't support Geolocation
		handleNoGeolocation(false);
	}
	
	getData(3616702);

	function handleNoGeolocation(errorFlag) {
  		if (errorFlag) {
    		var content = 'Error: The Geolocation service failed.';
  		} 
		
		else {
    		var content = 'Error: Your browser doesn\'t support geolocation.';
  		}

		var options = {
			map: map,
			position: new google.maps.LatLng(60, 105),
			content: content
		};
	}

	function getData(table) {
		// Builds a Fusion Tables SQL query and hands the result to dataHandler()

		var queryUrlHead = 'http://www.google.com/fusiontables/api/query?sql=';
		var queryUrlTail = '&jsonCallback=?'; // ? could be a function name

		// write your SQL as normal, then encode it
		var query = "SELECT * FROM " + table;
		var queryurl = encodeURI(queryUrlHead + query + queryUrlTail);

		var jqxhr = $.get(queryurl, handleData, "jsonp");
	}
	
	function handleData(d){
		data = d.table.rows;
		tempData = jQuery.extend(true, {}, data);
		clearOverlays();
		drawpins();	
	}

}

function drawpins() {	
	for (i=0 ; i < data.length ; i++){
		var buffer = data[i];
		for (j	=0; j < UnSelectedCategories.length ; j++){
			if (buffer[categoryColumn] == UnSelectedCategories[j]){
				tempData.splice([i],1);
			}
		}
	}
	
	// loop through all rows to add them to the map
	for (var i = 0; i < data.length; i++) {
    // Per the expected data format [25,-7.854167,131.3026], 
    // lat is stored in d[row][1] and lon is stored in d[row][2]
    // probability is the first element of the array
		positionArray = data[i][positionColumn].split(',');
		
    	var latlon = new google.maps.LatLng(positionArray[0], positionArray[1]);

    	var marker = new google.maps.Marker({
        position: latlon,
        rowid: i,
        map: map
    });
	
		var locationObject = data[i];
	
    	var fn = markerClick(map, marker, locationObject);
		markersArray.push(marker);
    	google.maps.event.addListener(marker, 'click', fn);
	}
}

function markerClick(map, m, locationObject) {
	return function() {
    	popup(locationObject)
	};
}
