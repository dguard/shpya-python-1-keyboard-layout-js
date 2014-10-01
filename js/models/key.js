"use strict";
define(function(require){
    var $ = require('jquery'),
        helper = require('helpers/helper'),
        SIZE_STANDARD = 'standard';

    return {
        SIZE_STANDARD: SIZE_STANDARD,
        create: function(options) {
            return $.extend({
                symbol: {},
                posX: -1,
                posY: -1,
                size: SIZE_STANDARD,
                rate: 100,
                render: function(field){
                    var value = this;
                    if(field.indexOf('.')) {
                        var parts = field.split('.');
                        while(parts.length) {
                            var part = parts.splice(0, 1);
                            value = value[part];
                        }
                    } else {
                        value = this[field];
                    }

                    var self = this;
                    return $('<div>', {
                        'class': 'key key_size_' + self['size']
                    }).text(value);
                }
            }, options);
        }
    }
});