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
                render: function(field){
                    var self = this;
                    return $('<div>', {
                        'class': 'key key_size_' + self['size']
                    }).text(this[field]);
                }
            }, options);
        }
    }
});