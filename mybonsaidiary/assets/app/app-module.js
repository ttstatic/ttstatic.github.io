/*
 * This will handle the setup of the app, load in AngularJS dependencies and so on.
 */

var app;

(function() {
	"use strict";
	app = angular.module('myBonsaiApp', ['ngRoute', 'ngSanitize', 'pascalprecht.translate', 'ngCookies', 'rzModule', 'mdr.file', 'ngFileUpload']);

	app.config(['$translateProvider', function($translateProvider) {
		$translateProvider
		.useStaticFilesLoader({
			prefix: 'assets/app/translations/locale-',
			suffix: '.json'
		})
		.preferredLanguage('en')
		.useLocalStorage()
		.useSanitizeValueStrategy('sanitize')
		.useMissingTranslationHandlerLog();
	}]);

	app.run(['$rootScope', function($rootScope) {
		$rootScope.lang = 'en';
	}]);

})();
