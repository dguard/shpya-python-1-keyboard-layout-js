"use strict";
require.config({
    baseUrl: 'js',
    paths: {
        jquery: '../vendor/jquery'
    }
});
require([
    "jquery",
    'collections/layout',
    'views/keyboard',
    'views/app',
    'models/analyzer',
    'collections/filter'
], function($, layout, keyboard, appView, analyzer, filter) {
    var text = "Hello World";

    var layoutQwerty = layout.items[layout.LAYOUT_TYPE_QWERTY];
    layoutQwerty.filters = filter.LIST_FILTER_TYPE;
    analyzer.analyze(text, layoutQwerty);

    var kb = keyboard.initialize({
        '$container': $('.keyboard-container'),
        layout: layoutQwerty
    }).render('text');

    var app_view = appView.initialize({ keyboard: kb });
    app_view.render();
    app_view.renderOutput($('.console__output'), text);
});