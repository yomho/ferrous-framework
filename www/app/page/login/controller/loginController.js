define(function (require) {
    return {
        init: function (request) {
            request.layout.css({ 'color': 'red' });
            request.layout.find('button').unbind('click').bind('click', function () {
                request.localet.navigate('admin/home', {
                    trigger: true
                });
            });
        }
    };
});