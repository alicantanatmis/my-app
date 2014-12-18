var geocoder;
var map;
var marker;
var markerLat;
var markerLon;

function initialize() {
  geocoder = new google.maps.Geocoder();
  
  var mapOptions = {
    zoom: 14,
    //center: new google.maps.LatLng(-34.397, 150.644)
	//center: pos
  }
  
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
    var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	
	marker = new google.maps.Marker({
	map: map,
	//position: new google.maps.LatLng(-34.397, 150.644)
	position: pos
    });
	
	map.setCenter(pos);
    //handleNoGeolocation(true);
	alert(pos.lat().toString() + pos.lng().toString());
	
	}, function() {
	  //var latlng = new google.maps.LatLng(-34.397, 150.644);
    });
  } else {
	alert('Browser does not support Geolocation');
    // Browser doesn't support Geolocation
    //handleNoGeolocation(false);
  }
}

function codeAddress() {
  var address = document.getElementById('address').value;
  marker.setMap(null);
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
		  marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location,
		  draggable: true
      });
	  google.maps.event.addListener(marker, 'dragend', function(evt) {
		markerLat = evt.latLng.lat(); 
		markerLon = evt.latLng.lng();
		alert(markerLat.toString() + markerLon.toString());
	  });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
