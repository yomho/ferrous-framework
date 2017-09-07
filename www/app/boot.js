define(function (require) {
    return {
        __getRootElement: function (request) {
            return $('body');
        },
        generatePageDom: function (page, request) {
            var html = (request && request.runtime && request.runtime.html) || null;
            if (page.jcp.html) {
                if (page.jcp.html.layout) {
                    var partProcess = function (part, i, parts) {
                        var dom = $(part);
                        if (html) {
                            html.parts.splice(i, 0, {
                                COM: parts[i],/*Configuration Object Model*/
                                SOM: part,/*String Object Model*/
                                DOM: dom/*Document Object Model*/
                            });
                        }
                        return dom;
                    };
                    var layoutProcess = function (layout) {
                        if (page.jcp.html.parts && page.jcp.html.parts.length > 0) {
                            var concurrentLoadHtmlPartsTasks = [];
                            var part, dom, partSetting;
                            for (var i = 0, l = page.jcp.html.parts.length; i < l; i++) {
                                if (page.jcp.html.parts[i].getDOM) {
                                    part = page.jcp.html.parts[i].getDOM.call(page);
                                    dom = partProcess(part, i, page.jcp.html.parts);
                                    partSetting = page.jcp.html.parts[i];
                                    partSetting.instance = dom;
                                    if (partSetting.render) {
                                        partSetting.render.call(page, layout, dom);
                                    } else if (partSetting.selector) {
                                        layout.find(partSetting.selector).html(dom);
                                    }
                                }
                            }
                        }
                    };
                    if (page.jcp.html.layout.getDOM) {
                        var layout = $(page.jcp.html.layout.getDOM.call(page));
                        layoutProcess(layout);
                        return layout;
                    }
                }
            } 
        },
        render: function (page) {
            if (!page) {
                return;
            }
            var request = {
                boot: this,
                context: {
                    page: page
                },
                runtime: {
                    html: {
                        parts: []
                    },
                    jsx: [],
                    js: []
                },
                storage: {}
            };
            if (request.context.page) {
                if (request.context.page.jcp) {
                    /*step1:解析html*/
                    var util = require('app/util');
                    if (request.context.page.getRootElement) {
                        request.root = request.context.page.getRootElement(request);
                    } else {
                        request.root = this.__getRootElement(request);
                    }
                    util.async.getPromise(function (setAsyncResult) {
                        if (request.context.page.jcp.html) {
                            if (request.context.page.jcp.html.layout) {
                                var layout = request.boot.generatePageDom(request.context.page, request);
                                if (layout) {
                                    request.root.html(layout);
                                    request.layout = layout;
                                    setAsyncResult(1);
                                } else {
                                    setAsyncResult(0);
                                }
                            } else {
                                setAsyncResult(-1);
                            }
                        } else {
                            setAsyncResult(-2);
                        }
                    })
                    .then(function (result) {
                        /*step2:准备imports相关的资源(功能相关的静态数据字典)*/
                        return util.async.getPromise(function (setAsyncResult) {
                            if (request.context.page.imports) {
                                if (request.context.page.imports.getAsyncProperties) {
                                    request.context.page.imports.getAsyncProperties(request, function (properties) {
                                        if (request.context.page.imports.properties) {
                                            $.extend(true, request.context.page.imports.properties, properties);
                                        } else {
                                            request.context.page.imports.properties = properties;
                                        }
                                        delete request.context.page.imports.getAsyncProperties;
                                        setAsyncResult(1);
                                    });
                                    return;
                                }
                            }
                            setAsyncResult(0);
                        });
                    })
                    .then(function (result) {
                        /*step3:解析js*/
                        return util.async.getPromise(function (setAsyncResult) {
                            if (request.context.page.jcp.js && request.context.page.jcp.js.length > 0) {
                                var itemAction = function (i, js, request) {
                                    request.runtime.js.splice(i, 0, {
                                        COM: request.context.page.jcp.js[i],/*Configuration Object Modole*/
                                        OOM: js/*Oriented Object Model*/
                                    });
                                    if (js && js.init) {
                                        if (request.context.page.jcp.js[i].getParam) {
                                            js.init(request, request.context.page.jcp.js[i].getParam.call(request.context.page.jcp.js[i], request));
                                        } else {
                                            js.init(request);
                                        }
                                    }
                                };
                                for (var i = 0, l = request.context.page.jcp.js.length; i < l; i++) {
                                    if (request.context.page.jcp.js[i].getJOM) {
                                        itemAction(i, request.context.page.jcp.js[i].getJOM(request), request);
                                    }
                                    //else {
                                    //     (function (i, request) {
                                    //        require([request.context.page.jcp.js[i].uri], function (js) {
                                    //            itemAction(i, js, request);
                                    //        }, function (err) {
                                    //            resolver.__log('resolver “' + request.context.page.jcp.js[i].uri + '” err', err);
                                    //            resolver.rollback(request);
                                    //        });
                                    //     })(i, request);
                                    //}
                                }
                                setAsyncResult(1);
                            } else {
                                setAsyncResult(0);
                            }
                        });
                    })
                    .then(function (result) {
                        /*step4:解析jscode*/
                        return util.async.getPromise(function (setAsyncResult) {
                            if (request.context.page.jcp.jscode && request.context.page.jcp.jscode.length > 0) {
                                //var concurrentRenderJsTasks = [];
                                for (var i = 0, l = request.context.page.jcp.jscode.length; i < l; i++) {
                                    request.context.page.jcp.jscode[i](request);
                                }
                                setAsyncResult(1);
                            } else {
                                setAsyncResult(0);
                            }
                        });
                    })
                    .then(function (result) {
                        /*step6:解析plugs*/
                        return util.async.getPromise(function (setAsyncResult) {
                            setAsyncResult(0);
                            return;
                        });
                    })
                    .then(function (result) {
                        /*step-last:执行回调*/
                        return util.async.getPromise(function (setAsyncResult) {
                            if (request.context && request.context.events) {
                                if (request.context.events['completed']) {
                                    request.context.events['completed'].call(request, request.context.page);
                                }
                            }
                            setAsyncResult(1);
                        });
                    });

                }
            }
        }
    };
});