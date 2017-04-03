// Displays the list of locations
var viewModel = {

	self: this,
	locations: ko.observableArray(),

	searchQuery: ko.observable(''),

	toggleMarker: function (location) {
		viewModel.disableMarkers();
		location.marker.setAnimation(google.maps.Animation.BOUNCE);
		location.infowindow.open(map, location.marker);
	},

	disableMarkers: function () {
		for (var i = 0; i < this.locations().length; i++) {
			this.locations()[i].marker.setAnimation(null);
			this.locations()[i].infowindow.close();
		}
	},

	fillLocations: function () {
		for (var i = 0; i < model.locations.length; i++) {
			this.locations.push(model.locations[i]);
		}
	},

	init: function () {
		model.init();
		this.fillLocations();
		ko.applyBindings(viewModel);
		viewModel.searchQuery.subscribe(this.filterItems);
	},
	
	filterItems: function () {
		var filter = viewModel.searchQuery().toLowerCase();

		for (var i = 0; i < model.locations.length; i++) {

			var searchedTitle = model.locations[i].title().toLowerCase();

			if (searchedTitle.indexOf(filter) > -1) {
				model.locations[i].isFiltered(true);
				model.locations[i].marker.setMap(map);
			}
			else {
				model.locations[i].isFiltered(false);
				model.locations[i].marker.setMap(null);
			}
		}
	}
};