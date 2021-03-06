﻿define(function (require) {
    return {
        init: function (args) {
            var Backbone = require('backbone');
            var localet = require('app/localet');
            
            var backboneRoute = Backbone.Router.extend({
                routes: {
                    '': 'main',
                    "*page": "page",
                    "*page/:query": "pageWithQuery",
                    
                    "search/:query": "search",  // #search/kiwis
                    //"search/:query/p:page": "search"   // #search/kiwis/p7
                },
                main: function () {
                    localet.navigate('login', {
                        trigger: true
                    });
                },
                page: function (url) {
                    this.pageWithQuery(url);
                },
                pageWithQuery: function (url, query) {
                    if (localet.__isUnsafeHashPageRendering()) {
                        /*如果前端使用的第三方框架对window对象有污染性，建议每次解析页面时都刷新一次window来净化windows对象的hook */
                        return;
                    }
                    if (url) {
                        if (url === 'login') {
                            var api = require('app/api');
                            var authApi = api.getAuthApi();
                            if (authApi.isExistsTicket()) {
                                localet.navigate('admin/home', {
                                    trigger: true
                                });
                                return;
                            }
                        }
                        var segments = url.split('/');
                        var pageUrl = 'page/' + url + '/' + segments[segments.length - 1] + '-jcp';
                        require([pageUrl], function (page) {
                            localet.handle({
                                hash: url,
                                page: page,
                                url: pageUrl,
                                query: query
                            });
                        });
                    }
                }
                //search: function (query, page) {
                //    alert('search');
                //}
            });
            var router = new backboneRoute();
            localet.navigate = function () {
                router.navigate.apply(router, arguments);
            };
            Backbone.history.start();
            //Backbone.history.start({ root: "/www", pushState: true });
        }
    }
});
