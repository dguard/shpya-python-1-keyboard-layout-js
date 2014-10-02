"use strict";
define(function(require){
    var filter = require('collections/filter'),
        helper = require('helpers/helper');

    return {
        analyze: function(text, layout){
            this.layout = layout;
            this.previousKey = '';

            for(var i = 0; i < text.length; i++) {
                for(var j = 0; j < this.layout.keys.length; j++) {
                    debugger;
                    this.analyzeKey(this.layout.keys[j], text[i]);
                }
            }
            this.layout.statistics['textCount'] = text.length;
            this._updatePostFilters();
        },
        analyzeKey: function(key, symbol){
            for(var k = 0; k < key.symbols.length; k++) {

                if(key.symbols[k].text === symbol) {
                    key.symbols[k].usage++;
                    key.usage++;

                    this._updatePreFilter(this.previousKey, key);
                    this.previousKey = key;
                    break;
                }
            }
        },
        _updatePreFilter: function(previousKey, currentKey){
            if(this.layout.filters.indexOf(filter.FILTER_TYPE_CHANGE_HANDS) !== -1 && previousKey
                && filter.items[filter.FILTER_TYPE_CHANGE_HANDS].handsAreChanged(previousKey, currentKey)
            ) {
                !this.layout.statistics['changeHandsCount'] && (this.layout.statistics['changeHandsCount'] = 0);
                this.layout.statistics['changeHandsCount']++;
            }
        },
        _updatePostFilters: function(){
            for(var i = 0; i < this.layout.filters.length; i++) {
                filter.items[this.layout.filters[i]].run(this.layout.keys);
            }
            this.layout.countMaxRate();
            for(i = 0; i < this.layout.keys.length; i++) {
                for(var j = 0; j < this.layout.keys[i].symbols.length; j++) {
                    this.countUsagePercent(this.layout.keys[i]);
                    this.countRatioEfficiency(this.layout.keys[i]);
                }
                this.layout.keys[i].rateOfMax = helper.rtrimNulls(
                    (this.layout.keys[i].rate / this.layout['statistics']['maxRate']) * 100, 1
                );
            }
        },
        countUsagePercent: function(key){
            for(var j = 0; j < key.symbols.length; j++) {
                key.symbols[j].usagePercent = helper.rtrimNulls(
                    key.symbols[j].usage / this.layout.statistics['textCount'] * 100, 1
                );
            }
        },
        countRatioEfficiency: function(key){
            for(var j = 0; j < key.symbols.length; j++) {
                key.ratioEfficiency = helper.rtrimNulls(
                    (key.rate * key.symbols[j].usage)
                        / (this.layout['statistics']['maxRate'] * this.layout['statistics']['textCount']) * 100, 1
                );
            }
        }
    };
});