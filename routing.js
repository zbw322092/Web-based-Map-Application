var control = L.Routing.control({
	routeWhileDragging: true,
	geocoder: L.Control.Geocoder.nominatim(),

	 waypoints: [
        null,null    
    ],

    reverseWaypoints: true,

 	routeWhileDragging: true

}).addTo(map);


function createButton(label, container) {
	var btn = L.DomUtil.create('button', 'button', container);
	btn.type = 'button';
	btn.innerHTML = label;
	return btn;
}

map.on('click', function(e){
	var container = L.DomUtil.create('div');
	var	startBtn = createButton('Start from this location', container);
	startBtn.id = 'start';
	var	destinationBtn = createButton('Go to this location', container);
	destinationBtn.id = 'destination';

	var routingToCentralStationBtn = createButton('Start from here to central station', container);
	routingToCentralStationBtn.id = 'rail';
	var routingToAirportBtn = createButton('Start from here to airport', container);
	routingToAirportBtn.id = 'airport';
	var routingToHighfieldBtn = createButton('Start from here to Highfield Campus', container);
	routingToHighfieldBtn.id = 'highfieldCampus';
	var routingToAvenueBtn = createButton('Start from here to Avenue Campus', container);
	routingToAvenueBtn.id = 'avenueCampus';
	var routingToBoldrewoodBtn = createButton('Start from here to Boldrewood Campus', container);
	routingToBoldrewoodBtn.id = 'boldrewoodCampus';
	var routingToWaterfrontBtn = createButton('Start from here to Waterfront Campus', container);
	routingToWaterfrontBtn.id = 'waterfrontCampus';

	// preset some locations by latitude and longitude
	var railwayLatlng = L.latLng(50.9075112, -1.4142155);
	var airportLatlng = L.latLng(50.9465873, -1.3614076);
	var highfieldCampusLatlng = L.latLng(50.9369281, -1.3940355);
	var avenueCampusLatlng = L.latLng(50.9289227, -1.400938);
	var boldrewoodCampusLatlng = L.latLng(50.9378018, -1.4065107);
	var waterfrontCampusLatlng = L.latLng(50.893732, -1.393805);


	L.popup()
		.setContent(container)
		.setLatLng(e.latlng)
		.openOn(map);

	$("#start").click(function(){
        control.spliceWaypoints(0, 1, e.latlng);
	});

	$("#destination").click(function(){
        control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
	});

	$("#rail").click(function(){
        control.spliceWaypoints(0, 1, e.latlng);
        control.spliceWaypoints(control.getWaypoints().length - 1, 1, railwayLatlng);
	});

	$("#airport").click(function(){
        control.spliceWaypoints(0, 1, e.latlng);
        control.spliceWaypoints(control.getWaypoints().length - 1, 1, airportLatlng);
	});

	$("#highfieldCampus").click(function(){
        control.spliceWaypoints(0, 1, e.latlng);
        control.spliceWaypoints(control.getWaypoints().length - 1, 1, highfieldCampusLatlng);
	});

	$("#avenueCampus").click(function(){
        control.spliceWaypoints(0, 1, e.latlng);
        control.spliceWaypoints(control.getWaypoints().length - 1, 1, avenueCampusLatlng);
	});
	
	$("#boldrewoodCampus").click(function(){
        control.spliceWaypoints(0, 1, e.latlng);
        control.spliceWaypoints(control.getWaypoints().length - 1, 1, boldrewoodCampusLatlng);
	});

	$("#waterfrontCampus").click(function(){
        control.spliceWaypoints(0, 1, e.latlng);
        control.spliceWaypoints(control.getWaypoints().length - 1, 1, waterfrontCampusLatlng);
	});
});








