angular.module('get-car')

// this part is responsible of showing accessories of cars ..
.component('accessories', {


	bindings: {
		item : "<"
	},


	templateUrl: ` client/templates/carAccessories.html`

});




