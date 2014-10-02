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
    'models/keyboard',
    'models/app',
    'models/analyzer',
    'collections/filter',
    'models/layout'
], function($, layoutCollection, keyboard, app, analyzer, filter, layout) {
    var kb = keyboard.initialize({
        layout: $.extend(layoutCollection.items[layoutCollection.LAYOUT_TYPE_QWERTY], {
            filters: filter.LIST_FILTER_TYPE
        }),
        view: { "$container": $('.keyboard-container') }
    });
    kb.view.render('symbol.text', layout.LAYOUT_MODE_STANDARD);

    var theApp = app.initialize({ keyboard: kb });
    theApp.view.render();

    var text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    analyzer.analyze(text, kb.layout);
    theApp.view.renderOutput($('.console__output'), text);
});