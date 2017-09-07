//The build will inline common dependencies into this file.

//For any third party dependencies, like jQuery, place them in the lib folder.

//Configure loading modules from the lib directory,
//except for 'app' ones, which are in a sibling
//directory.
requirejs.config({
    baseUrl: 'lib',
    urlArgs: 'v=' + window.appVersion,
    paths: {
        'app': '../app',
        'page': '../app/page'
    },
    shim: {
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        underscore: {
            exports: '_'
        }
    }
});
// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['jquery'], function () {
    if (window.location.hash && window.location.hash!=='#') {
        requirejs(['page/' + window.location.hash.substring(1), 'app/boot'], function (page, boot) {
            boot.render(page);
        });
    } else {
        requirejs(['app/main']);
    }
});

