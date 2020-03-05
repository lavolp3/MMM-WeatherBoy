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
		wbElements: [			
			'boy',
			'sunchair',
			'shirt',
			'shorts',
			'shoes',
			'pullover',
			'longs',
			'jacket',
			'coat',
			'hat',
			'scarf',
			'gloves',
			'umbrella',
			'sun',
			'clouds',
			'rain',
			'snow',
			'snowman'
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
			console.log(this.weatherData);
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
					el.style.display = "none";
					el.style.zIndex = i;
					wrapper.appendChild(el);
				}
				console.log(wrapper);
			}
		}				
		return wrapper;
	},
	
	showElements: function() {
		this.show(['boy']);
		var temp = this.weatherData.temperature;
		if (temp < 9) { 
			this.show(['coat', 'hat', 'longs', 'shoes']);
			if (temp < 4) {
				this.show(['scarf', 'gloves']);
			}
		} else if (temp < 20) {
			this.show(['pullover', 'longs', 'shoes']);
			if (temp < 15) {
				this.show(['jacket']);
			}
		} else if (temp < 26) {
			this.show(['shirt', 'shorts']);
		};
		
		var icon = this.weatherData.icon;
		if (icon === "clear-day") {
			this.show(['sun']);
			if (temp > 20) {
				this.show(['sunchair']);
			}
		} else if (icon === "partly-cloudy-day") {
			this.show(['clouds']);
		} else if (icon === "rain") {
			this.show(['rain', 'umbrella']);
		} else if (icon === "snow") {
			this.show(['clouds', 'snow', 'snowman']);
		}
	},
	
	hueElements: function() {
		['coat', 'longs', 'shirt', 'shorts', 'gloves', 'scarf', 'hat', 'shoes'].forEach(el => {
		    rd = Math.floor(Math.random() * 360);
			console.log(rd);
			document.getElementById(el).style.filter = `hue-rotate(${rd}deg) brightness(${this.config.brightness})`;
		});
	},
	
	show: function(elements) {
		console.log('Showing ' + elements);
		for (var e = 0; e < elements.length; e++) {
			document.getElementById(elements[e]).style.display = 'block';
		}
	}

	/*currently:
					summary: "Klar"
					icon: "clear-day"
					precipType: "rain"
					temperature: 6.78
					apparentTemperature: 2.47
								'boy',
								'sun',
								'sunchair',
								'shirt',
								'shorts',
								'shoes',
								'pullover',
								'longs',
								'jacket',
								'coat',
								'hat',
								'scarf',
								'gloves',
								'clouds',
								'rain',
								'umbrella',
								'snow',
								'snowman'
								],*/
});
