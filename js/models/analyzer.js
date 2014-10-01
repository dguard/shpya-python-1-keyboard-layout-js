"use strict";
define(function(require){
    var filter = require('collections/filter'),
        helper = require('helpers/helper');

    return {
        analyze: function(text, layout){
            var previousKey = '';

            for(var i = 0; i < text.length; i++) {
                for(var j = 0; j < layout.keys.length; j++) {
                    if(text[i] === layout.keys[j].text) {
                        layout.keys[j].symbol.usage++;
                        this._updatePreFilter(layout, previousKey, layout.keys[j]);
                        previousKey = layout.keys[j];
                        break;
                    }
                }
            }
            layout.statistics['textCount'] = text.length;
            this._updatePostFilters(layout);
        },
        _updatePreFilter: function(layout, previousKey, currentKey){
            if(layout.filters.indexOf(filter.FILTER_TYPE_CHANGE_HANDS) !== -1 && previousKey
                && filter.items[filter.FILTER_TYPE_CHANGE_HANDS].handsAreChanged(previousKey, currentKey)
            ) {
                !layout.statistics['changeHandsCount'] && (layout.statistics['changeHandsCount'] = 0);
                layout.statistics['changeHandsCount']++;
            }
        },
        _updatePostFilters: function(layout){
            for(var i = 0; i < layout.filters.length; i++) {
                filter.items[layout.filters[i]].run(layout.keys);
            }
            layout.countMaxRate();
            for(i = 0; i < layout.keys.length; i++) {
                layout.keys[i].symbol.usagePercent = helper.rtrimNulls(
                    (layout.keys[i].symbol.usage / layout.statistics['textCount'] * 100).toFixed(1), 1
                );
                layout.keys[i].rateOfMax = helper.rtrimNulls(
                    (layout.keys[i].rate / layout['statistics']['maxRate']) * 100, 1
                );
                layout.keys[i].ratioEfficiency = helper.rtrimNulls(
                    (layout.keys[i].rate * layout.keys[i].symbol.usage)
                        / (layout['statistics']['maxRate'] * layout['statistics']['textCount']) * 100, 1
                );
            }
        }
    };
});