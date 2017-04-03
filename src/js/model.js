var model = {
	self: this,

	// List of locations
	locations: [
		{
			title: ko.observable('Museu Aberto de Arte Urbana de São Paulo'),
			lat: -23.508061,
			lng: -46.625269,
			isFiltered: ko.observable(true)
		},
		{
			title: ko.observable('Museu Penitenciário Paulista'),
			lat: -23.506858,
			lng: -46.615519,
			isFiltered: ko.observable(true)
		},
		{
			title: ko.observable('Museu do Transporte Público Gaetano Ferolla'),
			lat: -23.524841,
			lng: -46.625055,
			isFiltered: ko.observable(true)
		},
		{
			title: ko.observable("Museu da Saúde Pública Emílio Ribas"),
			lat: -23.526361,
			lng: -46.642469,
			isFiltered: ko.observable(true)
		},
		{
			title: ko.observable('Memorial da América Latina'),
			lat: -23.52677,
			lng: -46.664291,
			isFiltered: ko.observable(true)
		},
		{
			title: ko.observable('Museu de Arte Sacra de São Paulo'),
			lat: -23.530388,
			lng: -46.631339,
			isFiltered: ko.observable(true)
		},
		{
			title: ko.observable('Museu da Língua Portuguesa'),
			lat: -23.53049,
			lng: -46.639325,
			isFiltered: ko.observable(true)
		},
		{
			title: ko.observable('Museu da Energia de São Paulo'),
			lat: -23.530424,
			lng: -46.643494,
			isFiltered: ko.observable(true)
		},
		{
			title: ko.observable('Pinacoteca do Estado de São Paulo'),
			lat: -23.534267,
			lng: -46.63395,
			isFiltered: ko.observable(true)
		},
		{
			title: ko.observable('Memorial da Resistência de São Paulo'),
			lat: -23.534852,
			lng: -46.638811,
			isFiltered: ko.observable(true)
		},
		{
			title: ko.observable('Museu da Imigração do Estado de São Paulo'),
			lat: -23.549695,
			lng: -46.612694,
			isFiltered: ko.observable(true)
		},
		{
			title: ko.observable('Catavento (museu)'),
			lat: -23.544017, 
			lng: -46.627736,
			isFiltered: ko.observable(true)
		},
		{
			title: ko.observable('Museu da Diversidade Sexual'),
			lat: -23.543963,
			lng: -46.642872,
			isFiltered: ko.observable(true)
		},
		{
			title: ko.observable('Museu Judaico de São Paulo'),
			lat: -23.550814,
			lng: -46.645647,
			isFiltered: ko.observable(true)
		},
		{
			title: ko.observable('Museu Anchieta'),
			lat: -23.547963,
			lng: -46.632792,
			isFiltered: ko.observable(true)
		},
		{
			title: ko.observable('Museu da Imagem e do Som de São Paulo'),
			lat: -23.548404, 
			lng: -46.632312,
			isFiltered: ko.observable(true)
		},
		{
			title: ko.observable('Solar da Marquesa de Santos'),
			lat: -23.54876,
			lng: -46.632208,
			isFiltered: ko.observable(true)
		},
		{
			title: ko.observable('Caixa Cultural'),
			lat: -23.549249,
			lng: -46.632876,
			isFiltered: ko.observable(true)
		}
	],
	
	// Wikipedia API
	setContent: function () {
		for (var i = 0; i < this.locations.length; i++) {
			var wikiURL = "https://pt.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=" + this.locations[i].title();
			var wikiRequestTimeout = setTimeout(function () {
					article = "failed to get Wiki resources";
			}, 8000);
			var article = getWikiExtract(i, wikiRequestTimeout, wikiURL);
			
				function getWikiExtract(i, wikiRequestTimeout, wikiURL) {
					var result = '';
					var infoWindow = new google.maps.InfoWindow({
						content: 'No data to display'
					});
					$.ajax({
						url: wikiURL,
						dataType: "jsonp"
					}).done(function (data) {
					if (data && data.query && data.query.pages) {
							var pages = data.query.pages;
					}
					else {
						result = "No pages were found in Wiki";
						infowindow.setContent = new google.maps.InfoWindow({
								content: model.locations[i].title() + "<br><br>" + "Wikipedia info:" + "<br>" + result
						});
					}
					for (var id in pages) {
						result = pages[id].extract || 'Dados não disponíveis';
						model.locations[i].infowindow = new google.maps.InfoWindow({
								content: '<div class="infoWindow"' + '<strong><b>' + model.locations[i].title() + '</b></strong>' + '<br><br>' + "Wikipedia info:" + '<br>' + result + '</div>',
								maxWidth: '150'
						});
					}
						clearTimeout(wikiRequestTimeout);
					}).fail(function () {
						alert("Unable to reach Wikipedia.");
						model.locations[i].infowindow = new google.maps.InfoWindow({
							content: model.locations[i].title() + "<br><br>" + "Wikipedia info:" + "<br>" + "Unavailable"
					});
				});
			}
		}
	},

	addMarkers: function () {
		for (var i = 0; i < this.locations.length; i++) {
				this.locations[i].marker = this.createMarker(this.locations[i], i);
		}
	},

	toggleBounce: function (location) {
		viewModel.disableMarkers();
		location.marker.setAnimation(google.maps.Animation.BOUNCE);
		setTimeout(function() { location.marker.setAnimation(null); }, 1400);
	},

	createMarker: function (location) {
		var marker = new google.maps.Marker({
				title: location.title(),
				map: map,
				draggable: false,
				animation: google.maps.Animation.DROP,
				position: new google.maps.LatLng(location.lat, location.lng)
		});
		marker.addListener('click', function () {
				model.toggleBounce(location);
				location.infowindow.open(map, marker);
		});
		return marker;
	},

	init: function () {
		this.addMarkers();
		this.setContent();
	}
};
