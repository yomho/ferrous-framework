define(function (require) {
    return {
        async: {
            getPromise: function (asyncTask) {
                var def = $.Deferred();
                setTimeout(function () {
                    asyncTask(function (asyncResult) {
                        def.resolve(asyncResult);
                    });
                });
                return def.promise();
            },
            getConcurrentPromise: function () {
                var promiseTasks = [];
                for (var i = 0; i < arguments.length; i++) {
                    promiseTasks.push(sys.async.getPromise(arguments[i]));
                }
                return $.when.apply($, promiseTasks);
            }
        }
    };
});