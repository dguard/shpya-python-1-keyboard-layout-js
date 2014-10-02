"use strict";
define(function(require){
    var $ = require('jquery'),
        appView = require('views/app'),
        storage = require('localStorage'),
        layoutCollection = require('collections/layout'),
        filter = require('models/filter'),
        layout = require('models/layout'),
        keyboard = require('models/keyboard');

    return {
        initialize: function(options){
            this.view = appView.initialize($.extend({
                model: this
            }, options['view']));
            this.loadState();
            return this;
        },
        loadState: function(){
            var _app = $.localStorage.get("app");
            if(!_app){
                _app = {
                    layoutType: layoutCollection.LAYOUT_TYPE_QWERTY,
                    filters: filter.LIST_FILTER_TYPE,
                    layout_mode: layout.LAYOUT_MODE_STANDARD,
                    field: keyboard.KEYBOARD_VIEW_SYMBOLS
                };
            }
            this.fieldId = _app.field;
            this.field = this.detectField(_app.field);
            this.layoutType = _app.layoutType;

            this.keyboard = keyboard.initialize({
                layout: $.extend(layoutCollection.items[_app.layoutType], {
                    filters: _app.filters,
                    layout_mode: _app.layout_mode
                }),
                view: { "$container": $('.keyboard-container') }
            });
        },
        detectField: function(val){
            var field;
            val = val*1;
            if(keyboard.KEYBOARD_VIEW_SYMBOLS === val) {
                field = 'symbol.text';
            } else if (keyboard.KEYBOARD_VIEW_RATE_OF_EFFICIENCY === val) {
                field = 'rate';
            } else if (keyboard.KEYBOARD_VIEW_RATE_OF_MAX_EFFICIENCY === val) {
                field = 'rateOfMax';
            } else if (keyboard.KEYBOARD_VIEW_USAGE === val) {
                field = 'symbol.usage';
            } else if (keyboard.KEYBOARD_VIEW_USAGE_PERCENT === val) {
                field = 'symbol.usagePercent';
            } else if (keyboard.KEYBOARD_VIEW_RATIO_EFFICIENCY === val) {
                field = 'ratioEfficiency';
            }
            return field;
        },
        saveState: function(){
            var _app = {
                "filters": this.getFilters(),
                "layoutType": $('#id_layouts').val(),
                "field": $('#keyboard-view__select').val(),
                "layout_mode": this.keyboard.layout.layout_mode
            };
            $.localStorage.set("app", JSON.stringify(_app));
        },
        getFilters: function(){
            var filters = [];
            $.map($('.filters__list input[type=checkbox]'), function(elem, index){
                elem.checked && filters.push(
                    $(elem).val()*1
                );
            });
            return filters;
        }
    }
});