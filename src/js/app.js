var map = '';
var infoWindow; 

var applyMapStyles = function () {
	var styleArray = [
		{
			featureType: "all",
			stylers: [
					{visibility: "off"}
			]
		},
		{
			featureType: "road",
			stylers: [
					{visibility: "on"}
			]
		},
		{
			featureType: "landscape",
			stylers: [
					{visibility: "on"}
			]
		},
		{
			featureType: "water",
			stylers: [
					{visibility: "on"}
			]
		}
	];
	map.setOptions({styles: styleArray});
};

// Google API script 
var initMap = function () {
	try {
		map = new google.maps.Map(document.getElementById('map'), {
			zoom: 13,
			center: new google.maps.LatLng(-23.519179, -46.630078),
			mapTypeId: google.maps.MapTypeId.ROOFTOP
		});
		infowindow = new google.maps.InfoWindow();
		applyMapStyles();
		viewModel.init();
	}
	catch (error) {
		alert("Unable to connect to Google Maps. Error: " + error);
	}
};

function mapError() {
	alert('Error encountered with Google Maps API. Please refresh or try again later.');
	console.log('Error encountered with Google Maps API. Please refresh or try again later.');
};
