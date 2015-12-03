// initialize the map
var map = L.map('map', {
	center: [50.935742, -1.3966381],
	zoom: 14,
	zoomsliderControl: true,
	zoomControl: false,
});

// disable map double click zoom
map.doubleClickZoom.disable();

// load a tile layer
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18
}).addTo(map);

// get user's location
L.control.locate({
	icon: 'fa fa-map-marker'
}).addTo(map);

// geosearch
new L.Control.GeoSearch({
	provider: new L.GeoSearch.Provider.Google(),
	position: 'topright',
	showMarker: true,
	retainZoomLevel: false
}).addTo(map);



// Show points of interest within one kilometre
var locationMarker = L.marker();
var PBLL;
var markerLat;
var markerLng;
var pointsWithinOneKM;

map.on('contextmenu', function showPointsWithinOneKM(e){


	locationMarker.setLatLng(e.latlng)
				.bindPopup("<button type='button' id='showMarkers'>Show markers within 1 KM</button>"+"<br>"+ 
						   "<button type='button' id='hideMarkers'>Hide markers within 1 KM</button>")
				.addTo(map);
	
	markerLat= locationMarker.getLatLng().lat;
	markerLng= locationMarker.getLatLng().lng;

	bankNearby = L.geoJson.ajax("data/overpass/bank.geojson", {
		pointToLayer: function(feature, LatLng) {
			if (L.latLng(markerLat, markerLng).distanceTo(LatLng) < 1000) {
				return L.marker(LatLng, {icon: bankIcon}).bindPopup(feature.properties.amenity);
			} else {
				return L.marker(LatLng,{opacity: 0});
			}
		}
	});

	barNearby = L.geoJson.ajax("data/overpass/bar.geojson", {
		pointToLayer: function(feature, LatLng) {
			if (L.latLng(markerLat, markerLng).distanceTo(LatLng) < 1000) {
				return L.marker(LatLng, {icon: barIcon}).bindPopup(feature.properties.amenity);
			} else {
				return L.marker(LatLng,{opacity: 0});
			}
		}
	});

	busStopNearby = L.geoJson.ajax("data/overpass/stop_area_noploygon.geojson", {
		pointToLayer: function(feature, LatLng) {
			if (L.latLng(markerLat, markerLng).distanceTo(LatLng) < 500) {
				return L.marker(LatLng, {icon: stopIcon});
			} else {
				return L.marker(LatLng,{opacity: 0});
			}
		}
	});

	libraryNearby = L.geoJson.ajax("data/overpass/library.geojson", {
		pointToLayer: function(feature, LatLng) {
			if (L.latLng(markerLat, markerLng).distanceTo(LatLng) < 1000) {
				return L.marker(LatLng, {icon: libraryIcon}).bindPopup(feature.properties.amenity);
			} else {
				return L.marker(LatLng,{opacity: 0});
			}
		}
	});

	cafeNearby = L.geoJson.ajax("data/overpass/cafe.geojson", {
		pointToLayer: function(feature, LatLng) {
			if (L.latLng(markerLat, markerLng).distanceTo(LatLng) < 1000) {
				return L.marker(LatLng, {icon: cafeIcon}).bindPopup(feature.properties.amenity);
			} else {
				return L.marker(LatLng,{opacity: 0});
			}
		}
	});

	cinemaNearby = L.geoJson.ajax("data/overpass/cinema.geojson", {
		pointToLayer: function(feature, LatLng) {
			if (L.latLng(markerLat, markerLng).distanceTo(LatLng) < 1000) {
				return L.marker(LatLng, {icon: cinemaIcon}).bindPopup(feature.properties.amenity);
			} else {
				return L.marker(LatLng,{opacity: 0});
			}
		}
	});

	nightclubNearby = L.geoJson.ajax("data/overpass/nightclub.geojson", {
		pointToLayer: function(feature, LatLng) {
			if (L.latLng(markerLat, markerLng).distanceTo(LatLng) < 1000) {
				return L.marker(LatLng, {icon: nightclubIcon}).bindPopup(feature.properties.amenity);
			} else {
				return L.marker(LatLng,{opacity: 0});
			}
		}
	});

	restaurantNearby = L.geoJson.ajax("data/overpass/restaurant.geojson", {
		pointToLayer: function(feature, LatLng) {
			if (L.latLng(markerLat, markerLng).distanceTo(LatLng) < 1000) {
				return L.marker(LatLng, {icon: restaurantIcon}).bindPopup(feature.properties.amenity);
			} else {
				return L.marker(LatLng,{opacity: 0});
			}
		}
	});

	recreationGroundNearby = L.geoJson.ajax("data/overpass/recreation_ground.geojson", {
		pointToLayer: function(feature, LatLng) {
			if (L.latLng(markerLat, markerLng).distanceTo(LatLng) < 1000) {
				return L.marker(LatLng, {icon: recreationGroundIcon}).bindPopup(feature.properties.landuse);
			} else {
				return L.marker(LatLng,{opacity: 0});
			}
		}
	});

	alcoholAndWineNearby = L.geoJson.ajax("data/overpass/alcohol_and_wine.geojson", {
		pointToLayer: function(feature, LatLng) {
			if (L.latLng(markerLat, markerLng).distanceTo(LatLng) < 1000) {
				return L.marker(LatLng, {icon: alcoholAndWineIcon}).bindPopup(feature.properties.shop);
			} else {
				return L.marker(LatLng,{opacity: 0});
			}
		}
	});

	bakeryNearby = L.geoJson.ajax("data/overpass/bakery.geojson", {
		pointToLayer: function(feature, LatLng) {
			if (L.latLng(markerLat, markerLng).distanceTo(LatLng) < 1000) {
				return L.marker(LatLng, {icon: bakeryIcon}).bindPopup(feature.properties.shop);
			} else {
				return L.marker(LatLng,{opacity: 0});
			}
		}
	});

	beautyNearby = L.geoJson.ajax("data/overpass/beauty.geojson", {
		pointToLayer: function(feature, LatLng) {
			if (L.latLng(markerLat, markerLng).distanceTo(LatLng) < 1000) {
				return L.marker(LatLng, {icon: beautyIcon}).bindPopup(feature.properties.shop);
			} else {
				return L.marker(LatLng,{opacity: 0});
			}
		}
	});

	booksAndNewsagentNearby = L.geoJson.ajax("data/overpass/books_and_newsagent.geojson", {
		pointToLayer: function(feature, LatLng) {
			if (L.latLng(markerLat, markerLng).distanceTo(LatLng) < 1000) {
				return L.marker(LatLng, {icon: bookIcon}).bindPopup(feature.properties.shop);
			} else {
				return L.marker(LatLng,{opacity: 0});
			}
		}
	});

	clothesAndShoesNearby = L.geoJson.ajax("data/overpass/clothes_and_shoes.geojson", {
		pointToLayer: function(feature, LatLng) {
			if (L.latLng(markerLat, markerLng).distanceTo(LatLng) < 1000) {
				return L.marker(LatLng, {icon: clothesIcon}).bindPopup(feature.properties.shop);
			} else {
				return L.marker(LatLng,{opacity: 0});
			}
		}
	});

	convenienceNearby = L.geoJson.ajax("data/overpass/convenience.geojson", {
		pointToLayer: function(feature, LatLng) {
			if (L.latLng(markerLat, markerLng).distanceTo(LatLng) < 1000) {
				return L.marker(LatLng, {icon: convenienceIcon}).bindPopup(feature.properties.shop);
			} else {
				return L.marker(LatLng,{opacity: 0});
			}
		}
	});

	electronicsNearby = L.geoJson.ajax("data/overpass/electronics.geojson", {
		pointToLayer: function(feature, LatLng) {
			if (L.latLng(markerLat, markerLng).distanceTo(LatLng) < 1000) {
				return L.marker(LatLng, {icon: electronicsIcon}).bindPopup(feature.properties.shop);
			} else {
				return L.marker(LatLng,{opacity: 0});
			}
		}
	});

	hairdresserNearby = L.geoJson.ajax("data/overpass/hairdresser.geojson", {
		pointToLayer: function(feature, LatLng) {
			if (L.latLng(markerLat, markerLng).distanceTo(LatLng) < 1000) {
				return L.marker(LatLng, {icon: hairdresserIcon}).bindPopup(feature.properties.shop);
			} else {
				return L.marker(LatLng,{opacity: 0});
			}
		}
	});

	gamesAndMusicNearby = L.geoJson.ajax("data/overpass/game_and_music.geojson", {
		pointToLayer: function(feature, LatLng) {
			if (L.latLng(markerLat, markerLng).distanceTo(LatLng) < 1000) {
				return L.marker(LatLng, {icon: gameAndMusicIcon}).bindPopup(feature.properties.shop);
			} else {
				return L.marker(LatLng,{opacity: 0});
			}
		}
	});


	supermarketNearby = L.geoJson.ajax("data/overpass/supermarket.geojson", {
		pointToLayer: function(feature, LatLng) {
			if (L.latLng(markerLat, markerLng).distanceTo(LatLng) < 1000) {
				return L.marker(LatLng, {icon: supermarketIcon}).bindPopup(feature.properties.shop);
			} else {
				return L.marker(LatLng,{opacity: 0});
			}
		}
	});

	varietyStoreNearby = L.geoJson.ajax("data/overpass/variety_store.geojson", {
		pointToLayer: function(feature, LatLng) {
			if (L.latLng(markerLat, markerLng).distanceTo(LatLng) < 1000) {
				return L.marker(LatLng, {icon: varietyStoreIcon}).bindPopup(feature.properties.shop);
			} else {
				return L.marker(LatLng,{opacity: 0});
			}
		}
	});

	mallAndFurnitureNearby = L.geoJson.ajax("data/overpass/mall_and_furniture_noploygon.geojson", {
		pointToLayer: function(feature, LatLng) {
			if (L.latLng(markerLat, markerLng).distanceTo(LatLng) < 1000) {
				return L.marker(LatLng, {icon: mallAndFurnitureIcon}).bindPopup(feature.properties.shop);
			} else {
				return L.marker(LatLng,{opacity: 0});
			}
		}
	});

	sportsAndOutdoorNearby = L.geoJson.ajax("data/overpass/sports.geojson", {
		pointToLayer: function(feature, LatLng) {
			if (L.latLng(markerLat, markerLng).distanceTo(LatLng) < 1000) {
				return L.marker(LatLng, {icon: sportsIcon}).bindPopup(feature.properties.shop);
			} else {
				return L.marker(LatLng,{opacity: 0});
			}
		}
	});

	basketballNearby = L.geoJson.ajax("data/overpass/basketball.geojson", {
		pointToLayer: function(feature, LatLng) {
			if (L.latLng(markerLat, markerLng).distanceTo(LatLng) < 1000) {
				return L.marker(LatLng, {icon: basketballIcon}).bindPopup(feature.properties.sport);
			} else {
				return L.marker(LatLng,{opacity: 0});
			}
		}
	});

	soccerNearby = L.geoJson.ajax("data/overpass/soccer.geojson", {
		pointToLayer: function(feature, LatLng) {
			if (L.latLng(markerLat, markerLng).distanceTo(LatLng) < 1000) {
				return L.marker(LatLng, {icon: soccerIcon}).bindPopup(feature.properties.sports);
			} else {
				return L.marker(LatLng,{opacity: 0});
			}
		}
	});

	swimmingNearby = L.geoJson.ajax("data/overpass/swimming.geojson", {
		pointToLayer: function(feature, LatLng) {
			if (L.latLng(markerLat, markerLng).distanceTo(LatLng) < 1000) {
				return L.marker(LatLng, {icon: swimmingIcon}).bindPopup(feature.properties.sport);
			} else {
				return L.marker(LatLng,{opacity: 0});
			}
		}
	});

	tennisNearby = L.geoJson.ajax("data/overpass/tennis.geojson", {
		pointToLayer: function(feature, LatLng) {
			if (L.latLng(markerLat, markerLng).distanceTo(LatLng) < 1000) {
				return L.marker(LatLng, {icon: tennisIcon}).bindPopup(feature.properties.sport);
			} else {
				return L.marker(LatLng,{opacity: 0});
			}
		}
	});

	sportsCentreNearby = L.geoJson.ajax("data/overpass/sports_centre_noploygons.geojson", {
		pointToLayer: function(feature, LatLng) {
			if (L.latLng(markerLat, markerLng).distanceTo(LatLng) < 1000) {
				return L.marker(LatLng, {icon: sportsCentreIcon}).bindPopup(feature.properties.sport);
			} else {
				return L.marker(LatLng,{opacity: 0});
			}
		}
	});


	pointsWithinOneKM = L.layerGroup([bankNearby, barNearby, busStopNearby, libraryNearby, cafeNearby, cinemaNearby, 
						nightclubNearby, restaurantNearby, recreationGroundNearby, alcoholAndWineNearby,
						bakeryNearby, beautyNearby, booksAndNewsagentNearby, clothesAndShoesNearby,
						convenienceNearby, electronicsNearby, hairdresserNearby, gamesAndMusicNearby,
						supermarketNearby, varietyStoreNearby, mallAndFurnitureNearby, sportsAndOutdoorNearby,
						basketballNearby, soccerNearby, tennisNearby, sportsCentreNearby]);
	$("#map").on('click', '#showMarkers', function change(){
				map.addLayer(pointsWithinOneKM);
				map.removeEventListener('contextmenu');
			});

	$("#map").on('click', '#hideMarkers', function change(){
				map.removeLayer(pointsWithinOneKM);
				map.addEventListener('contextmenu', showPointsWithinOneKM);	
			});	
});


// show crime cluster map
var clusters;
function addCrimeMap(){

	$.getJSON("data/crime/crime_2015_05.geojson", function(data){
		var crime = L.geoJson(data, {
			pointToLayer: function(feature, latlng){
				var marker = L.marker(latlng);
				marker.bindPopup(feature.properties.type);
				return marker;
			}
		});
		clusters = L.markerClusterGroup();
		clusters.addLayer(crime);
		map.addLayer(clusters);
	});
	document.getElementById("showCrime").disabled = true;
}

function removeCrimeMap() {
	document.getElementById("showCrime").disabled = false;
	return map.removeLayer(clusters);
}



// buttons
document.getElementById("showCrime").onclick = function(){addCrimeMap()};
document.getElementById("hideCrime").onclick = function(){removeCrimeMap()};

document.getElementById("showCrimeHeatmap").onclick = function(){map.addLayer(heatmapLayer)};
document.getElementById("hideCrimeHeatmap").onclick = function(){map.removeLayer(heatmapLayer)};
