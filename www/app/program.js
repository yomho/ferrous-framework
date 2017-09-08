define(function (require) {
    return {
        main: function (args) {
            var boot = require('app/boot');
            boot.start(args);
        }
    };
});
