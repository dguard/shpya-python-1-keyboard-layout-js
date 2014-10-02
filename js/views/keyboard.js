"use strict";
define(function(require){
    var $ = require('jquery'),
        layout = require('models/layout');

    return {
        SIZE_STANDARD: 'standard',
        SIZE_MEDIUM: 'medium',
        SIZE_LARGE: 'large',
        ANIMATION_SPEED: 100,
        initialize: function(options){
            this.$container = options["$container"];
            this.model = options["model"];
            options['animation_speed'] && (this.ANIMATION_SPEED = options['animation_speed']);

            return this;
        },
        render: function(field){
            var $tables = [];
            for(var i = 0; i < layout.LIST_LAYOUT_MODE.length; i++) {
                $tables.push(this.renderKeyboard(field, layout.LIST_LAYOUT_MODE[i]));
            }
            $tables[0].addClass('active');
            this.$container.html($tables);

            return this;
        },
        renderKeyboard: function(field, layout_mode){
            var $table = $('<div>', {'class': 'keyboard ' + layout_mode});
            var keys = this.model.layout.keys;

            var $row = '';
            var useSymbolField = field.indexOf('symbol') !== -1;

            for(var i = 0; i < keys.length; i++) { // rows as arrays
                var key = keys[i];
                if(key['posX'] === 0) {
                    $row && ($table.append($row));
                    $row = $('<div>', {'class': 'keyboard__row'});
                }
                if(useSymbolField) {
                    $row.append(key.renderSymbol(field, layout_mode));
                } else {
                    $row.append(key.render(field));
                }
            }
            $table.append($row);

            return $table;
        },
        highlightKey: function(field, symbol){
            var key = this.model.layout.getElementByText(symbol);
            var $dfd = $.Deferred();

            setTimeout($.proxy(function(){
                if(key) { // keyboard layout may have not this character and returned null
                    var $activeKeyboard,
                        $keyboards = $('.keyboard');

                    // set current layout mode
                    this.model.layout.layout_mode = key['symbols'][0].text !== symbol ?
                        layout.LAYOUT_MODE_UPPERCASE : layout.LAYOUT_MODE_STANDARD;

                    // get current keyboard
                    $activeKeyboard = this.model.layout.layout_mode ?
                        $keyboards.filter('.' + this.model.layout.layout_mode) : $keyboards.eq(0);

                    // remove all highlighted keys and activate current keyboard
                    $activeKeyboard.find('.key_highlighted').removeClass('key_highlighted');
                    $keyboards.removeClass('active');
                    $activeKeyboard.addClass('active');

                    // highlights shift if required
                    if(this.model.layout.layout_mode === layout.LAYOUT_MODE_UPPERCASE) {
                        var shift = this.model.layout.getElementByText("shift");
                        this._highlightKey($activeKeyboard, shift);
                    }
                    this._highlightKey($activeKeyboard, key);
                }
                $dfd.resolve({'key': key, 'symbol': symbol});
            }, this), this.ANIMATION_SPEED);

            return $dfd.promise();
        },
        _highlightKey: function($keyboard, key){
            $keyboard.find('.keyboard__row').eq(key.posY)
                .find('div').eq(key.posX)
                .addClass('key_highlighted');
        }
    }
});