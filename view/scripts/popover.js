function clearOverlays() {
	if (markersArray) {
		console.log(markersArray.length);
		for (var i = 0; i < markersArray.length; i++ ){
			markersArray[i].setMap(null);
		}
	}
}

function showHidePopOver() {
	if (!popoverIsDisplayed) {
		$("#popover").css({display: "block", top: 46, left: $("body").outerWidth(true)/2-$("#popover").outerWidth(true)/2});
		$("#popover .arrow").css({top: -$("#popover .arrow").innerHeight()+1, left: $("#categories").offset().left+$("#categories").innerWidth()/2-$("#popover").offset().left-$("#popover .arrow").innerWidth()/2});
		popoverIsDisplayed = true;
		$("#map").removeClass("active");
		$("#categories").addClass("active");
		
	}
	
	else {
		$("#popover").css({display: "none"});
		popoverIsDisplayed = false;
		$("#map").addClass("active");
		$("#categories").removeClass("active");
		clearOverlays();
		drawpins();
	}
}

(function() {
	var $$ = function(selector) {
		return Array.prototype.slice.call(document.querySelectorAll(selector));
	}
	
	
	document.addEventListener("DOMContentLoaded", function() {
		var checkbox;
		var result = document.querySelector("#result");
		$$(".switch").forEach(function(switchControl) {
			if (switchControl.className === ("switch on")) {
				switchControl.lastElementChild.checked = true;
			}
			switchControl.addEventListener("click", function toggleSwitch() {
				if (switchControl.className === "switch on") {
					switchControl.className = 'switch off';
					console.log(switchControl.className);
				} else {
					switchControl.className = ("switch on");
					console.log(switchControl.className);
				}
				checkbox = switchControl.lastElementChild;
				checkbox.checked = !checkbox.checked;
				if (checkbox.checked === true) {
					
					for (i=0; i < UnSelectedCategories.length; i++){
						if (UnSelectedCategories[i]==this.parentNode.textContent.toLowerCase()){
							UnSelectedCategories.splice(i,1);
						}
					}
				} else {
					UnSelectedCategories.push(this.parentNode.textContent.toLowerCase());
					console.log (UnSelectedCategories);		
				} 
			}, false);
		});
	}, false);
})();

