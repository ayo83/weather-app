const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/dd576d4a711793b54da5872b70f5c269/' + latitude + ',' + longitude;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location forecast', undefined)
        } else {
            callback(undefined, {
                summary:`${body.daily.data[0].summary}. There is a ${body.currently. precipProbability}% chance of rain.`,
                temperature: body.currently.temperature
            })
        }
    })
}

module.exports = forecast