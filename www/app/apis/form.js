define(function (require) {
    return {
        getMetadataByName: function (targetDom) {
            var metadata = {};
            if (targetDom) {
                targetDom.find('[name]').each(function () {
                    var __thisName = $(this).attr('name');
                    metadata[__thisName] = {
                        selector: '[name="' + __thisName + '"]'
                    };
                    (function (alias) {
                        if (alias) {
                            metadata[__thisName].getAlias = function () {
                                return alias;
                            }
                        }
                    })($(this).attr('field-alias'));
                });
            }
            return metadata;
        },
        get: function (targetDom, metadata) {
            var rst = {};
            if (targetDom && targetDom.length > 0) {
                if (metadata) {
                    for (var mdk in metadata) {
                        if (metadata[mdk].skipGet || metadata[mdk].skipForm) {
                            continue;
                        }
                        if (metadata[mdk].getVal) {
                            rst[mdk] = metadata[mdk].getVal(targetDom, metadata[mdk], metadata);
                        } else {
                            if (metadata[mdk].selector) {
                                rst[mdk] = targetDom.find(metadata[mdk].selector).val();
                            }
                        }
                    }
                }
            }
            return rst;
        },
        set: function (targetDom, metadata, data) {
            if (targetDom && targetDom.length > 0) {
                if (metadata && data) {
                    for (var mdk in metadata) {
                        if (metadata[mdk].skipSet || metadata[mdk].skipForm) {
                            continue;
                        }
                        if (metadata[mdk].setVal) {
                            metadata[mdk].setVal(targetDom, data[mdk], metadata[mdk], metadata);
                        } else {
                            if (metadata[mdk].selector) {
                                targetDom.find(metadata[mdk].selector).val(data[mdk]);
                                if (metadata[mdk].valueChangeTrigger) {
                                    if (typeof (metadata[mdk].valueChangeTrigger) === 'function') {
                                        metadata[mdk].valueChangeTrigger(targetDom, metadata[mdk], metadata);
                                    } else {
                                        if (metadata[mdk].valueChangeTrigger.data) {
                                            targetDom.find(metadata[mdk].selector).trigger(metadata[mdk].valueChangeTrigger.event, metadata[mdk].valueChangeTrigger.data);
                                        } else {
                                            targetDom.find(metadata[mdk].selector).trigger(metadata[mdk].valueChangeTrigger.event);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        setDisable: function (targetDom, metadata) {
            if (targetDom && targetDom.length > 0) {
                if (metadata) {
                    for (var mdk in metadata) {
                        if (metadata[mdk].setDisable) {
                            metadata[mdk].setDisable(targetDom, metadata[mdk], metadata);
                        } else {
                            if (metadata[mdk].selector) {
                                targetDom.find(metadata[mdk].selector).prop('disabled', true).attr("disabled", "disabled");
                            }
                        }
                    }
                }
            }
        },
        setEnable: function (targetDom, metadata) {
            if (targetDom && targetDom.length > 0) {
                if (metadata) {
                    for (var mdk in metadata) {
                        if (metadata[mdk].setEnable) {
                            metadata[mdk].setEnable(targetDom, metadata[mdk], metadata);
                        } else {
                            if (metadata[mdk].selector) {
                                targetDom.find(metadata[mdk].selector).prop('disabled', false).removeAttr('disabled');
                            }
                        }
                    }
                }
            }
        },
        setReadOnly: function (targetDom, metadata) {
            if (targetDom && targetDom.length > 0) {
                if (metadata) {
                    for (var mdk in metadata) {
                        if (metadata[mdk].setReadOnly) {
                            metadata[mdk].setReadOnly(targetDom, metadata[mdk], metadata);
                        } else {
                            if (metadata[mdk].selector) {
                                targetDom.find(metadata[mdk].selector).prop('readOnly', true).prop('readonly', true);
                            }
                        }
                    }
                }
            }
        },
        setWritable: function (targetDom, metadata) {
            if (targetDom && targetDom.length > 0) {
                if (metadata) {
                    for (var mdk in metadata) {
                        if (metadata[mdk].setWritable) {
                            metadata[mdk].setWritable(targetDom, metadata[mdk], metadata);
                        } else {
                            if (metadata[mdk].selector) {
                                targetDom.find(metadata[mdk].selector).prop('readOnly', false).prop('readonly', false).removeAttr('readOnly').removeAttr('readonly');
                            }
                        }
                    }
                }
            }
        },
        toShow: function (targetDom, metadata) {
            if (targetDom && targetDom.length > 0) {
                if (metadata) {
                    for (var mdk in metadata) {
                        if (metadata[mdk].toShow) {
                            metadata[mdk].toShow(targetDom, metadata[mdk], metadata);
                        } else {
                            if (metadata[mdk].selector) {
                                targetDom.find(metadata[mdk].selector).show();
                            }
                        }
                    }
                }
            }
        },
        toHide: function (targetDom, metadata) {
            if (targetDom && targetDom.length > 0) {
                if (metadata) {
                    for (var mdk in metadata) {
                        if (metadata[mdk].toHide) {
                            metadata[mdk].toHide(targetDom, metadata[mdk], metadata);
                        } else {
                            if (metadata[mdk].selector) {
                                targetDom.find(metadata[mdk].selector).hide();
                            }
                        }
                    }
                }
            }
        },
        toRemove: function (targetDom, metadata) {
            if (targetDom && targetDom.length > 0) {
                if (metadata) {
                    for (var mdk in metadata) {
                        if (metadata[mdk].toRemove) {
                            metadata[mdk].toRemove(targetDom, metadata[mdk], metadata);
                        } else {
                            if (metadata[mdk].selector) {
                                targetDom.find(metadata[mdk].selector).remove();
                            }
                        }
                    }
                }
            }
        },
        bindEvents: function (targetDom, metadata) {
            if (targetDom && targetDom.length > 0) {
                if (metadata) {
                    for (var mdk in metadata) {
                        if (metadata[mdk].selector && metadata[mdk].events && metadata[mdk].events.length > 0) {
                            for (var i in metadata[mdk].events) {
                                (function (eventItem) {
                                    targetDom.find(metadata[mdk].selector).unbind(eventItem.event).bind(eventItem.event, { eventItem: eventItem }, function () {
                                        if (eventItem.intercept) {
                                            if (eventItem.intercept.before) {
                                                eventItem.intercept.before.apply(this, arguments);
                                            }
                                        }
                                        eventItem.action.apply(this, arguments);
                                        if (eventItem.intercept) {
                                            if (eventItem.intercept.after) {
                                                eventItem.intercept.after.apply(this, arguments);
                                            }
                                        }
                                    });
                                })(metadata[mdk].events[i]);

                            }
                        }
                    }
                }
            }
        },
        setElemData: function (targetDom, metadata, data) {
            if (targetDom && targetDom.length > 0) {
                if (metadata && data) {
                    for (var mdk in metadata) {
                        if (metadata[mdk]) {
                            if (metadata[mdk].setElemData) {
                                metadata[mdk].setElemData(targetDom, data[mdk], metadata[mdk], metadata);
                            } else {
                                if (metadata[mdk].selector) {
                                    targetDom.find(metadata[mdk].selector).data(mdk, data[mdk]);
                                }
                            }
                        }
                    }
                }
            }
        },
        getElemData: function (targetDom, metadata) {
            var rst = {};
            if (targetDom && targetDom.length > 0) {
                if (metadata) {
                    for (var mdk in metadata) {
                        if (metadata[mdk]) {
                            if (metadata[mdk].getElemData) {
                                rst[mdk] = metadata[mdk].getElemData(targetDom, metadata[mdk], metadata);
                            } else {
                                if (metadata[mdk].selector) {
                                    rst[mdk] = targetDom.find(metadata[mdk].selector).data(mdk);
                                }
                            }
                        }
                    }
                }
            }
            return rst;
        },
    };
});