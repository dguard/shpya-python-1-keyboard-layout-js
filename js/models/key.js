"use strict";
define(function(require){
    var $ = require('jquery'),
        helper = require('helpers/helper'),
        SIZE_STANDARD = 'standard';

    return {
        SIZE_STANDARD: SIZE_STANDARD,
        create: function(options) {
            return $.extend({
                "symbols": [],
                "posX": -1,
                "posY": -1,
                "size": SIZE_STANDARD,
                "rate": 100,
                "usage": 0,
                render: function(field){
                    var self = this;
                    var val = this[field];
                    if(val == '\n' && val !== 0) {
                        val = "&nbsp;";
                    }
                    return $('<div>', {
                        'class': 'key key_size_' + self['size']
                    }).html(val);
                },
                renderSymbol: function(field, layout_mode){
                    var self = this;
                    field = field.replace(/symbol\./, '');
                    for(var i = 0; i < this.symbols.length; i++) {
                        if(this.symbols[i]["layout_mode"] === layout_mode) {
                            var val = this.symbols[i][field];
                            if(val == '\n' && val !== 0) {
                                val = "&nbsp;";
                            }
                            return $('<div>', {
                                'class': 'key key_size_' + self['size']
                            }).html(val);
                        }
                    }
                    return null;
                }
            }, options);
        }
    }
});