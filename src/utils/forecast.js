const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const forecasturl = 'http://api.weatherstack.com/current?access_key=b61320cf60341e1be920145901d77bad&query=' + latitude + ',%' + longitude;
    request({ url: forecasturl, json: true }, (error, {body}={}) => {
        if (error) {
            callback('unable to connect weather service',undefined);
        } else if (body.error) {
            callback({
                error: 'unable to find the location'
            }, undefined)
        } else {
            callback("", `${body.current.weather_descriptions}. The current temperature is ${body.current.temperature}C and if feels like ${body.current.feelslike}C.`)
        }
    })
}

module.exports = forecast;