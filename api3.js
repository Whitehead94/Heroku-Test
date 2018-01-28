// https://maps.googleapis.com/maps/api/timezone/json?location=38.908133,-77.047119&timestamp=1458000000&key=AIzaSyAnglp_1m5bilP7F-nq7PLxKhxEPQpEp80

// Czas lokalny

const r = require('request');
const key = 'AIzaSyAnglp_1m5bilP7F-nq7PLxKhxEPQpEp80'
const err_str = 'Wystąpił błąd przy pobieraniu informacji o strefie czasowej.';

function assembleRequest(latitude, longitude, timestamp) {
	return 'https://maps.googleapis.com/maps/api/timezone/json?location=' + latitude + ',' + longitude + '&timestamp=' + timestamp + '&key=' + key
}

function getTime(data) {
	return new Promise(function (resolve, reject) {
		
		r(assembleRequest(data["latitude"], data["longitude"], 0), {json: true}, function (error, response, body) {
			if (error) {
				reject(err_str);
			} else {
				if (body.status !== 'OK') {
					reject(err_str);
				} else {
					var time = new Date(Date.now() + body.rawOffset * 1000);
					
					resolve({
						time: time});
				}
			}
		});
	});
}

module.exports = {
	getTime
};