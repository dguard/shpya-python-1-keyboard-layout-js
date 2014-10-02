"use strict";
define(function(require){
    var $ = require('jquery'),
        keyboardView = require('views/keyboard');

    return {
        initialize: function(options){
            this.layout = options['layout'];
            this.view = keyboardView.initialize($.extend({
                model: this
            }, options['view']));
            return this;
        }
    }
});