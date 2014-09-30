define(function(require){
    var $ = require('jquery');

    return {
        SIZE_STANDARD: 'standard',
        SIZE_MEDIUM: 'medium',
        SIZE_LARGE: 'large',
        initialize: function(options){
            this.$container = options.$container;
            this.ANIMATION_SPEED = 10;
            this.layout = options.layout;
            options['animation_speed'] || (this.ANIMATION_SPEED = options['animation_speed']);

            return this;
        },
        render: function(field){
            var $table = $('<div>', {'class': 'keyboard'});
            var keys = this.layout.keys;

            var $row = '';

            for(var i = 0; i < keys.length; i++) { // rows as arrays
                var key = keys[i];
                if(key['layout_type'] !== 'standard') continue;
                if(key['posX'] === 0) {
                    $row && ($table.append($row));
                    $row = $('<div>', {'class': 'keyboard__row'});
                }
                $row.append(key.render(field));
            }
            this.$container.html($table);
            return this;
        },
        highlightKey: function(field, symbol){
            var key = this.layout.getElementByField(field, symbol);
            var $dfd = $.Deferred();

            setTimeout($.proxy(function(){
                var $keyboard = $('.keyboard');
                if(this.activeKey) {
                    $keyboard.find('.keyboard__row').eq(this.activeKey.posY)
                        .find('div').eq(this.activeKey.posX)
                        .removeClass('key_hightlighted');
                }
                $keyboard
                    .find('.keyboard__row').eq(key.posY)
                    .find('div').eq(key.posX)
                    .addClass('key_hightlighted');
                this.activeKey = key;
                $dfd.resolve({'key': key});
            }, this), this.ANIMATION_SPEED);

            return $dfd.promise();
        }
    }
});
