define(function (require) {
    return {
        global: {
            page: {
                includeGlobalRes: function () {
                    this.css.require();
                    this.js.require();
                },
                css: {
                    require: function () {
                        require('css!res/jquery-ui/jquery-ui.min.css');
                        require('css!res/jquery-ui/jquery-ui.structure.min.css');
                        require('css!res/jquery-ui/jquery-ui.theme.min.css');
                    }
                },
                js: {
                    require: function () {
                        require('jquery');
                        require('jquery-ui.min');
                    }
                }
            },
            env: {

            }
        }
    };
});