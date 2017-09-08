define(function (require) {
    return {
        metadata: {
            get: function () {
                return {
                    title :'管理首页'
                }
            }
        },
        jcp: {
            js: [
                {
                    getJOM: function () {
                        return require('page/admin/home/controller/homeController');
                    }
                }
            ],
            html: {
                layout: {
                    getDOM: function () {
                        return require('text!page/admin/home/view/layout.html');
                    }
                }
            }
        }
    };
});