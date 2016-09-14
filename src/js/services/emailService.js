
'use strict';

angular
    .module('yoApp')
    .service('emailService', emailService);

function emailService($http) {
    var service = {
        sendEmail: sendEmail
    };
    return service;

    function sendEmail(contactData) {
        console.log(contactData);
        $http({
            method: 'Post',
            url: 'http://localhost/email/send_form_email.php',
            data: $.param({
                first_name: contactData.name.$viewValue,
                email: contactData.email.$viewValue,
                subject: contactData.subject.$viewValue,
                comments: contactData.comments.$viewValue
            }),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}

        }).then(function successCallback(response) {
            alert("Thank you for contacting us. I will be in touch with you very soon.");
        }, function errorCallback(response) {
            alert('An error has occurred!')
        });
    }
}