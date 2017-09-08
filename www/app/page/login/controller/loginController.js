define(function (require) {
    return {
        init: function (request) {
            request.layout.css({ 'color': 'red' });
            request.layout.find('[type="button"]').unbind('click').bind('click', function () {
                var formApi = require('app/api').getFormApi();
                var formData = formApi.get(request.layout, formApi.getMetadataByName(request.layout));
                if (!formData.username) {
                    alert('Username can not be empty.');
                    return;
                }
                if (!formData.password) {
                    alert('Password can not be empty.');
                    return;
                }
                if (formData.username === 'admin' && formData.password === '123456') {
                    var authApi = require('app/api').getAuthApi();
                    authApi.setTicket(JSON.stringify(formData));
                    request.localet.navigate('admin/home', {
                        trigger: true
                    });
                } else {
                    alert('Username or Password may be wrong.');
                }
            });
        }
    };
});