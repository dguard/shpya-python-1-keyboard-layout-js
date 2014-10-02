"use strict";
define(function(require){
    var $ = require('jquery'),
        keyboardView = require('views/keyboard');

    return {
        KEYBOARD_VIEW_SYMBOLS: 0,
        KEYBOARD_VIEW_RATE_OF_EFFICIENCY: 1,
        KEYBOARD_VIEW_RATE_OF_MAX_EFFICIENCY: 2,
        KEYBOARD_VIEW_USAGE: 3,
        KEYBOARD_VIEW_USAGE_PERCENT: 4,
        KEYBOARD_VIEW_RATIO_EFFICIENCY: 5,

        initialize: function(options){
            this.layout = options['layout'];
            this.view = keyboardView.initialize($.extend({
                model: this
            }, options['view']));
            return this;
        }
    }
});