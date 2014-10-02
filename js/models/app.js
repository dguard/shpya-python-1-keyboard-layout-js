"use strict";
define(function(require){
    var $ = require('jquery'),
        appView = require('views/app');

    return {
        initialize: function(options){
            this.keyboard = options['keyboard'];
            debugger;
            this.view = appView.initialize($.extend({
                model: this
            }, options['view']));
            return this;
        }
    }
});