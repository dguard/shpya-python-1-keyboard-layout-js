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

            var k = 0;

            for(var i = 0; i < options.keys[layout_mode].length; i++) {
                for(var j = 0; j < options.keys[layout_mode][i].length; j++) {
                    if(this.LAYOUT_MODE_STANDARD === layout_mode) {
                        // TODO refactor
                        if(typeof options.keys[layout_mode][i][j] === 'object') {
                            newKeys[k] = key.create($.extend({
                                "symbols": [symbol.create({
                                    'text': options.keys[layout_mode][i][j]['text'],
                                    "layout_mode": layout_mode
                                })],
                                "posX": j,
                                "posY": i
                            }, options.keys[layout_mode][i][j]));
                        } else {
                            newKeys[k] = key.create({
                                "symbols": [symbol.create({
                                    'text': options.keys[layout_mode][i][j],
                                    "layout_mode": layout_mode
                                })],
                                "posX": j,
                                "posY": i
                            });
                        }
                    } else if(this.LAYOUT_MODE_UPPERCASE === layout_mode) {
                        if(typeof options.keys[layout_mode][i][j] === "object") {
                            var text = options.keys[layout_mode][i][j]['text'];
                        } else {
                            var text = options.keys[layout_mode][i][j]
                        }

                        newKeys[k].symbols.push(
                            symbol.create({
                                "text": text,
                                "mod": "shift",
                                "layout_mode": layout_mode
                            })
                        );
                    }
                    k++;
                }
            }
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
            countMaxUsage: function(){
                var max = Number.MIN_VALUE;
                for(var i = 0; i < this.keys.length; i++) {
                    if(this.keys[i].usage > max) {
                        max = this.keys[i].usage;
                    }
                }
                this.statistics.maxUsage = max;
            },
            getElementByText: function(value){
                for(var i = 0; i < this.keys.length; i++) {
                    for(var j = 0; j < this.keys[i].symbols.length; j++) {
                        if(this.keys[i].symbols[j].text === value) {
                            return this.keys[i];
                        }
                    }
                }
                return null;
            },
            addFilter: function(filter){
                this.filters.push(filter);
                // TODO add array_unique
            },
            removeFilter: function(filter){
                for(var i = 0; i < this.filters.length; i++) {
                    if(this.filters[i] == filter) {
                        this.filters.splice(i, 1);
                    }
                }
            },
            countKeyUsagePercent: function(){
                for(var i = 0; i < this.keys.length; i++) {
                    this.keys[i].usagePercent = helper.rtrimNulls(this.keys[i].usage / this.statistics['totalUsage'] * 100, 1);
                }
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