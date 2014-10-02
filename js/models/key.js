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
                    return $('<div>', {
                        'class': 'key key_size_' + self['size']
                    }).text(this[field]);
                },
                renderSymbol: function(field, layout_mode){
                    field = field.replace(/symbol\./, '');
                    for(var i = 0; i < this.symbols.length; i++) {
                        if(this.symbols[i]["layout_mode"] === layout_mode) {
                            return $('<div>', {
                                'class': 'key key_size_' + self['size']
                            }).text(this.symbols[i][field]);
                        }
                    }
                    return null;
                }
            }, options);
        }
    }
});