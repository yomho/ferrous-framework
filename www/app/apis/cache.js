define(function (require) {
    var __getCacheRepository = function () {
        return window.localStorage;
    };
    return {        getItem: function (key) {
            if (key.name) {
                key = key.name;
            }
            return __getCacheRepository().getItem(key);
        },        setItem: function (key, value) {
            if (key.name) {
                key = key.name;
            }
            __getCacheRepository().setItem(key, value);
        },        removeItem: function (key) {
            __getCacheRepository().removeItem(key);
        },
        clear: function () {
            __getCacheRepository().clear();
        }
    };
});