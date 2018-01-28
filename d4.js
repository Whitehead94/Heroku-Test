const e = require('express');
const bp = require('body-parser');
const y = require('yargs');
const api1 = require('./api1.js');
const api2 = require('./api2.js');
const api3 = require('./api3.js');
const PORT = process.env.PORT || 3000;
let app = e();
app.use(bp.json());
app.use(bp.urlencoded({
	extended: true
}));
app.set('view engine', 'hbs');

function createString(data) {
	return 'Address: ' + data["address"] + 
	', Latitude: ' + data["latitude"] + ', Longitude: ' + data["longitude"] + 
	', Elevation: ' + data["elevation"] + 'm' + 
	', Date: ' + data["time"].getFullYear() + '-' + (data["time"].getMonth() + 1) + '-' + data["time"].getDate() + 
	', Time: ' + data["time"].getUTCHours() + ':' + data["time"].getMinutes() + ':' + data["time"].getSeconds();
}

async function getData(address) {
	if (address !== undefined) {
		data = {address: encodeURIComponent(address.trim())};
		
		address   = await api1.getPos(data);
		elevation = await api2.getEle(address);
		time      = await api3.getTime(address);
		
		return Object.assign(address, elevation, time);
	}
}

app.get('/', function(req, res) {
	res.render('index.hbs');
});

app.post('/', async function(req, res) {
	
	data = await getData(req.body.address);
	data = createString(data);

	res.render('index.hbs', {
		data: data
	});
});

app.listen(PORT, ()=>{
 	console.log(`server is running on port ${PORT}`);
});