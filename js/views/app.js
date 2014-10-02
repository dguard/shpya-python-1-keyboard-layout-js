"use strict";
define(function(require){

    var $ = require('jquery'),
        layout = require('collections/layout'),
        filter = require('collections/filter'),
        keyboard = require('models/keyboard');

    return {
        initialize: function(options){
            this.model = options['model'];
            return this;
        },
        render: function(){
            this._renderLayouts();
            this._renderFilters();
            this._renderKeyboard();
            $('#keyboard-view__select').val(this.model.fieldId);
            $('#id_layouts').val(this.model.layoutType);
            this.assignEvents();
        },
        _renderKeyboard: function(){
            this.model.keyboard.view.render(this.model.field);
        },
        _renderLayouts: function(){
            var $label = $('<label>', {
                'for': 'id_layouts'
            }).text('Раскладка');
            var $select = $('<select>', {
                'id': 'id_layouts',
                "class": "form-control"
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
                });
                var isChecked = $.inArray(
                    filter.LIST_FILTER_TYPE[i], this.model.keyboard.layout.filters
                ) !== -1;
                var $checkbox = $('<input>', {
                    'type': 'checkbox',
                    'value': filter.LIST_FILTER_TYPE[i],
                    'id': id,
                    "checked": isChecked
                });
                $('.filters__list').append(
                    $('<div>', {"class": 'checkbox'}).html($label.append($checkbox, filter.items[i].name))
                );
            }
        },
        assignEvents: function(){
            $(document).on('click', '.filters__list [type=checkbox]', $.proxy(this.onChangeFilter, this));
            $(document).on('change', '#keyboard-view__select', $.proxy(this.onChangeField, this));
            $(document).on('change', '#id_layouts', $.proxy(this.onChangeLayout, this));
        },
        onChangeLayout: function(e){
            this.model.saveState();
        },
        onChangeFilter: function(e){
            var filter = e.currentTarget.value;
            if(e.currentTarget.checked) {
                this.model.keyboard.layout.addFilter(filter);
            } else {
                this.model.keyboard.layout.removeFilter(filter);
            }
            this.model.saveState();
        },
        onChangeField: function(e){
            var field = this.model.detectField(e.target.selectedIndex * 1);
            this.model.keyboard.view.render(field);
            this.model.saveState();
        },
        renderOutput: function($output){
            var self = this;
            highlightKey(self.model.text, 0);

            function highlightKey(text, index){
                var $dfd = self.model.keyboard.view.highlightKey('text', text[index]);
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