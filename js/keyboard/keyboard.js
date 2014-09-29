$(function(){
    window.dt || (window.dt = {});

    var SIZE_STANDARD = 'standard';
    var SIZE_MEDIUM = 'medium';
    var SIZE_LARGE = 'large';

    window.dt.keyboard = {
        initialize: function(options){
            this.$container = options.$container;
            this.ANIMATION_SPEED = 10;
            options['animation_speed'] || (this.ANIMATION_SPEED = options['animation_speed']);

            this.keys = this._createKeysObjects(options.keys);
            this.renderedKeys = [];
            this.render();
        },
        render: function(){
            var $table = $('<div>', {'class': 'keyboard'});

            for(var i = 0; i < this.keys.length; i++) { // rows as arrays
                var $row = $('<div>', {'class': 'keyboard__row'});

                for(var j = 0; j < this.keys[i].length; j++) {
                    var key = this.keys[i][j];

                    $row.append(this.renderKey(key));
                    this.renderedKeys.push({
                        'text': key.text,
                        'pos': i + "-" + j
                    });
                }
                $table.append($row);
            }
            this.$container.html($table);
        },
        getElementByField: function(fieldName, value, list){
            for(var i = 0; i < list.length; i++) {
                if(list[i][fieldName] && list[i][fieldName] === value) {
                    return list[i];
                }
            }
            return null;
        },
        _createKeysObjects: function(keys){
            var newKeys = [];

            for(var i = 0; i < keys.length; i++) {
                var newRow = [];

                for(var j = 0; j < keys[i].length; j++) {
                    var key = keys[i][j];

                    if(typeof key !== 'object') {
                        key = {
                            'text': key,
                            'size': SIZE_STANDARD
                        }
                    }
                    newRow.push(key);
                }
                newKeys.push(newRow);
            }
            return newKeys;
        },
        renderKey: function(key){
            return $('<div>', {
                'class': 'key key_size_' + key['size']
            }).text(key['text']);
        },
        highlightKey: function(keyText){
            var $dfd = $.Deferred();

            setTimeout($.proxy(function(){
                var key = this.getElementByField('text', keyText.toLowerCase(), this.renderedKeys);
                var pos = key.pos.split('-');
                if(this.activeKey) {
                    var posActive = this.activeKey.pos.split('-');
                    $('.keyboard').find('.keyboard__row').eq(posActive[0]).find('div').eq(posActive[1])
                        .removeClass('key_hightlighted');
                }
                debugger;
                $('.keyboard').find('.keyboard__row').eq(pos[0]).find('div').eq(pos[1])
                    .addClass('key_hightlighted');
                this.activeKey = key;
                $dfd.resolve({'keyText': keyText});
            }, this), this.ANIMATION_SPEED);

            return $dfd.promise();
        }
    }
});
