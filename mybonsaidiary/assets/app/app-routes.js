(function() {
    "use strict";
    app.config(function($routeProvider, $locationProvider) {
            $routeProvider

                .when('/', {
                    templateUrl : 'main.html',
                    controller : 'mainController as mainCtrl'
                })

                .when('/login', {
                    templateUrl : 'login.html',
                    controller : 'loginController as loginCtrl'
                })

                .when('/home', {
                    templateUrl : 'home.html',
                    controller : 'homeController as homeCtrl'
                })
                .when('/trees', {
                    templateUrl : 'trees.html',
                    controller : 'treesController as treesCtrl'
                })

                .when('/calendar', {
                    templateUrl : 'calendar.html',
                    controller : 'calendarController as calendarCtrl'
                })

                .when('/profile', {
                    templateUrl : 'profile.html',
                    controller : 'profileController as profileCtrl'
                })

                .when('/gallery', {
                    templateUrl : 'gallery.html',
                    controller : 'galleryController as galleryCtrl'
                })

                .when('/notifications', {
                    templateUrl : 'notifications.html',
                    controller : 'notificationsController as notificationsCtrl'
                })

                .when('/addtree', {
                    templateUrl : 'addtree.html',
                    controller : 'addTreeController as addtreeCtrl'
                })

                .when('/timeline', {
                    templateUrl : 'timeline.html',
                    controller : 'timeLineController as timelineCtrl'
                });

                $locationProvider.html5Mode({
                    enabled: true,
                    requireBase: false
                });
    });
})();
