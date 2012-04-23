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
		var borderRadius = 12
		popLeft = $("body").outerWidth(true)/2-$("#popover").outerWidth(true)/2;
		if(popLeft+$("#popover").outerWidth(true)-borderRadius < $("#categories").offset().left+$("#categories").outerWidth() || false)
			popLeft = $("#categories").offset().left+$("#categories").outerWidth()-$("#popover").outerWidth(true)+borderRadius;
		$("#popover").css({display: "block", top: 6, left: popLeft});
		
		var aLeft = $("#categories").offset().left+$("#categories").innerWidth()/2-$("#popover").offset().left-$("#popover .arrow").innerWidth()/2-4;
		$("#popover .arrow").css({left: aLeft});
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

