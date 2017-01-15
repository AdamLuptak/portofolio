'use strict';

/**
 * @ngdoc overview
 * @name yoApp
 * @description
 * # yoApp
 *
 * Main module of the application.
 */
angular
    .module('yoApp', ['ngRoute']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/',
            controller: 'EmailController'
        })
        .otherwise({
            redirectTo: '/'
        });

}]);




