define(function (require) {
    return {
        start: function (args) {
            var route = require('app/route');
            route.init(args);
        }
    };
});
