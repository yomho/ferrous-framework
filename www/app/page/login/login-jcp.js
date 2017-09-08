define(function (require) {
    return {
        metadata: {
            get: function () {
                return {
                    title: '登录'
                }
            }
        },
        jcp: {
            js: [
                {
                    getJOM: function () {
                        return require('page/login/controller/loginController');
                    }
                }
            ],
            html: {
                layout: {
                    getDOM: function () {
                        return require('text!page/login/view/layout.html');
                    }
                }
            }
        }
    };
});