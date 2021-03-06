# MMM-WeatherBoy
This is a [Magic Mirror](https://github.com/MichMich/MagicMirror) module for the kids! Show them what to wear outside!
It uses broadcasted weather data to show a boy wearing weather-suitable clothes.
**Please note dependencies below**


## Screenshot

![example screenshot](https://raw.githubusercontent.com/lavolp3/MMM-WeatherBoy/master/wbExample.jpg)

## Installation

1. clone this module into your modules folder

```
git clone https://github.com/lavolp3/MMM-WeatherBoy.git
```
2. Add it to your config.js 


## Sample configuration
```
{
    disabled: false,
    module: 'MMM-WeatherBoy',
    position: 'top_right',
    config: {
        height: 400,
		randomColors: true,
    }
},
```

## Config options

Following options are configurable via above config:

| **Option** | **Default** | **Description** |
| --- | --- | --- |
| `height` | `400` | Height of the module. Width will be autoset |
| `randomColors` | true | Color clothes randomly with every update |
| `brightness` | 1.5 | Adjust brightness of the picture. Value of 1 is original brightness |
| `teint`  | 2 | Choose between teint colors. 1 is light, 5 is dark teint. | 
| `debug` | false | Debug mode. Increases output to dev console. |


## Weather module dependency

This module needs to receive weather data from weather modules via module notifications.
Currently only [*MMM-DarkSkyForecast*](https://github.com/jclarke0000/MMM-DarkSkyForecast) is supported.

Further support is planned for:
- [ ] built-in weather module
- [ ] my fork of [MMM-forecast-io](https://github.com/lavolp3/MMM-forecast-io)



If you have any suggestions or issues, let me know via an [issue](https://github.com/lavolp3/MMM-WeatherBoy/issues/new).
Have fun!
