// https://maps.googleapis.com/maps/api/elevation/json?locations=39.7391536,-104.9847034&key=AIzaSyBlWjjkDjlgQCvcqNThZRVGdWd31SDE0Co

// Wysokość

const r = require('request');
const key = 'AIzaSyBlWjjkDjlgQCvcqNThZRVGdWd31SDE0Co';
const err_str = 'Wystąpił błąd przy pobieraniu informacji o wysokości.';

function assembleRequest(latitude, longitude) {
	return 'https://maps.googleapis.com/maps/api/elevation/json?locations=' + latitude + ',' + longitude + '&key=' + key
}

function getEle(data) {
	return new Promise(function (resolve, reject) {
		
		r(assembleRequest(data["latitude"], data["longitude"]), {json: true}, function (error, response, body) {
			if (error) {
				reject(err_str);
			} else {
				if (body.status !== 'OK') {
					reject(err_str);
				} else {				
					resolve({
						elevation: body.results[0].elevation});
				}
			}
		});
	});
}

module.exports = {
	getEle
};