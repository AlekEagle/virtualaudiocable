const electron = require('electron'),
remote = electron.remote;

function windowOpened() {
    function init() {
        document.getElementById("min-btn").addEventListener("click", function (e) {
			var window = remote.getCurrentWindow();
			window.minimize();
		});

		document.getElementById("max-btn").addEventListener("click", function (e) {
			var window = remote.getCurrentWindow();
			if (window.isMaximized()) window.unmaximize();
			else window.maximize();
		});

		document.getElementById("close-btn").addEventListener("click", function (e) {
			var window = remote.getCurrentWindow();
			window.close();
		});
    }

    document.onreadystatechange = () => {
		if (document.readyState == "interactive") {
			init()
		}
	};
}
windowOpened();