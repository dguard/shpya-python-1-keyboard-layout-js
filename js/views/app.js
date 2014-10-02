"use strict";
define(function(require){

    var $ = require('jquery'),
        layout = require('collections/layout'),
        filter = require('collections/filter');

    return {
        initialize: function(options){
            this.keyboard = options['keyboard'];
            return this;
        },
        render: function(){
            this._renderLayouts();
            this._renderFilters();
            this.assignEvents();
        },
        _renderLayouts: function(){
            var $label = $('<label>', {
                'for': 'id_layouts'
            }).text('Английские');
            var $select = $('<select>', {
                'id': 'id_layouts'
            });

            for(var i =0; i < layout.items.length;i++) {
                var $option = $('<option>', {
                    'type': 'checkbox',
                    'value': layout.LIST_LAYOUT_TYPE[i]
                }).text(layout.items[layout.LIST_LAYOUT_TYPE[i]].name);
                $select.append($option);
            }
            $('.layouts__list').append($label, $select, '<br>');
        },
        _renderFilters: function(){
            for(var i =0; i < filter.items.length;i++) {
                var id = 'id_filter_' + i;
                var $label = $('<label>', {
                    'for': id
                }).text(filter.items[i].name);

                var $checkbox = $('<input>', {
                    'type': 'checkbox',
                    'value': filter.LIST_FILTER_TYPE[i],
                    'id': id
                });
                $('.filters__list').append($checkbox, $label, '<br>');
            }
        },
        assignEvents: function(){
            var KEYBOARD_VIEW_SYMBOLS = 0;
            var KEYBOARD_VIEW_RATE_OF_EFFICIENCY = 1;
            var KEYBOARD_VIEW_RATE_OF_MAX_EFFICIENCY = 2;
            var KEYBOARD_VIEW_USAGE = 3;
            var KEYBOARD_VIEW_USAGE_PERCENT = 4;
            var KEYBOARD_VIEW_RATIO_EFFICIENCY = 5;

            $(document).on('change', '#keyboard-view__select', $.proxy(function(e){
                debugger;
                var val = e.target.selectedIndex;
                if(val === KEYBOARD_VIEW_SYMBOLS) {
                    this.keyboard.render('text');
                } else if (val === KEYBOARD_VIEW_RATE_OF_EFFICIENCY) {
                    this.keyboard.render('rate');
                } else if (val === KEYBOARD_VIEW_RATE_OF_MAX_EFFICIENCY) {
                    this.keyboard.render('rateOfMax');
                } else if (val === KEYBOARD_VIEW_USAGE) {
                    this.keyboard.render('symbol.usage');
                } else if (val === KEYBOARD_VIEW_USAGE_PERCENT) {
                    this.keyboard.render('symbol.usagePercent');
                } else if (val === KEYBOARD_VIEW_RATIO_EFFICIENCY) {
                    this.keyboard.render('ratioEfficiency');
                }
            }, this));
        },
        renderOutput: function($output, text){
            var self = this;
            highlightKey(text, 0);

            function highlightKey(text, index){
                var $dfd = self.keyboard.highlightKey('text', text[index]);
                $dfd.done(function(data){
                    if(data.key) {
                        $output.append(data.symbol);
                        $output.scrollTop($output[0].scrollHeight - $output.height());
                    }
                    if(index < text.length-1) {
                        highlightKey(text, index+1);
                    }
                });
            }
        }
    };
});