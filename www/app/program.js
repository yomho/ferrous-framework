define(function (require) {
    return {
        main: function (args) {
            var props = require('app/props');
            var boot = require('app/boot');
            props.global.page.includeGlobalRes();
            boot.start(args);
        }
    };
});
