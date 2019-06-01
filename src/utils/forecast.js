const request = require('request');

const forecast = (longi, latit, callback) => {
    const url = `https://api.darksky.net/forecast/e9975685c0bd49e3eaa5db544326071c/${longi},${latit}?units=si`;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to forcast services!', undefined);
        } else if (body.error) {
            callback('Unable to find forecast data. Try another search.', undefined);
        } else {
            const curData = body.currently;
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: curData.temperature,
                chanceOfRaining: curData.precipProbability,
            });
        }
    });
};

module.exports = forecast;