﻿define(function (require) {
    return {
        init: function (request) {
            request.layout.css({ 'color': 'blue' });
            request.layout.find('button').unbind('click').bind('click', function () {
                request.localet.navigate('login', {
                    trigger: true
                });
            });
        }
    };
});