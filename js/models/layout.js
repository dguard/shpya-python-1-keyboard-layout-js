"use strict";
define(function(require){
    var $ = require('jquery'),
        symbol = require('models/symbol'),
        key = require('models/key'),
        helper = require('helpers/helper');

    var create = function(options) {
        options['layout'] && helper.throwError('Не задано поле layout');

        var newKeys = [];

        for(var c = 0; c < this.LIST_LAYOUT_MODE.length; c++) {
            var layout_mode = this.LIST_LAYOUT_MODE[c];

            for(var i = 0; i < options.keys[layout_mode].length; i++) {
                for(var j = 0; j < options.keys[layout_mode][i].length; j++) {
                    options.keys[layout_mode][i][j] = key.create({
                        "text": options.keys[layout_mode][i][j],
                        "symbol": symbol.create({'text': options.keys[layout_mode][i][j]}),
                        "posX": j,
                        "posY": i,
                        "layout_mode": layout_mode
                    });
                }
            }
            newKeys = [].concat.apply(newKeys,
                [].concat.apply([], options.keys[layout_mode])
            );
        }
        options.keys = newKeys;

        return $.extend({
            keys: [],
            filters: [],
            statistics: {
                maxRate: 0
            },
            countMaxRate: function(){
                var max = Number.MIN_VALUE;
                for(var i = 0; i < this.keys.length; i++) {
                    if(this.keys[i].rate > max) {
                        max = this.keys[i].rate;
                    }
                }
                this.statistics.maxRate = max;
            },
            getElementByField: function(fieldName, value){
                for(var i = 0; i < this.keys.length; i++) {
                    if(this.keys[i][fieldName] && this.keys[i][fieldName] === value) {
                        return this.keys[i];
                    }
                }
                return null;
            }
        }, options);
    };

    var LAYOUT_MODE_STANDARD = 'standard',
        LAYOUT_MODE_UPPERCASE = 'uppercase';

    return {
        LANGUAGE_RU: 'ru',
        LANGUAGE_EN: 'en',
        LAYOUT_MODE_STANDARD: LAYOUT_MODE_STANDARD,
        LAYOUT_MODE_UPPERCASE: LAYOUT_MODE_UPPERCASE,
        LIST_LAYOUT_MODE: [
            LAYOUT_MODE_STANDARD,
            LAYOUT_MODE_UPPERCASE
        ],
        create: create
    };

});