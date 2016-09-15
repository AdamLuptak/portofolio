'use strict';

/**
 * @ngdoc function
 * @name yoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yoApp
 */
angular
    .module('yoApp')
    .controller('EmailController', EmailController);

function EmailController(emailService) {
    var vm = this;

    vm.sendEmail = function (contactData) {
        emailService.sendEmail(contactData);
    }
}





