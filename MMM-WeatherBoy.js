/* global Module */

/* Magic Mirror
 * Module: MMM-WeatherBoy
 *
 * By lavolp3
 * MIT Licensed.
 */

Module.register("MMM-WeatherBoy", {
	defaults: {
		height: 500,
		randomColors: true,
		brightness: 1.5,
        teint: 2,
		debug: false,
		wbElements: [
			'wb_boy',
			'wb_sunchair',
			'wb_shirt',
			'wb_shorts',
			'wb_shoes',
			'wb_pullover',
			'wb_longs',
			'wb_jacket',
			'wb_coat',
			'wb_hat',
			'wb_scarf',
			'wb_gloves',
			'wb_umbrella',
			'wb_sun',
			'wb_clouds',
			'wb_rain',
			'wb_snow',
			'wb_snowman'
		],
		srcFolder: 'wbelements/',
	},

	requiresVersion: "2.1.0", // Required version of MagicMirror

	getScripts: function() {
		return [];
	},

	getStyles: function () {
		return [
			"weatherboy.css",
		];
	},


	start: function() {
		Log.info("Starting module: " + this.name);
		this.loading = true;
		this.updateDom();
	},

	//	notificationReceived from another module
	notificationReceived: function (notification, payload) {
		if(notification === "DARK_SKY_FORECAST_WEATHER_UPDATE") {
			this.weatherData = payload.currently;
			this.log("Received weather data: "+JSON.stringify(this.weatherData));
			this.loading = false;
			this.updateDom();
			setTimeout(() => {
				this.showElements();
				if (this.config.randomColors) { this.hueElements(); }
			}, 1000);
		}
	},


	getDom: function() {
		var self = this;
		// create element wrapper for show into the module
		var wrapper = document.createElement("div");
		wrapper.id = "wrapper";
		if (this.loading) {
			wrapper.innerHTML = "Awaiting weather data";
		} else {
			wrapper.style.height = this.config.height + "px";
			if (this.weatherData) {
				var el;
				var elements = this.config.wbElements;
				for (var i = 0; i < elements.length; i++) {
					el =  document.createElement('img');
					el.src = this.file(this.config.srcFolder) + elements[i] + '.png';
					el.id = elements[i];
					el.style.height = this.config.height + "px";
					el.style.opacity = "0";
					el.style.zIndex = Math.ceil(i/2);
					wrapper.appendChild(el);
				}
			}
		}
		return wrapper;
	},

	showElements: function() {
        var wbBoy = "wb_boy" + this.config.teint;
		this.show([wbBoy]);
		var temp = this.weatherData.temperature;
		this.log("Temperature: "+temp);
		if (temp < 9) {
			this.show(['wb_coat', 'wb_hat', 'wb_longs', 'wb_shoes']);
			if (temp < 4) {
				this.show(['wb_scarf', 'wb_gloves']);
			}
		} else if (temp < 20) {
			this.show(['wb_pullover', 'wb_longs', 'wb_shoes']);
			if (temp < 15) {
				this.show(['wb_jacket']);
			}
		} else if (temp < 26) {
			this.show(['wb_shirt', 'wb_shorts']);
		};

		var icon = this.weatherData.icon;
		this.log("Weather condition: "+icon);
		if (icon === "clear-day") {
			this.show(['wb_sun']);
			if (temp > 20) {
				this.show(['wb_sunchair']);
			}
		} else if (icon === "partly-cloudy-day") {
			this.show(['wb_clouds']);
		} else if (icon === "rain") {
			this.show(['wb_rain', 'wb_umbrella']);
		} else if (icon === "snow") {
			this.show(['wb_clouds', 'wb_snow', 'wb_snowman']);
		}
	},

	hueElements: function() {
		['wb_coat', 'wb_longs', 'wb_shirt', 'wb_shorts', 'wb_gloves', 'wb_scarf', 'wb_hat', 'wb_shoes'].forEach(el => {
		    rd = Math.floor(Math.random() * 360);
			//this.log("Random number: "+rd);
			document.getElementById(el).style.filter = `hue-rotate(${rd}deg) brightness(${this.config.brightness})`;
		});
	},

	show: function(elements) {
		this.log('Showing ' + elements);
		for (var e = 0; e < elements.length; e++) {
			document.getElementById(elements[e]).style.opacity = '1';
		}
	},

	log: function (msg) {
		if (this.config && this.config.debug) {
			console.log(this.name + ":", JSON.stringify(msg));
		}
	},
});
