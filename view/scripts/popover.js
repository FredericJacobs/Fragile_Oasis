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
					console.log(this.parentNode.textContent.toLowerCase());
				} else {
					console.log(this.parentNode.textContent.toLowerCase());
				}
			}, false);
		});
	}, false);
})();

function showPopOver() {
	$("#popover").css({display: "block", top: 3, left: $("body").outerWidth(true)/2-$("#popover").outerWidth(true)/2});
	$("#popover .arrow").css({top: -$("#popover .arrow").innerHeight()+1, left: $("#categories").offset().left+$("#categories").innerWidth()/2-$("#popover").offset().left-$("#popover .arrow").innerWidth()/2});
}
