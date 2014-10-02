"use strict";
define(function(require){
    var $ = require('jquery');

    return {
        SIZE_STANDARD: 'standard',
        SIZE_MEDIUM: 'medium',
        SIZE_LARGE: 'large',
        ANIMATION_SPEED: 0,
        initialize: function(options){
            this.$container = options["$container"];
            this.model = options["model"];
            options['animation_speed'] && (this.ANIMATION_SPEED = options['animation_speed']);

            return this;
        },
        render: function(field, layout_mode){
            var $table = $('<div>', {'class': 'keyboard'});
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
            this.$container.html($table);
            return this;
        },
        highlightKey: function(field, symbol){
            var key = this.model.layout.getElementByText(symbol);
            var $dfd = $.Deferred();

            setTimeout($.proxy(function(){
                if(key) {
                    var $keyboard = $('.keyboard');
                    if(this.model.activeKey) {
                        $keyboard.find('.keyboard__row').eq(this.model.activeKey.posY)
                            .find('div').eq(this.model.activeKey.posX)
                            .removeClass('key_hightlighted');
                    }
                    $keyboard
                        .find('.keyboard__row').eq(key.posY)
                        .find('div').eq(key.posX)
                        .addClass('key_hightlighted');
                    this.model.activeKey = key;
                }
                $dfd.resolve({'key': key, 'symbol': symbol});
            }, this), this.ANIMATION_SPEED);

            return $dfd.promise();
        }
    }
});