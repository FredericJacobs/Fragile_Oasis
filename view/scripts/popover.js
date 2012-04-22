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
})()
