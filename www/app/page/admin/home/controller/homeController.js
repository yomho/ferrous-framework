define(function (require) {
    return {
        init: function (request) {
            request.layout.css({ 'color': 'blue' });
            request.layout.find('button:first').unbind('click').bind('click', function () {
                request.localet.navigate('login', {
                    trigger: true
                });
            });
            request.layout.find('button.logout').unbind('click').bind('click', function () {
                var authApi = require('app/api').getAuthApi();
                authApi.clearTicket(function () {
                    request.localet.navigate('login', {
                        trigger: true
                    });
                });
            });
        }
    };
});