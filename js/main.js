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
    'collections/filter',
    'models/layout'
], function($, layoutCollection, keyboard, appView, analyzer, filter, layout) {
    var text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

    var layoutQwerty = layoutCollection.items[layoutCollection.LAYOUT_TYPE_QWERTY];
    layoutQwerty.filters = filter.LIST_FILTER_TYPE;
    analyzer.analyze(text, layoutQwerty);

    var kb = keyboard.initialize({
        '$container': $('.keyboard-container'),
        layout: layoutQwerty
    }).render('symbol.text', layout.LAYOUT_MODE_STANDARD);

    var app_view = appView.initialize({ keyboard: kb });
    app_view.render();
    app_view.renderOutput($('.console__output'), text);
});