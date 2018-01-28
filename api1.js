// https://maps.googleapis.com/maps/api/geocode/json?address=Toru%C5%84,+Grudzi%C4%85dzka+5&key=AIzaSyCoBDaBhXTk_c2KBKC5D87zhz1ZFADgby4

// Pozycja

const r = require('request');
const key = 'AIzaSyCoBDaBhXTk_c2KBKC5D87zhz1ZFADgby4';
const err_str = 'Wystąpił błąd przy pobieraniu informacji o lokalizacji.';

function assembleRequest(query) {
	return 'https://maps.googleapis.com/maps/api/geocode/json?address=' + query + '&key=' + key
}

function getPos(data) {
	return new Promise(function (resolve, reject) {
		
		r(assembleRequest(data["address"]), {json: true}, function (error, response, body) {
			if (error) {
				reject(err_str);
			} else {
				if (body.status !== 'OK' && body.results.length > 0) {
					reject(err_str);
				} else {
					var latitude  = body.results[0].geometry.location.lat;
					var longitude = body.results[0].geometry.location.lng;
					var address   = body.results[0].formatted_address;
					resolve({
						latitude: latitude, 
						longitude: longitude, 
						address: address});
				}
			}
		});
	});
}

module.exports = {
	getPos
};