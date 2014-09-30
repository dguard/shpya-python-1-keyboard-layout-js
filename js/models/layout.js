define(function(require){
    var $ = require('jquery'),
        symbol = require('models/symbol'),
        key = require('models/key'),
        helper = require('helpers/helper');

    var create = function(options) {
        options['layout'] && helper.throwError('Не задано поле layout');

        var newKeys = [];

        for(var c = 0; c < this.LIST_LAYOUT_TYPE.length; c++) {
            var layout_type = this.LIST_LAYOUT_TYPE[c];

            for(var i = 0; i < options.keys[layout_type].length; i++) {
                for(var j = 0; j < options.keys[layout_type][i].length; j++) {
                    options.keys[layout_type][i][j] = key.create({
                        text: options.keys[layout_type][i][j],
                        "symbol": symbol.create({'text': options.keys[layout_type][i][j]}),
                        "posX": j,
                        "posY": i,
                        layout_type: layout_type
                    });
                }
            }
            newKeys = [].concat.apply(newKeys,
                [].concat.apply([], options.keys[layout_type])
            );
        }
        options.keys = newKeys;

        return $.extend({
            keys: [],
            filters: [],
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

    var LAYOUT_TYPE_STANDARD = 'standard',
        LAYOUT_TYPE_UPPERCASE = 'uppercase';

    return {
        LANGUAGE_RU: 'ru',
        LANGUAGE_EN: 'en',
        LAYOUT_TYPE_STANDARD: LAYOUT_TYPE_STANDARD,
        LAYOUT_TYPE_UPPERCASE: LAYOUT_TYPE_UPPERCASE,
        LIST_LAYOUT_TYPE: [
            LAYOUT_TYPE_STANDARD,
            LAYOUT_TYPE_UPPERCASE
        ],
        create: create
    };

});