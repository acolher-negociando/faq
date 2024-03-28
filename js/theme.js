// Check if chosen theme is stored in localStorage, else run autoSelection
(function() {
	if(localStorage.getItem("selectionMode") === null || localStorage.getItem("selectionMode") === "undefined" || localStorage.getItem("selectionMode") === "auto") {
		autoSelection();
	}
})();

// Auto change theme based on localStorage => system preference => defaults to light
function autoSelection() {
	var themeColor = localStorage.getItem("themeColor");

	if (themeColor !== null && (themeColor === "dark" || themeColor === "light")) {
		setTheme(themeColor, 'auto');
	} else {
		localStorage.setItem("selectionMode", "auto");

		const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

		if (prefersDarkMode) {
			setTheme('dark', 'auto');
		} else {
			setTheme('light', 'auto');
		}
	}
	updateToggle();
}

// Update elements based on current theme
function setTheme(mode, selectionMode) {
	localStorage.setItem("themeColor", mode);
	localStorage.setItem("selectionMode", selectionMode);
	document.getElementsByTagName("html")[0].setAttribute("class", mode);

	if (mode === 'dark') {
		document.getElementById("slider").checked = true;
		document.getElementById("icon").classList.remove("fa-sun");
		document.getElementById("icon").classList.add("fa-moon");
		banner.style.backgroundImage="url(img/banner_dark.png)";
		acolher.style.backgroundImage="url(img/logo_acolher_dark.png)";
	} else {
		document.getElementById("slider").checked = false;
		document.getElementById("icon").classList.remove("fa-moon");
		document.getElementById("icon").classList.add("fa-sun");
		banner.style.backgroundImage="url(img/banner_light.png)";
		acolher.style.backgroundImage="url(img/logo_acolher_light.png)";
	}
}

// Manual theme change based on slider state
function themeSwitch() {
	var slider = document.getElementById("slider");

	if (slider.checked) {
		setTheme('dark', 'manual');
	} else {
		setTheme('light', 'manual');
	}
}

// Update slider state based on current theme
function updateToggle() {
	var slider = document.getElementById("slider");

	if (localStorage.getItem("themeColor") === "dark") {
		slider.checked = true;
	} else {
		slider.checked = false;
	}
}

// On load, display the slider and run autoSelection
window.onload = function() {
	theme.style.display="block";
	autoSelection();
};

// Add a click event listener to the slider
document.getElementById("slider").addEventListener("click", function() {
	themeSwitch();
});
