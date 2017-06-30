/*
 * This will handle the setup of the app, load in AngularJS dependencies and so on.
 */

var app;

(function() {
	"use strict";
	app = angular.module('epiSwitch', ['ngRoute', 'ngMaterial', 'md.data.table', 'duParallax']);

	app.config(['$mdThemingProvider', function ($mdThemingProvider) {
      $mdThemingProvider.theme('default')
        .primaryPalette('blue');
    }])

})();
